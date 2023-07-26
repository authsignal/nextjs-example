import Iron from "@hapi/iron";
import { parse, serialize } from "cookie";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

const TOKEN_SECRET = process.env.TOKEN_SECRET!;
const AUTH_COOKIE = "auth-session";

export interface AuthSession {
  userId: string;
  email: string;
  expiresIn: number;
}

export async function setSessionCookie(
  session: AuthSession,
  res: NextApiResponse
) {
  const token = await Iron.seal(session, TOKEN_SECRET, Iron.defaults);

  const cookie = serialize(AUTH_COOKIE, token, {
    maxAge: session.expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  res.setHeader("Set-Cookie", cookie);
}

export async function clearSessionCookie(res: NextApiResponse) {
  const cookie = serialize(AUTH_COOKIE, "", { maxAge: -1, path: "/" });

  res.setHeader("Set-Cookie", cookie);
  res.redirect("/");
}

export async function getSessionFromCtx(
  ctx: GetServerSidePropsContext
): Promise<AuthSession | undefined> {
  const authCookie = ctx.req.cookies[AUTH_COOKIE];

  if (!authCookie) {
    return undefined;
  }

  const session = await Iron.unseal(authCookie, TOKEN_SECRET, Iron.defaults);

  return session;
}
