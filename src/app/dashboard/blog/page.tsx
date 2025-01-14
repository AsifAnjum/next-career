import ManageBlogs from "@/components/dashboard/blog/ManageBlogs";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <div className="container mx-auto py-12">
      <ManageBlogs searchParams={searchParams} />
    </div>
  );
};

export default Page;
