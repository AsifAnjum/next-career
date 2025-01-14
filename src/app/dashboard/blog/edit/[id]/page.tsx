import BlogForm from "@/components/dashboard/blog/BlogForm";
import ItemNotFound from "@/components/ui/ItemNotFound";
import { IBlog } from "@/db/models/blogModel";
import { getBlogById } from "@/db/queries/blogQueries";
import { serializeData } from "@/lib/helperFunctions";

type Params = Promise<{ id: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const blogDetails = (await getBlogById(id, true)) as IBlog | null;

  if (!blogDetails) {
    return (
      <ItemNotFound message="No Jobs Found" className="text-destructive" />
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-black rounded-lg shadow-xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <p className="text-3xl font-bold text-center mb-8">Update Blog </p>
      <BlogForm edit blog={serializeData(blogDetails)} />
    </div>
  );
};

export default Page;
