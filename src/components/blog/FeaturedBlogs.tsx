import { getFeaturedBlogs } from "@/db/queries/blogQueries";
import Link from "next/link";

const FeaturedBlogs = async () => {
  const blogs = await getFeaturedBlogs();
  return blogs.map((blog) => (
    <li key={blog._id}>
      <Link
        href={`/blog/${blog.slug}`}
        className="text-blue-400 hover:text-blue-300 p-0 "
      >
        {blog.title}
      </Link>
    </li>
  ));
};

export default FeaturedBlogs;
