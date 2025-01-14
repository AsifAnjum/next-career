import { IBlog } from "@/db/models/blogModel";
import BlogPageCard from "./BlogPageCard";
import { getAllBlogs } from "@/db/queries/blogQueries";
import Pagination from "../common/Pagination";
import ItemNotFound from "../ui/ItemNotFound";

const BlogList = async ({ queryParams }: { queryParams: any }) => {
  const { blogs, totalPages } = (await getAllBlogs(queryParams)) as {
    blogs: IBlog[];
    totalPages: number;
  };

  if (blogs.length === 0) {
    return (
      <ItemNotFound
        className="text-destructive"
        message="No blogs found for the selected criteria"
      />
    );
  }

  return (
    <div className="xl:!w-full">
      <div className="grid gap-6">
        {blogs.map((post) => (
          <BlogPageCard key={post._id} post={post} />
        ))}
      </div>
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default BlogList;
