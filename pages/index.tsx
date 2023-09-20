import { VerificationMethod } from "@authsignal/node";
import jwtDecode from "jwt-decode";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { authsignal } from "../lib/authsignal";
import { useAuthsignalClient } from "./hooks/useAuthsignalClient";

interface Props {
  token: string;
  userId: string;
  email: string;
  hasEnrolledPasskey: boolean;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const token = ctx.req.cookies["auth-session"];

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/sign-in",
      },
      props: {},
    };
  }

  const decodedToken = jwtDecode<any>(token);

  const userId = decodedToken.sub;

  const user = await authsignal.getUser({ userId });

  return {
    props: {
      token,
      userId,
      email: user.email!,
      hasEnrolledPasskey: user.enrolledVerificationMethods?.includes(
        VerificationMethod.PASSKEY
      )!!,
    },
  };
};

export default function HomePage({
  token,
  userId,
  email,
  hasEnrolledPasskey,
}: Props) {
  const router = useRouter();

  const authsignalClient = useAuthsignalClient();

  useEffect(() => {
    localStorage.setItem(email, userId);
  }, [userId, email]);

  return (
    <main>
      <section>
        <h1>My Example App</h1>
        <div>Signed in as: {email}</div>

        {!hasEnrolledPasskey && (
          <button
            onClick={async () => {
              const success = await authsignalClient?.passkey.signUp({
                token,
                userName: email,
              });

              if (success) {
                alert("Passkey enrolled");
              }
            }}
          >
            Enroll passkey
          </button>
        )}

        <button onClick={() => router.push("/api/sign-out")}>Sign out</button>
      </section>
    </main>
  );
}
