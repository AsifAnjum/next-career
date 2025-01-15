"use server";

import { signIn, signOut } from "@/auth";
import { responseData } from "@/lib/responseHelper";
import { loginSchema } from "@/schema/authSchema";
import { AuthError } from "next-auth";

import { z } from "zod";
import UserModel from "../models/userModel";
import dbConnect from "../dbConnect";

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
          return { error: error.cause?.err?.message || "An error occurred" };
        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
}

export async function createUser(value: any) {
  try {
    await dbConnect();
    return await UserModel.create(value);
  } catch (error) {
    throw error;
  }
}

export async function updateUser(id: string, value: any) {
  await dbConnect();
  return await UserModel.findByIdAndUpdate(id, value, { new: true });
}
