import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "./db/queries/userQueries";
import { IUser } from "./db/models/userModel";

import { authConfig } from "@/auth.config";
import { createUser } from "./db/actions/authActions";
import dbConnect from "./db/dbConnect";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider,
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await dbConnect();
          const user: IUser | null = await findUserByEmail(email);

          if (!user) {
            throw new Error("No user found");
          }

          if (user.status !== "active") {
            const message =
              user.status === "inactive"
                ? "Your account is inactive"
                : "Your account is blocked. Please contact support";
            throw new Error(message);
          }

          if (user.password === undefined) {
            throw new Error("Password is not set, please login with google");
          }

          const isValidPassword = bcrypt.compareSync(password, user.password);

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          user.lastLogin = new Date();

          await user.save();

          const { password: pwd, ...userWithoutPassword } = user.toObject();

          return userWithoutPassword;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    signIn: async ({ user, account }): Promise<any> => {
      if (account?.provider == "google") {
        await dbConnect();
        const { name, email, image } = user;

        try {
          const isUserExist = await findUserByEmail(email!);

          if (!isUserExist) {
            if (
              !name ||
              (name.length < 3 && name.length > 150) ||
              !/^[a-zA-Z\s]+$/.test(name)
            ) {
              return "/login?error=invalidName";
            }

            try {
              const newUser = {
                name,
                email,
                image: image || "",
                gender: "male",
                provider: account.provider,

                lastLogin: new Date(),
              };
              const createdUser = await createUser(newUser);

              // send user info to jwt callback
              user._id = createdUser._id;
              user.name = createdUser.name;
              user.email = createdUser.email;
              user.image = createdUser.image;
              user.role = createdUser.role;
              user.isVerified = createdUser.isVerified;

              // user.accessToken = createdUser.accessToken;
              // user.refreshToken = createdUser.refreshToken;
              // user.atExp = createdUser.atExp;

              return true;
            } catch {
              return `/login?error=signUpError`;
            }
          } else {
            if (isUserExist.status !== "active") {
              return "/login?error=accountNotActive";
            }

            isUserExist.lastLogin = new Date();

            await isUserExist.save();

            // send user info to jwt callback
            user._id = isUserExist._id;
            user.name = isUserExist.name;
            user.email = isUserExist.email;
            user.image = isUserExist.image;
            user.role = isUserExist.role;
            user.isVerified = isUserExist.isVerified;

            // user.accessToken = isUserExist.accessToken;
            // user.refreshToken = isUserExist.refreshToken;
            // user.atExp = isUserExist.atExp;

            return true;
          }
        } catch (error) {
          return "/login?error=signInError";
        }
      }

      return true;
    },
    jwt({ token, user, trigger, session }): any {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email || "",
          name: user.name || "",
          role: user.role || "",
          image: user.image || "",
          isVerified: user.isVerified || false,
        };
      }

      if (trigger === "update" && session?.user && token.user) {
        if (session.user.name) token.user.name = session.user.name;

        if (session.user.email) token.user.email = session.user.email;

        if (session.user.image) token.user.image = session.user.image;

        if (session.user.role) token.user.role = session.user.role;

        if (session.user.isVerified)
          token.user.isVerified = session.user.isVerified;
      }
      return token;
    },

    session({ session, token }): any {
      session.user = token.user as any;
      return session;
    },
  },
});
