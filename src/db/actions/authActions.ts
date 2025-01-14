"use server";

import { signIn, signOut } from "@/auth";
import { responseData } from "@/lib/responseHelper";
import { loginSchema } from "@/schema/authSchema";
import { AuthError } from "next-auth";

import { z } from "zod";
import UserModel from "../models/userModel";

export async function userSignOut() {
  await signOut();
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export async function signInWithCredentials(
  values: z.infer<typeof loginSchema>
) {
  const validateFields = loginSchema.safeParse(values);

  if (validateFields.error) {
    return responseData(400, false, "Please provide valid credentials");
  }

  const { email, password } = validateFields.data;

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return response;
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
        case "CredentialsSignin":
          throw new Error(error.cause?.err?.message || "An error occurred");
        default:
          throw new Error("An error occurred");
      }
    }
    throw error;
  }
}

export async function createUser(value: any) {
  return await UserModel.create(value);
}

export async function updateUser(id: string, value: any) {
  return await UserModel.findByIdAndUpdate(id, value, { new: true });
}
