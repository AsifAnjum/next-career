import { z } from "zod";

export const baseProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(150, { message: "Name must be less than 150 characters long" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name must contain only alphabetic characters",
    }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .toLowerCase(),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({
      message: "Gender is Required",
    }),
  }),
  image: z.string().optional(),
});

export const passwordObj = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, {
    message: "Confirm password must be at least 6 characters long",
  }),
});

export const signupSchema = baseProfileSchema
  .merge(passwordObj)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .toLowerCase(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const updateProfileSchema = baseProfileSchema.partial();

export const passwordSchema = passwordObj.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);
