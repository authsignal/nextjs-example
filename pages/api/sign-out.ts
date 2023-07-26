import { NextApiRequest, NextApiResponse } from "next";
import { clearSessionCookie } from "../../lib/cookies";

export default async function signOut(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  clearSessionCookie(res);
}
