import { auth } from "@/auth";

export default async function getSession() {
  const session = await auth();

  if (session?.user?._id) {
    return session;
  }

  return null;
}
