"use server";

import { isObjectIdOrHexString } from "mongoose";
import JobModel from "../models/jobModel";

export async function createJob(value: any) {
  return await JobModel.create(value);
}

export async function updateJob(id: string, value: any) {
  return await JobModel.findByIdAndUpdate(id, value, { new: true })
    .lean()
    .exec();
}

export const updateJobByUser = async (id: string, data: any) => {
  try {
    if (!id) {
      return null;
    }

    if (!isObjectIdOrHexString(id)) {
      return null;
    }

    const job = await JobModel.updateMany(
      { "postedBy._id": id },
      {
        $set: Object.fromEntries(
          Object.entries(data).map(([key, value]) => [`postedBy.${key}`, value])
        ),
      }
    );

    return job;
  } catch (error) {
    return null;
  }
};