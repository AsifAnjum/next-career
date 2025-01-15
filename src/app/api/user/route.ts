import { unstable_update } from "@/auth";
import { updateUser } from "@/db/actions/authActions";
import { updateBlogByUser } from "@/db/actions/blogActions";
import { updateJobByUser } from "@/db/actions/jobAction";
import dbConnect from "@/db/dbConnect";

import { admin, moderator } from "@/lib/constant";
import getSession from "@/lib/getSession";
import { responseData } from "@/lib/responseHelper";
import { NextRequest } from "next/server";

export const PATCH = async (request: NextRequest) => {
  await dbConnect();
  const { _id, adminUpdate, data } = await request.json();

  if (!_id || !data) {
    return responseData(400, false, "Please provide all required fields");
  }

  const session = await getSession();

  if (!session) {
    return responseData(401, false, "You are not logged in");
  }

  if (adminUpdate) {
    if (data?.password) {
      return responseData(
        400,
        false,
        "You cannot update password using this endpoint"
      );
    }

    if (![admin, moderator].includes(session.user.role)) {
      return responseData(
        403,
        false,
        "You are not authorized to perform this action"
      );
    }

    if (data.role && session.user.role !== admin) {
      return responseData(
        403,
        false,
        "You are not authorized to change user role"
      );
    }

    if (session.user.role !== admin && session.user._id === _id) {
      return responseData(400, false, "You cannot update your own info");
    }

    try {
      await updateUser(_id, data);

      await updateBlogByUser(_id, data);

      // await unstable_update({ user: data });

      return responseData(200, true, "User updated successfully");
    } catch (error: any) {
      return responseData(400, false, "Error updating user", undefined, error);
    }
  } else {
    if (session.user._id !== _id) {
      return responseData(
        403,
        false,
        "You are not authorized to perform this action"
      );
    }

    if (data.role || data.isVerified || data.status) {
      return responseData(
        400,
        false,
        "You are not authorized to perform this action"
      );
    }

    try {
      await updateUser(session.user._id, data);

      await updateBlogByUser(_id, data);

      await updateJobByUser(_id, data);

      await unstable_update({ user: data });

      return responseData(200, true, "User updated successfully");
    } catch (error: any) {
      return responseData(400, false, "Error updating user", undefined, error);
    }
  }
};
