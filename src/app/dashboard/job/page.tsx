import ManageJobs from "@/components/dashboard/job/ManageJobs";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <div className="container mx-auto py-12">
      <ManageJobs searchParams={searchParams} />
    </div>
  );
};

export default Page;
