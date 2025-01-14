"use client";
import { jobSchema } from "@/schema/jobSchema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import axios from "axios";

import { useState } from "react";
import { IJob } from "@/db/models/jobModel";
import { useRouter } from "next/navigation";

const useMutationJob = ({ edit, job }: { edit?: boolean; job?: IJob }) => {
  const { refresh } = useRouter();
  const {
    _id,
    title,
    postedBy,
    company,
    companyDetails,
    location,
    jobLocation,
    salary,
    deadline,
    jobDescription,
    jobType,
    jobCategory,
    experience,
    applyLink,
    isPublished,
  } = job || {};

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: title || "",
      company: company || "",
      companyDetails: companyDetails || "",
      location: location || "",
      jobLocation: jobLocation || undefined,
      salary: salary || 0,
      deadline: deadline ? new Date(deadline) : new Date(),
      jobDescription: jobDescription || ``,
      jobType: jobType || undefined,
      jobCategory: jobCategory || undefined,
      experience: (experience &&
      ["0", "0-1", "1-2", "2-3", "3-5", "5+"].includes(experience)
        ? experience
        : undefined) as "0" | "0-1" | "1-2" | "2-3" | "3-5" | "5+" | undefined,
      applyLink: applyLink || "",
      isPublished: isPublished || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof jobSchema>) => {
    try {
      if (edit) {
        const modifiedValues: { [key: string]: any } = values;

        const updatedData: { [key: string]: any } = {};

        Object.keys(modifiedValues).forEach((key) => {
          if (
            JSON.stringify(modifiedValues[key]) !==
            JSON.stringify((job as Record<string, any>)[key])
          ) {
            updatedData[key] = modifiedValues[key];
          }
        });

        if (Object.keys(updatedData).length === 0) {
          toast.info("No changes made");
          return;
        }

        const { status } = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/job/`,
          { _id, postedBy, data: updatedData }
        );

        if (status === 200) {
          toast.success("Job updated successfully");
          refresh();
        }
      } else {
        const { status } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/job`,
          values
        );

        if (status === 201) {
          toast.success("Job posted successfully");
          refresh();
        }
      }
    } catch (error: any) {
      if (edit) {
        toast.error("Failed to update job");
      } else {
        toast.error("Failed to post job");
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
  };
};

export default useMutationJob;
