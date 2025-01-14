"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PrimaryModal from "@/components/ui/primaryModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  active,
  admin,
  author,
  blocked,
  contentManager,
  hr,
  inactive,
  moderator,
  user,
} from "@/lib/constant";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateUserByStaff = ({
  userId,
  status,
  role,
  isVerified,
}: {
  userId: string;
  status: string;
  role: string;
  isVerified: boolean;
}) => {
  const { refresh } = useRouter();
  const userInfo = { status, role };
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const form = useForm({
    defaultValues: {
      status: status || undefined,
      role: role || undefined,
      isVerified: isVerified || false,
    },
  });

  const onSubmit = async (values: any) => {
    const updatedData: { [key: string]: any } = {};
    Object.keys(values).forEach((key) => {
      if (
        values[key] !== undefined &&
        values[key] !== (userInfo as Record<string, any>)[key]
      ) {
        updatedData[key] = values[key];
      }
    });

    if (Object.keys(updatedData).length === 0) {
      toast.info("No changes made");
      return;
    }

    try {
      const { status } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
        { _id: userId, adminUpdate: true, data: updatedData }
      );

      if (status === 200) {
        toast.success("User updated successfully");
        refresh();
      }
    } catch (error: any) {
      toast.error("Failed to update user");

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
        className="space-y-6 p-4 max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[active, inactive, blocked].map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="capitalize"
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[admin, moderator, user, hr, contentManager, author].map(
                      (role) => (
                        <SelectItem
                          key={role}
                          value={role}
                          className="capitalize"
                        >
                          {role}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isVerified"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verified User</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
        </div>
        {form.formState?.errors?.root?.serverError && (
          <FormMessage>
            {form.formState?.errors?.root.serverError.message}
          </FormMessage>
        )}

        <Button type="submit" variant="primaryOutline" className="w-full">
          Update User
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

export default UpdateUserByStaff;
