import { unstable_cache } from "next/cache";
import JobModel from "../models/jobModel";
import { Types, isObjectIdOrHexString } from "mongoose";

export const getAllJobs = unstable_cache(
  async (
    queryParams: any,
    isStaff: boolean = false,
    isFeatured: boolean = false
  ) => {
    try {
      const filters: any = {};
      const queries: any = {};

      if (queryParams["search"]) {
        filters.title = { $regex: queryParams["search"], $options: "i" };
      }

      if (queryParams["ids"]?.length) {
        const ids = queryParams["ids"]?.split(",").slice(0, 10) || [];
        filters._id = { $in: ids };
      }

      if (queryParams["jobType"]) {
        const jobType = queryParams["jobType"]?.split(",");
        filters.jobType = { $in: jobType };
      }

      if (queryParams["experience"]) {
        const experience = queryParams["experience"]?.split(",");
        filters.experience = { $in: experience };
      }

      if (queryParams["category"]) {
        filters.jobCategory = { $in: queryParams["category"].split(",") };
      }

      if (queryParams["jobLocation"]) {
        const jobLocation = queryParams["jobLocation"]?.split(",");
        filters.jobLocation = { $in: jobLocation };
      }

      if (isStaff) {
        if (queryParams["isPublished"]) {
          filters.isPublished = queryParams["isPublished"];
        }
      } else {
        filters.isPublished = true;
      }

      if (isFeatured) {
        filters.deadline = { $gte: new Date() };
      }

      if (queryParams["fields"]) {
        const fields = queryParams["fields"]?.split(",").join(" ");
        queries.fields = fields;
      }

      let sort: { [key: string]: 1 | -1 } = { createdAt: -1 };

      if (queryParams["sort"]) {
        if (queryParams["sort"] === "salary(low)") {
          sort = { salary: 1 };
        } else if (queryParams["sort"] === "salary(high)") {
          sort = { salary: -1 };
        } else if (queryParams["sort"] === "deadline") {
          sort = { deadline: 1 };
        }
      }

      const page = parseInt(queryParams["page"] || "1");
      const limit = parseInt(queryParams["limit"] || "12");
      const skip = (page - 1) * limit;

      queries.skip = skip;
      queries.limit = limit;
      queries.sortBy = sort;

      const selectedFields = isStaff
        ? "_id title postedBy isPublished"
        : "_id title company location salary jobType jobLocation deadline";

      const jobs = await JobModel.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields || selectedFields)
        .sort(queries.sortBy)
        .lean();

      const total = await JobModel.countDocuments(filters);
      const totalPages = Math.ceil(total / queries.limit);

      return { total, totalPages, jobs, limit: queries.limit };
    } catch (error) {
      throw error;
    }
  },
  ["jobs"],
  { revalidate: 1800, tags: ["jobs"] }
);

export const getJobById = async (id: string, isStaff: boolean = false) => {
  try {
    if (!id) {
      return null;
    }

    if (!isObjectIdOrHexString(id)) {
      return null;
    }

    const query = isStaff ? { _id: id } : { _id: id, isPublished: true };

    const job = await JobModel.findOne(query).lean();

    if (!job) {
      return null;
    }

    return job;
  } catch (error) {
    return null;
  }
};

export const getRelatedJobs = async (jobId: string, jobTitle: string) => {
  try {
    if (!jobId || !jobTitle) {
      return [];
    }

    const isValidId = Types.ObjectId.isValid(jobId);

    if (!isValidId) {
      return [];
    }

    const titleKeywords = jobTitle.split(" ").join("|");

    const jobs = await JobModel.find({
      title: { $regex: new RegExp(titleKeywords), $options: "i" },
      _id: { $ne: jobId },
      isPublished: true,
      // deadline: { $gte: new Date() },
    })
      .limit(3)
      .lean();

    return jobs;
  } catch (error) {
    return [];
  }
};
