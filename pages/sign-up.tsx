import { Authsignal } from "@authsignal/browser";
import { Auth } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";
import "./init-amplify";

const tenantId = process.env.NEXT_PUBLIC_AUTHSIGNAL_TENANT_ID!;
const baseUrl = process.env.NEXT_PUBLIC_AUTHSIGNAL_CLIENT_URL!;

let cognitoUser: any;

export default function SignUpPage() {
  const router = useRouter();

  return (
    <main>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const target = e.target as typeof e.target & {
            email: { value: string };
          };

          const email = target.email.value;

          const signUpParams = {
            username: email,
            password: Math.random().toString(36).slice(-16) + "X",
          };

          await Auth.signUp(signUpParams);

          cognitoUser = await Auth.signIn(email);

          const { token } = cognitoUser.challengeParam;

          const authsignal = new Authsignal({ tenantId, baseUrl });

          const data = await authsignal.passkey.signUp({
            token,
            userName: email,
          });

          if (!data) {
            return alert("Sign up error");
          }

          await Auth.sendCustomChallengeAnswer(cognitoUser, data);

          router.push("/");
        }}
      >
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
        <button type="submit">Sign up</button>
      </form>
      <div>
        {"Already have an account? "}
        <Link href="sign-in">
          <a>Sign in</a>
        </Link>
      </div>
    </main>
  );
}
