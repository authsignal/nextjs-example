import { NextApiRequest, NextApiResponse } from "next";
import { authsignal } from "../../lib/authsignal";
import { setSessionCookie } from "../../lib/cookies";

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.query.token as string;

  const { state, userId } = await authsignal.validateChallenge({ token });

  if (state === "CHALLENGE_SUCCEEDED") {
    const user = await authsignal.getUser({ userId });

    const email = user.email!;
    const now = new Date();

    const expiresIn = now.setTime(now.getTime() + SESSION_DURATION_IN_MS);

    const newSession = { userId, email, expiresIn };

    await setSessionCookie(newSession, res);
  }

  res.redirect("/");
}

const SESSION_DURATION_IN_MS = 10 * 60 * 1000; // 10 mins
