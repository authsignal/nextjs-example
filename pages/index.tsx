import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "./init-amplify";

export default function Home() {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState<string | undefined>();

  useEffect(() => {
    Auth.currentSession()
      .then((session) => {
        const token = session?.getAccessToken().getJwtToken();

        setAccessToken(token);
      })
      .catch((err) => {
        console.log(err);

        router.push("/sign-in");
      });
  }, [router]);

  if (!accessToken) {
    return null;
  }

  return (
    <main>
      <section>
        <h1>My Example App</h1>
        <div>Cognito access token: {accessToken}</div>
        <button
          onClick={() => {
            Auth.signOut();

            router.push("/sign-in");
          }}
        >
          Sign out
        </button>
      </section>
    </main>
  );
}
