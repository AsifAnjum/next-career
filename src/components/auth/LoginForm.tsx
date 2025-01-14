"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginSchema } from "@/schema/authSchema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
  signInWithCredentials,
  signInWithGoogle,
} from "@/db/actions/authActions";
import { GoogleIcon } from "@/components/ui/GoogleIcon";

import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const redirectTo = searchParams.get("redirect_to");

  useEffect(() => {
    if (error) {
      switch (error) {
        case "signUpError":
          form.setError("root.serverError", {
            type: "manual",
            message: "Error while signing up, please try again",
          });
          break;
        case "signInError":
          form.setError("root.serverError", {
            type: "manual",
            message: "Error while signing in, please try again",
          });
          break;

        case "invalidName":
          form.setError("root.serverError", {
            type: "manual",
            message:
              "Name is invalid. Only alphabets are allowed and must be at least 3 characters long. Please check your google account Name and try again",
          });
          break;

        case "accountNotActive":
          form.setError("root.serverError", {
            type: "manual",
            message:
              "Your account is not active. Please contact support for more information",
          });
          break;

        default:
          form.setError("root.serverError", {
            type: "manual",
            message: "An error occurred, please try again",
          });
      }
    }
  }, [error, form]);

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);
    try {
      const res = await signInWithCredentials(data);

      if (!res.error) {
        toast.success("Login successful");

        if (redirectTo) {
          router.push(redirectTo);
        } else {
          router.push("/");
        }
      }
      throw new Error(res.error);
    } catch (error: any) {
      toast.error("Login failed", {
        description: "Please check the form and try again",
      });

      form.setError("root.serverError", {
        type: "manual",
        message: error.message
          ? error.message
          : "An error occurred, please try again",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off"
        >
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
            Login
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
          onClick={() => {
            try {
              toast("Redirecting....", { description: "Please wait" });
              signInWithGoogle();
            } catch {
              toast.error("An error occurred, please try again");
            }
          }}
          className="w-full"
        >
          <GoogleIcon /> Google
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
