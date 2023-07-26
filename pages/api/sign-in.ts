import { NextApiRequest, NextApiResponse } from "next";
import { authsignal } from "../../lib/authsignal";
import { db } from "../../lib/db";

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const { email } = req.body;

  const exists = await db.exists(`/users/${email}`);

  if (!exists) {
    return res.send({ error: "user not found" });
  }

  const { id: userId } = await db.getData(`/users/${email}`);

  const { url } = await authsignal.track({ action: "signIn", userId, email });

  res.send({ url });
}
