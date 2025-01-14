import { isObjectIdOrHexString } from "mongoose";
import UserModel from "../models/userModel";

export const findUserByEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });

    if (user) return user;

    return null;
  } catch {
    return null;
  }
};

export const getAllUsers = async (queryParams: any) => {
  try {
    const filters: any = {};

    if (queryParams.search) {
      filters.$or = [
        { email: { $regex: queryParams.search, $options: "i" } },
        { name: { $regex: queryParams.search, $options: "i" } },
      ];
    }

    if (queryParams.status) {
      filters.status = queryParams.status;
    }

    const page = parseInt(queryParams.page || "1");
    const limit = parseInt(queryParams.limit || "12");
    const skip = (page - 1) * limit;

    const users = await UserModel.find(filters)
      .skip(skip)
      .limit(limit)
      .select("_id name email status role")
      .lean();

    const total = await UserModel.countDocuments(filters);
    const totalPages = Math.ceil(total / limit);

    return { total, totalPages, users, limit };
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (id: string) => {
  try {
    if (!id) {
      return null;
    }

    if (!isObjectIdOrHexString(id)) {
      return null;
    }

    const user = await UserModel.findById(id).select("-password");

    if (user) return user;

    return null;
  } catch {
    return null;
  }
};
