import Link from "next/link";

export default function SignInPage() {
  return (
    <main>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const target = e.target as typeof e.target & {
            email: { value: string };
          };

          const email = target.email.value;

          const userId = localStorage.getItem(email);

          if (!userId) {
            return alert("User not found");
          }

          const { url } = await fetch("/api/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          }).then((res) => res.json());

          window.location.href = url;
        }}
      >
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
        <button type="submit">Sign in</button>
      </form>
      <div>
        {"Don't have an account? "}
        <Link href="sign-up">
          <a>Sign up</a>
        </Link>
      </div>
    </main>
  );
}
