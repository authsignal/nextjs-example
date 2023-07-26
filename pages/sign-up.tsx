import Link from "next/link";

export default function SignUpPage() {
  return (
    <main>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const target = e.target as typeof e.target & {
            email: { value: string };
          };

          const email = target.email.value;

          const { error, url } = await fetch("/api/sign-up", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }).then((res) => res.json());

          if (error) {
            alert(error);
          } else {
            window.location.href = url;
          }
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
