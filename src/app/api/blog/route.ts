import { createBlog, updateBlog } from "@/db/actions/blogActions";
import dbConnect from "@/db/dbConnect";

import { admin, author, contentManager, moderator } from "@/lib/constant";
import getSession from "@/lib/getSession";
import { customSlug } from "@/lib/helperFunctions";
import { responseData } from "@/lib/responseHelper";

import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  await dbConnect();
  const requiredFields = ["title", "content", "tags", "category"];

  const data = await request.json();

  const session = await getSession();

  if (!session) {
    return responseData(401, false, "You are not logged in");
  }

  if (![admin, moderator, author, contentManager].includes(session.user.role)) {
    return responseData(
      403,
      false,
      "You are not authorized to perform this action"
    );
  }

  const missingFields = requiredFields.filter((field) => !data[field]);

  if (missingFields.length) {
    return responseData(
      400,
      false,
      `Please fill all fields: missing ${missingFields.join(", ")}`
    );
  }

  try {
    const authorInfo = {
      _id: session.user._id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      isVerified: session.user.isVerified,
    };

    let isPublished = false;

    if (
      authorInfo.isVerified ||
      [admin, moderator].includes(session.user.role)
    ) {
      isPublished = true;
    }

    const newBlog = {
      ...data,
      authorInfo,
      isPublished,
    };

    const blog = await createBlog(newBlog);

    const slug = customSlug(blog.title, blog._id);

    blog.slug = slug;

    await blog.save();

    revalidateTag("blogs");

    return responseData(201, true, `Blog ${data.title} has been created`);
  } catch (error: any) {
    return responseData(400, false, "Error Creating Blog", undefined, error);
  }
};

export const PATCH = async (request: NextRequest) => {
  await dbConnect();
  const { _id, authorInfo, data } = await request.json();

  if (!_id || !authorInfo || !data) {
    return responseData(400, false, "Please provide all required fields");
  }

  const session = await getSession();

  if (!session) {
    return responseData(401, false, "You are not logged in");
  }

  if (
    ![admin, moderator, author, contentManager].includes(session.user.role) ||
    (![admin, moderator].includes(session.user.role) &&
      session.user._id !== authorInfo._id)
  ) {
    return responseData(
      403,
      false,
      "You are not authorized to perform this action"
    );
  }

  if (
    (data.isPublished || data.isFeatured) &&
    ![admin, moderator].includes(session.user.role)
  ) {
    return responseData(
      403,
      false,
      "You are not authorized to perform this action"
    );
  }
  try {
    await updateBlog(_id, data);

    revalidateTag(_id);
    revalidateTag("blogs");

    return responseData(200, true, `blog has been updated`);
  } catch (error: any) {
    return responseData(400, false, "Error Updating blog", undefined, error);
  }
};
