import {
  artDesign,
  books,
  fitness,
  music,
  photography,
  programming,
  technology,
  travel,
} from "@/lib/constant";
import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "blog title must be at least 5 characters.",
    })
    .max(150, {
      message: "blog title must be less than 150 characters.",
    }),
  content: z.string().min(100, {
    message: "blog content must be at least 100 characters.",
  }),

  category: z.enum(
    [
      technology,
      artDesign,
      travel,
      photography,
      music,
      books,
      fitness,
      programming,
    ],
    {
      required_error: "blog category is required.",
      invalid_type_error: "Invalid blog category.",
    }
  ),
  tags: z.any(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});
