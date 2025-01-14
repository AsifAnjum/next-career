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

import axios from "axios";
import { toast } from "sonner";

import { useState } from "react";
import PrimaryModal from "../ui/primaryModal";
import { passwordSchema } from "@/schema/authSchema";
import { Loader } from "lucide-react";
import { signOut } from "next-auth/react";

const UpdatePasswordForm = ({ userId }: { userId: string }) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      const { status } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        {
          _id: userId,
          adminUpdate: false,
          data: values,
        }
      );

      if (status === 200) {
        toast.success("password updated successfully");
        setTimeout(async () => await signOut(), 1000);
      }
    } catch (error: any) {
      const dbErrors = error?.response.data.error;

      if (error.response.status === 401) {
        setAlertMessage("You are not logged in");
        setShowModal(true);
      }

      if (error.response.status === 403) {
        setAlertMessage("You are not authorized to perform this action");
        setShowModal(true);
      }

      if (Array.isArray(dbErrors) && dbErrors[0]?.field) {
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
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        autoComplete="off"
      >
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

        {form.formState?.errors?.root?.serverError && (
          <FormMessage>
            {form.formState?.errors?.root.serverError.message}
          </FormMessage>
        )}

        <Button
          type="submit"
          variant="secondary"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          Update Password
          {form.formState.isSubmitting && <Loader className="animate-spin" />}
        </Button>
      </form>

      {showModal && (
        <PrimaryModal
          message={alertMessage!}
          setShowModal={setShowModal}
          className="!text-destructive"
        />
      )}
    </Form>
  );
};

export default UpdatePasswordForm;
