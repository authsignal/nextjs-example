import { Authsignal } from "@authsignal/node";

const secret = process.env.AUTHSIGNAL_SECRET;

if (!secret) {
  throw new Error("AUTHSIGNAL_SECRET is undefined");
}

const apiBaseUrl = process.env.AUTHSIGNAL_REGION_URL;
const redirectUrl = `${process.env.SITE_URL}/api/callback`;

export const authsignal = new Authsignal({ secret, apiBaseUrl, redirectUrl });
