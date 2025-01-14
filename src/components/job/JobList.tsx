import { IJob } from "@/db/models/jobModel";
import Pagination from "../common/Pagination";
import { getAllJobs } from "@/db/queries/jobQueries";
import JobListContent from "./jobListContent";

const JobList = async ({ queryParams }: { queryParams: any }) => {
  const { jobs, totalPages } = (await getAllJobs(queryParams)) as {
    jobs: IJob[];
    totalPages: number;
  };

  return (
    <div className="">
      <div className="grid md:grid-cols-2 justify-items-center gap-6">
        <JobListContent jobs={jobs} />
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default JobList;
