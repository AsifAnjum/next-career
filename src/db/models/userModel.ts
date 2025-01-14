import {
  active,
  admin,
  author,
  blocked,
  contentManager,
  credentials,
  google,
  hr,
  inactive,
  moderator,
  user,
} from "@/lib/constant";
import bcrypt from "bcryptjs";
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  image: string;
  isVerified: boolean;
  role: string;
  status: string;
  provider: string;
  lastLogin: Date;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
  confirmationToken: string;
  confirmationTokenExpires: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide full Name"],
      trim: true,
      validate: {
        validator: (value) => /^[a-zA-Z\s]+$/.test(value),
        message: "Name must only contain alphabetical characters",
      },
      minLength: [3, "Name at least 3 characters"],
      maxLength: [150, "Name is too long"],
    },
    email: {
      type: String,
      validate: {
        validator: (value) =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ),
        message: "Please provide a valid email address",
      },

      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required!"],
    },
    password: {
      type: String,
      required: function () {
        return this.provider === credentials;
      },
      minLength: [6, "Password must be at least 6 characters long"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "Invalid Data. Must be Male ,Female Or Other",
      },
      lowercase: true,
      required: [true, "Gender is required"],
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: {
        values: [user, moderator, admin, hr, author, contentManager],
        message:
          "Invalid Data. Must be User, Moderator, Admin, HR, Author or Content Manager",
      },
      default: user,
    },
    provider: {
      type: String,
      enum: {
        values: [credentials, google],
        message: "Invalid Data. Must be credentials or google ",
      },
      default: credentials,
    },
    status: {
      type: String,
      default: active,
      enum: {
        values: [active, inactive, blocked],
        message:
          "Invalid value: {VALUE}. Please Choose from active,inactive, blocked",
      },
    },

    lastLogin: Date,

    confirmationToken: String,
    confirmationTokenExpires: Date,

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    // jail: {
    //   loginAttempt: {
    //     type: Number,
    //     default: 0,
    //   },
    //   expires: {
    //     type: Date,
    //     default: null,
    //   },
    // },
  },
  {
    timestamps: true,
    strict: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const password = this.password;

  const hashedPassword = bcrypt.hashSync(password, 12);
  this.password = hashedPassword;

  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  // if (!update || !(update as mongoose.UpdateQuery<IUser>).password) {
  //   return next();
  // }

  // Ensure the update object is not an aggregation pipeline
  if (!update || typeof update !== "object" || Array.isArray(update)) {
    return next();
  }

  // Check if the update contains a `password` field
  if (!update.password) {
    return next();
  }

  const password = update.password;

  const hashedPassword = bcrypt.hashSync(password, 12);

  update.password = hashedPassword;

  next();
});

const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default UserModel;
