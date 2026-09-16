import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export async function getServerSession() {
  return auth.api.getSession({ headers: await headers() });
}

export const getCurrentUser = async () => (await getServerSession())?.user ?? null;
