import BackToPrevious from "@/components/ui/BackToPrevious";
import { CompanyInfo } from "@/components/job/CompanyInfo";
import { JobDetails } from "@/components/job/JobDetails";
import { RelatedJobs } from "@/components/job/RelatedJobs";

import { ArrowLeft } from "lucide-react";
import { getJobById, getRelatedJobs } from "@/db/queries/jobQueries";
import { IJob } from "@/db/models/jobModel";
import ItemNotFound from "@/components/ui/ItemNotFound";
import { cache, Suspense } from "react";
import { unstable_cache } from "next/cache";
import { Metadata } from "next";

export const experimental_ppr = true;

type Params = Promise<{ id: string }>;

//? cache --> for stop re-fetching data twice(for metadata and page). unstable_cache --> for caching data for a certain time.

const getJob = cache(async (id: string) =>
  unstable_cache(async () => (await getJobById(id)) as IJob | null, [id], {
    revalidate: 3600,
    tags: [`job-${id}`],
  })()
);

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  // fetch data
  const job = await getJob(id);

  if (!job) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: job.title,
    description: job.jobDescription.slice(0, 160),
  };
}

const Job = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const jobDetails = await getJob(id);

  if (!jobDetails) {
    return (
      <ItemNotFound
        message="No Jobs Found"
        className="text-destructive"
        section
      />
    );
  }

  const relatedJobs = (await getRelatedJobs(
    jobDetails._id,
    jobDetails.title
  )) as IJob[];

  return (
    <div className="container mx-auto px-4 py-8">
      <BackToPrevious className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to previous page
      </BackToPrevious>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <JobDetails job={jobDetails} />
        </div>
        <div className="space-y-6">
          <CompanyInfo
            companyName={jobDetails.company}
            companyDetails={jobDetails.companyDetails}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <RelatedJobs jobs={relatedJobs} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Job;
