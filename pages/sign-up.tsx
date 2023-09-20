import Link from "next/link";

export default function SignUpPage() {
  return (
    <main>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const { error, url } = await fetch("/api/sign-up", {
            method: "POST",
          }).then((res) => res.json());

          if (error) {
            alert(error);
          } else {
            window.location.href = url;
          }
        }}
      >
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
