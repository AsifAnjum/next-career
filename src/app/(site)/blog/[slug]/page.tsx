import BlogPost from "@/components/blog/BlogPost";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import BackToPrevious from "@/components/ui/BackToPrevious";
import ItemNotFound from "@/components/ui/ItemNotFound";
import { IBlog } from "@/db/models/blogModel";
import { getBlogById } from "@/db/queries/blogQueries";

import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { cache } from "react";

type Params = Promise<{ slug: string }>;

const getBlog = cache(async (id: string) =>
  unstable_cache(async () => (await getBlogById(id)) as IBlog | null, [id], {
    revalidate: 3600,
    tags: [id],
  })()
);

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  // read route params
  const { slug } = await params;

  const idIndex = slug.lastIndexOf("-");

  if (idIndex === -1) {
    return {
      title: "Not Found",
    };
  }
  const id = slug.slice(idIndex + 1);

  // fetch data
  const blog = await getBlog(id);

  if (!blog) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.content.slice(0, 160),
    keywords: blog.tags,
  };
}

const Blog = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  const idIndex = slug.lastIndexOf("-");

  if (idIndex === -1) {
    return (
      <ItemNotFound
        message="No Blogs Found"
        className="text-destructive"
        section
      />
    );
  }

  const id = slug.slice(idIndex + 1);

  const blogDetails = await getBlog(id);

  if (!blogDetails) {
    return (
      <ItemNotFound
        message="No Blogs Found"
        className="text-destructive"
        section
      />
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <BackToPrevious className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to previous page
      </BackToPrevious>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <BlogPost post={blogDetails} />
        </div>
        <div className="lg:w-1/3">
          <RelatedBlogs
            tags={blogDetails.tags}
            currentBlogId={blogDetails._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
