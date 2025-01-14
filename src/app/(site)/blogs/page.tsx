import BlogList from "@/components/blog/BlogList";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest articles and updates on our blog.",
};

const Blog = async ({ searchParams }: { searchParams: SearchParams }) => {
  const queryParams = await searchParams;
  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold mb-8">Blog Post </h1>

      <div className="flex flex-col xl:flex-row gap-8">
        <BlogList queryParams={queryParams} />
        <BlogSidebar />
      </div>
    </div>
  );
};

export default Blog;
