import { isObjectIdOrHexString } from "mongoose";
import blogModel from "../models/blogModel";
import dbConnect from "../dbConnect";

export const createBlog = async (value: any) => {
  await dbConnect();
  return await blogModel.create(value);
};

export async function updateBlog(id: string, value: any) {
  await dbConnect();
  return await blogModel
    .findByIdAndUpdate(id, value, { new: true })
    .lean()
    .exec();
}

export const updateBlogByUser = async (id: string, data: any) => {
  try {
    await dbConnect();
    if (!id) {
      return null;
    }

    if (!isObjectIdOrHexString(id)) {
      return null;
    }

    const blog = await blogModel.updateMany(
      { "authorInfo._id": id },
      {
        $set: Object.fromEntries(
          Object.entries(data).map(([key, value]) => [
            `authorInfo.${key}`,
            value,
          ])
        ),
      }
    );

    return blog;
  } catch (error) {
    return null;
  }
};
