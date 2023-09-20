import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function signOut(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = serialize("auth-session", "", { maxAge: -1, path: "/" });

  res.setHeader("Set-Cookie", cookie);
  res.redirect("/");
}
