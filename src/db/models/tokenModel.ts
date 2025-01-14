import mongoose, { Document, Schema } from "mongoose";

export interface IAuthToken extends Document {
  _id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  atExp: Date;
  rtExp: Date;
}

const authTokenSchema: Schema<IAuthToken> = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    atExp: {
      type: Date,
      required: true,
    },
    rtExp: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const AuthTokenModel =
  (mongoose.models.AuthToken as mongoose.Model<IAuthToken>) ||
  mongoose.model<IAuthToken>("AuthToken", authTokenSchema);

export default AuthTokenModel;
