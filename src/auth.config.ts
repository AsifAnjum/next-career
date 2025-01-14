import { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers: [],
  pages: {
    signIn: "/login",
    error: "/login",
  },
} satisfies NextAuthConfig;
