import { createJob, updateJob } from "@/db/actions/jobAction";

import { admin, contentManager, hr, moderator } from "@/lib/constant";
import getSession from "@/lib/getSession";
import { responseData } from "@/lib/responseHelper";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const requiredFields = [
    "title",
    "company",
    "companyDetails",
    "salary",
    "deadline",
    "jobDescription",
    "jobType",
    "location",
    "jobLocation",
    "experience",
    "applyLink",
  ];

  const data = await request.json();

  const session = await getSession();

  if (!session) {
    return responseData(401, false, "You are not logged in");
  }

  if (![admin, moderator, hr, contentManager].includes(session.user.role)) {
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
    const postedBy = {
      _id: session.user._id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      isVerified: session.user.isVerified,
    };

    let isPublished = false;

    if (postedBy.isVerified || [admin, moderator].includes(session.user.role)) {
      isPublished = true;
    }

    const newJob = {
      ...data,
      postedBy,
      isPublished,
    };

    await createJob(newJob);

    revalidateTag("jobs");

    return responseData(201, true, `Job ${data.title} has been created`);
  } catch (error: any) {
    return responseData(400, false, "Error Creating Job", undefined, error);
  }
};

export const PATCH = async (request: NextRequest) => {
  const { _id, postedBy, data } = await request.json();

  if (!_id || !postedBy || !data) {
    return responseData(400, false, "Please provide all required fields");
  }

  const session = await getSession();

  if (!session) {
    return responseData(401, false, "You are not logged in");
  }

  if (
    ![admin, moderator, hr, contentManager].includes(session.user.role) ||
    (![admin, moderator].includes(session.user.role) &&
      session.user._id !== postedBy._id)
  ) {
    return responseData(
      403,
      false,
      "You are not authorized to perform this action"
    );
  }

  if (data.isPublished && ![admin, moderator].includes(session.user.role)) {
    return responseData(
      403,
      false,
      "You are not authorized to perform this action"
    );
  }

  try {
    await updateJob(_id, data);

    revalidateTag("jobs");
    revalidateTag(`job-${_id}`);
    return responseData(200, true, `Job has been updated`);
  } catch (error: any) {
    return responseData(400, false, "Error Updating Job", undefined, error);
  }
};
