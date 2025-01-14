import JobForm from "@/components/dashboard/job/JobForm";
import ItemNotFound from "@/components/ui/ItemNotFound";
import { IJob } from "@/db/models/jobModel";
import { getJobById } from "@/db/queries/jobQueries";
import { serializeData } from "@/lib/helperFunctions";

type Params = Promise<{ id: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const jobDetails = (await getJobById(id, true)) as IJob | null;

  if (!jobDetails) {
    return (
      <ItemNotFound
        message="No Jobs Found"
        className="text-destructive"
        section
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-black rounded-lg shadow-xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <p className="text-3xl font-bold text-center mb-8">Update Job </p>
      <JobForm edit job={serializeData(jobDetails)} />
    </div>
  );
};

export default Page;
