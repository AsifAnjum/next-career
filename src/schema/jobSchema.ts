import { z } from "zod";
import {
  contract,
  fullTime,
  internship,
  partTime,
  temporary,
  developer,
  engineer,
  designer,
  marketer,
  manager,
  accountant,
  sales,
  healthcare,
  education,
  customerSupport,
  logistics,
  consultant,
  analyst,
  writer,
  legal,
  humanResources,
  eventPlanning,
  hybrid,
  remote,
  onSite,
} from "@/lib/constant";

export const jobSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Job title must be at least 5 characters.",
    })
    .max(150, {
      message: "Job title must be less than 150 characters.",
    }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  companyDetails: z
    .string()
    .min(10, {
      message: "Company details must be at least 10 characters.",
    })
    .max(250, {
      message: "Company details must be less than 250 characters.",
    }),
  location: z
    .string()
    .min(10, {
      message: "Location must be at least 10 characters.",
    })
    .max(100, {
      message: "Location must be less than 100 characters.",
    }),
  jobLocation: z.enum([onSite, remote, hybrid], {
    required_error: "Job location is required.",
    invalid_type_error: "Invalid job location.",
  }),
  salary: z.number().refine((value) => value === 0 || value > 200, {
    message: "Salary must be either Negotiable (0) or greater than 200",
  }),

  deadline: z
    .date({
      required_error: "Deadline is required.",
      invalid_type_error: "Invalid deadline.",
    })
    .refine((value) => new Date(value) > new Date(), {
      message: "Deadline must be in the future.",
    }),

  jobDescription: z.string().min(50, {
    message: "Job description must be at least 50 characters.",
  }),

  jobType: z.enum([fullTime, partTime, contract, temporary, internship]),
  jobCategory: z.enum(
    [
      developer,
      engineer,
      designer,
      marketer,
      manager,
      accountant,
      sales,
      healthcare,
      education,
      customerSupport,
      logistics,
      consultant,
      analyst,
      writer,
      legal,
      humanResources,
      eventPlanning,
    ],
    {
      required_error: "Job category is required.",
      invalid_type_error: "Invalid job category.",
    }
  ),
  experience: z.enum(["0", "0-1", "1-2", "2-3", "3-5", "5+"], {
    required_error: "Experience level is required.",
    invalid_type_error: "Invalid experience level.",
  }),
  applyLink: z.string(),
  isPublished: z.boolean().optional(),
});
