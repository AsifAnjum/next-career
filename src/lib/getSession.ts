import { auth } from "@/auth";
import { cache } from "react";

const getSession = cache(async () => {
  const session = await auth();

  if (session?.user?._id) {
    return session;
  }

  return null;
});

export default getSession;
