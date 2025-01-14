"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateProfileSchema } from "@/schema/authSchema";
import { IProfileProps } from "@/components/dashboard/Profile";
import { unstable_update } from "@/auth";

const UseProfileUpdate = ({ user }: IProfileProps) => {
  const { refresh } = useRouter();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);

  const { name, email, gender, image } = user || {};

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
      gender: ["male", "female", "other"].includes(gender)
        ? (gender as "male" | "female" | "other")
        : undefined,
      image: image || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
    const { image, ...modifiedValues }: { [key: string]: any } = values;

    const updatedData: { [key: string]: any } = {};

    Object.keys(modifiedValues).forEach((key) => {
      if (
        JSON.stringify(modifiedValues[key]) !==
        JSON.stringify((user as Record<string, any>)[key])
      ) {
        updatedData[key] = modifiedValues[key];
      }
    });

    if (Object.keys(updatedData).length === 0) {
      toast.info("No changes made");
      return;
    }

    try {
      const { status } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        {
          _id: user._id,
          adminUpdate: false,
          data: updatedData,
        }
      );

      if (status === 200) {
        toast.success("profile updated successfully");
        refresh();
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

  return {
    form,
    onSubmit,
    alertMessage,
    setAlertMessage,
    showModal,
    setShowModal,
  };
};

export default UseProfileUpdate;
