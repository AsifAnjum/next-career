import {
  accountant,
  analyst,
  consultant,
  contract,
  customerSupport,
  designer,
  developer,
  education,
  engineer,
  eventPlanning,
  fullTime,
  healthcare,
  humanResources,
  hybrid,
  internship,
  legal,
  logistics,
  manager,
  marketer,
  onSite,
  partTime,
  remote,
  sales,
  temporary,
  writer,
} from "@/lib/constant";
import mongoose, { Schema, Document } from "mongoose";

export type JobCategories =
  | "developer"
  | "engineer"
  | "designer"
  | "marketer"
  | "manager"
  | "accountant"
  | "sales"
  | "healthcare"
  | "education"
  | "customer-support"
  | "logistics"
  | "consultant"
  | "analyst"
  | "writer"
  | "legal"
  | "human-resources"
  | "event-planning";

type JobType =
  | "full-time"
  | "part-time"
  | "contract"
  | "temporary"
  | "internship";

type JobLocation = "onsite" | "remote" | "hybrid";
export interface IJob extends Document {
  _id: string;
  title: string;
  postedBy: {
    _id: string;
    name: string;
    email: string;
    image?: string;
    isVerified?: boolean;
  };
  company: string;
  companyDetails: string;
  salary: number;
  location: string;
  deadline: Date;
  jobDescription: string;
  jobType: JobType;
  jobLocation: JobLocation;
  jobCategory: JobCategories;
  experience: string;
  applyLink: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      minlength: [5, "title must be at least 5 characters"],
      maxlength: [150, "title is too long"],
    },
    postedBy: {
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
        required: false,
      },
    },
    company: {
      type: String,
      required: [true, "Please provide the company name"],
    },
    companyDetails: {
      type: String,
      required: false,
    },

    salary: {
      type: Number,
      required: [true, "Please provide the salary"],
      validate: {
        validator: function (value: number) {
          return value === 0 || value > 200; // Salary must be 0 or more than 200
        },
        message: "Salary must be either Negotiable or greater than 200",
      },
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    deadline: {
      type: Date,
      required: [true, "Please provide an application deadline"],
    },
    jobDescription: {
      type: String,
      required: [true, "Please provide a job description"],
      minlength: [50, "Description must be at least 50 characters"],
    },
    jobType: {
      type: String,
      enum: [fullTime, partTime, contract, temporary, internship],
      required: [true, "Please specify the job type"],
    },
    location: {
      type: String,
      required: [true, "Please provide the job location"],
      trim: true,
      minlength: [10, "Location must be at least 10 characters"],
      maxlength: [100, "Location must be less than 100 characters"],
    },
    jobLocation: {
      type: String,
      enum: [onSite, remote, hybrid],
      required: [true, "Please specify the job location type"],
    },
    jobCategory: {
      type: String,
      required: [true, "Please provide the job category"],
      enum: {
        values: [
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
        message: "Invalid Value {VALUE}, Please provide a valid job category",
      },
    },
    experience: {
      type: String,
      required: [true, "Please specify the experience level required"],
      enum: {
        values: ["0", "0-1", "1-2", "2-3", "3-5", "5+"],
        message:
          "Experience must be one of: 0, 0-1, 1-2, 2-3, 3-5, or 5+ years",
      },
    },
    applyLink: {
      type: String,
      required: [true, "Please provide an application link"],
      trim: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const JobModel =
  (mongoose.models.Job as mongoose.Model<IJob>) ||
  mongoose.model<IJob>("Job", jobSchema);

export default JobModel;
