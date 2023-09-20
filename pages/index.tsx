import jwtDecode from "jwt-decode";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { authsignal } from "../lib/authsignal";

interface Props {
  token: string;
  userId: string;
  email: string;
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
    },
  };
};

export default function HomePage({ token, userId, email }: Props) {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem(email, userId);
  }, [userId, email]);

  return (
    <main>
      <section>
        <h1>My Example App</h1>
        <div>Signed in as: {email}</div>

        <button onClick={() => router.push("/api/sign-out")}>Sign out</button>
      </section>
    </main>
  );
}
