import JobList from "@/components/job/JobList";

import JobPageCardLoader from "@/components/job/jobPageCardLoader";

import JobFilterSidebar from "@/components/job/JobFilterSidebar";

import { Suspense } from "react";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Job",
  description: "Explore and apply for the latest job openings.",
};

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const queryParams = await searchParams;
  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold mb-8">Find Your Dream Job</h1>

      <div className="flex flex-col xl:flex-row gap-8">
        <JobFilterSidebar />
        <Suspense fallback={<JobPageCardLoader />}>
          <JobList queryParams={queryParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
