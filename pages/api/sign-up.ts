import { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";
import { authsignal } from "../../lib/authsignal";

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = v4();

  const { url } = await authsignal.track({
    action: "signUp",
    userId,
  });

  res.send({ url });
}
