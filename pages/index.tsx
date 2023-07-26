import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSessionFromCtx } from "../lib/cookies";

interface Props {
  email: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getSessionFromCtx(ctx);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/sign-in",
      },
      props: {},
    };
  }

  return {
    props: {
      email: session.email,
    },
  };
};

export default function HomePage({ email }: Props) {
  const router = useRouter();

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
