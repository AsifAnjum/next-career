"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

import { signupSchema } from "@/schema/authSchema";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "lucide-react";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { signInWithGoogle } from "@/db/actions/authActions";
import Link from "next/link";

const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof signupSchema>) {
    setIsSubmitting(true);
    try {
      const { status } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          gender: data.gender,
        }
      );

      if (status === 201) {
        toast.success("Account Created Successfully");
      }

      if (status === 400) {
        toast.error("Error Creating Account");
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        form.setError("email", {
          type: "manual",
          message: error.response.data.message,
        });
      } else {
        const dbErrors = error?.response.data.error;

        if (dbErrors[0]?.field) {
          dbErrors.forEach((err: any) => {
            form.setError(err.field, {
              type: "manual",
              message: err.message,
            });
          });
        } else {
          form.setError("root.serverError", {
            type: "manual",
            message: error.response.data.message,
          });
        }
      }

      toast.error("Error Creating Account", {
        description: "Please check the form and try again",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-black w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    autoComplete="new-password webauthn"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState?.errors?.root?.serverError && (
            <FormMessage>
              {form.formState?.errors?.root.serverError.message}
            </FormMessage>
          )}

          <Button
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
            className="w-full"
          >
            Sign Up
            {isSubmitting && <Loader className="animate-spin" />}
          </Button>
        </form>
      </Form>

      {/* separator  */}
      <div className="flex items-center mt-8">
        <hr className="flex-grow" />
        <span className="px-2">or</span>
        <hr className="flex-grow" />
      </div>

      {/* social signup */}
      <div className="mt-10">
        <Button
          variant="secondaryOutline"
          onClick={signInWithGoogle}
          className="w-full"
        >
          <GoogleIcon /> Google
        </Button>
      </div>

      <div>
        <p className="mt-8 text-center text-slate-700">
          Already have an account?
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-700 duration-500 underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
