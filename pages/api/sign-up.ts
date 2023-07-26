import { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";
import { authsignal } from "../../lib/authsignal";
import { db } from "../../lib/db";

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;

  const userId = v4();

  const newUser = { id: userId, email };

  await db.push(`/users/${email}`, newUser);

  const { url } = await authsignal.track({ action: "signIn", userId, email });

  res.send({ url });
}
