import { isObjectIdOrHexString } from "mongoose";
import blogModel from "../models/blogModel";
import { unstable_cache } from "next/cache";

export const getBlogById = async (id: string, isStaff: boolean = false) => {
  try {
    if (!id) {
      return null;
    }

    if (!isObjectIdOrHexString(id)) {
      return null;
    }

    const query = isStaff ? { _id: id } : { _id: id, isPublished: true };

    const blog = await blogModel.findOne(query);

    if (!blog) {
      return null;
    }

    if (!isStaff) {
      blog.views += 1;
      await blog.save();
    }
    return blog;
  } catch (error) {
    throw error;
  }
};

export const getAllBlogs = unstable_cache(
  async (queryParams: any, isStaff: boolean = false) => {
    try {
      let filters: any = {};
      const queries: any = {};

      if (queryParams["search"]) {
        filters.title = { $regex: queryParams["search"], $options: "i" };
      }

      if (queryParams["ids"]?.length) {
        const ids = queryParams["ids"]?.split(",").slice(0, 10) || [];
        filters._id = { $in: ids };
      }

      if (queryParams["tags"]?.length) {
        const tags = queryParams["tags"]?.split(",");
        filters.tags = { $in: tags };
      }

      if (queryParams["category"]) {
        filters.category = queryParams["category"];
      }

      if (queryParams["user"]) {
        // filters.authorInfo = filters.authorInfo || {};
        filters = {
          ...filters,
          "authorInfo._id": queryParams["user"],
        };
      }

      if (queryParams["fields"]) {
        const fields = queryParams["fields"]?.split(",").join(" ");
        queries.fields = fields;
      }

      if (isStaff) {
        if (queryParams["isPublished"]) {
          filters.isPublished = queryParams["isPublished"];
        }
      } else {
        filters.isPublished = true;
      }

      let sort: { [key: string]: 1 | -1 } = { createdAt: -1 };

      if (queryParams["sort"]) {
        sort = queryParams["sort"];
      }

      const page = parseInt(queryParams["page"] || "1");
      const limit = parseInt(queryParams["limit"] || "10");
      const skip = (page - 1) * limit;

      queries.sortBy = sort;
      queries.limit = limit;
      queries.skip = skip;

      const blogs = await blogModel
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(
          queries.fields ||
            "_id title content authorInfo createdAt category slug isPublished"
        )
        .sort(queries.sortBy)
        .lean();

      const total = await blogModel.countDocuments(filters);
      const totalPages = Math.ceil(total / queries.limit);

      return { total, totalPages, blogs, limit: queries.limit };
    } catch (error) {
      throw error;
    }
  },
  ["blogs"],
  { revalidate: 1800, tags: ["blogs"] }
);

export const getFeaturedBlogs = async () => {
  try {
    const blogs = await blogModel
      .find({ isPublished: true, isFeatured: true })
      .select("_id title slug")
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    return blogs;
  } catch (error) {
    throw error;
  }
};

export const getRelatedBlogs = async (
  tags: string[],
  currentBlogId: string
) => {
  try {
    const blogs = await blogModel
      .find({
        tags: { $in: tags },
        _id: { $ne: currentBlogId },
        isPublished: true,
      })
      .select("_id title slug content category")
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    return blogs;
  } catch (error) {
    throw error;
  }
};
