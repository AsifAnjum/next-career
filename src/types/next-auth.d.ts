import { IUser } from "@/db/models/userModel";
import "next-auth";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends IUser {
    save: () => Promise<void>;
  }

  interface Session {
    user: {
      _id: string;
      email: string;
      name: string;
      role: string;
      image: string;
      isVerified: boolean;
    } & DefaultSession["user"];
    error: string | null;
  }

  // interface DecodeJWt {
  //   accessToken: string;
  //   refreshToken: string;
  //   expiresAt: Date;
  //   user: {
  //     _id: string;
  //     email: string;
  //     name: string;
  //     role: string;
  //     image: string;
  //     isVerified: boolean;
  //   };
  // }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      _id: string;
      email: string;
      name: string;
      role: string;
      image: string;
      isVerified: boolean;
    } | null;
    error: string | null;
  }
}
