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
import mongoose, { Schema, Document } from "mongoose";

export type blogCategories =
  | "technology"
  | "art-design"
  | "travel"
  | "photography"
  | "music"
  | "books"
  | "fitness"
  | "programming";

export interface IBlog extends Document {
  _id: string;
  title: string;
  authorInfo: {
    _id: string;
    name: string;
    email: string;
    image?: string;
    isVerified?: boolean;
  };
  slug: string;
  isFeatured: boolean;
  content: string;
  category: blogCategories;
  tags: string[];
  views: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Please Provide full Name"],
      trim: true,
      minlength: [5, "Name at least 3 characters"],
      maxlength: [150, "Name is too long"],
    },
    authorInfo: {
      _id: {
        type: String,
        required: [true, "Please provide the user id"],

        trim: true,
      },
      name: {
        type: String,
        required: [true, "Please provide the user name"],
      },
      email: {
        type: String,
        required: [true, "Please provide the user email"],
      },
      image: {
        type: String,
        required: false,
      },
      isVerified: {
        type: Boolean,
        required: true,
      },
    },

    slug: {
      type: String,

      unique: true,
    },

    content: {
      type: String,
      required: [true, "content is required"],
      minlength: [100, "content must be at least 100 characters"],
    },

    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },

    category: {
      type: String,
      required: [true, "Please provide the job category"],
      enum: {
        values: [
          technology,
          artDesign,
          travel,
          photography,
          music,
          books,
          fitness,
          programming,
        ],
        message: "Invalid Value {VALUE}, Please provide a valid job category",
      },
    },
    tags: {
      type: [String],
      required: [true, "tags needed"],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "pls provide tags",
      },
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const blogModel =
  (mongoose.models.blog as mongoose.Model<IBlog>) ||
  mongoose.model<IBlog>("blog", blogSchema);

export default blogModel;
