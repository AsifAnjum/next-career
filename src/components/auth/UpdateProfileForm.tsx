"use client";
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

import { Loader } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { IProfileProps } from "../dashboard/Profile";

import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

import PrimaryModal from "../ui/primaryModal";
import UseProfileUpdate from "@/hooks/useProfileUpdate";

const UpdateProfileForm = ({ user }: IProfileProps) => {
  const { form, onSubmit, alertMessage, showModal, setShowModal } =
    UseProfileUpdate({ user });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile</FormLabel>
              <div className="flex items-center justify-center">
                <Image
                  src={field.value || "/defaultProfile.jpeg"}
                  alt="profile"
                  className="w-24 h-24 rounded-full"
                  width={100}
                  height={100}
                />
              </div>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={async (res) => {
                  // Do something with the response
                  const { url } = res[0];
                  await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
                    _id: user._id,
                    adminUpdate: false,
                    data: { image: url },
                  });

                  toast.success("Profile picture updated successfully");

                  form.setValue("image", url);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  toast.error("Failed to update profile picture");
                }}
              />

              <FormMessage />
            </FormItem>
          )}
        />
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
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          Update Profile
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

export default UpdateProfileForm;
