"use client";

import { IBlog } from "@/db/models/blogModel";
import * as z from "zod";
import { blogSchema } from "@/schema/blogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useBlogMutation = ({ edit, blog }: { edit?: boolean; blog?: IBlog }) => {
  const { refresh } = useRouter();

  const {
    _id,
    authorInfo,
    title,
    content,
    category,
    tags,
    isPublished,
    isFeatured,
  } = blog || {};

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);

  const [tagsState, setTagsState] = useState<string[]>(tags || []);

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: title || "",
      category: category || undefined,
      content: content || "",
      tags: tagsState?.join(",") || "",
      isPublished: isPublished || false,
      isFeatured: isFeatured || false,
    },
  });

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = String(e.target.value);
    const newTags = input
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "" && tag.length >= 3);

    setTagsState(newTags);
  };

  const onSubmit = async (values: z.infer<typeof blogSchema>) => {
    try {
      values.tags =
        values.tags?.split(",").map((tag: string) => tag.trim()) || [];

      if (edit) {
        const modifiedValues: { [key: string]: any } = values;

        const updatedData: { [key: string]: any } = {};

        Object.keys(modifiedValues).forEach((key) => {
          if (
            JSON.stringify(modifiedValues[key]) !==
            JSON.stringify((blog as Record<string, any>)[key])
          ) {
            updatedData[key] = modifiedValues[key];
          }
        });

        if (Object.keys(updatedData).length === 0) {
          toast.info("No changes made");
          return;
        }

        const { status } = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`,
          { _id, authorInfo, data: updatedData }
        );

        if (status === 200) {
          toast.success("blog updated successfully");
          refresh();
        }
      } else {
        const { status } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`,
          values
        );
        if (status === 201) {
          toast.success("Blog created successfully");
          refresh();
        }
      }
    } catch (error: any) {
      if (edit) {
        toast.error("Failed to update blog");
      } else {
        toast.error("Failed to add blog");
      }

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
    handleTagInput,
    tagsState,
  };
};

export default useBlogMutation;
