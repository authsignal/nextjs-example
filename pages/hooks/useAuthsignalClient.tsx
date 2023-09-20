import { Authsignal } from "@authsignal/browser";
import { useEffect, useRef, useState } from "react";

export function useAuthsignalClient() {
  const [client, setClient] = useState<Authsignal | null>(null);

  useEffect(() => {
    const authsignalClient = new Authsignal({
      tenantId: process.env.NEXT_PUBLIC_AUTHSIGNAL_TENANT_ID!,
      baseUrl: process.env.NEXT_PUBLIC_AUTHSIGNAL_URL!,
    });

    setClient(authsignalClient);
  }, []);

  return client;
}
