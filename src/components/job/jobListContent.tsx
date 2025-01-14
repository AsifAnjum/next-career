import { IJob } from "@/db/models/jobModel";
import ItemNotFound from "../ui/ItemNotFound";
import JobPageCard from "./JobPageCard";

const JobListContent = ({ jobs }: { jobs: IJob[] }) => {
  let content;

  if (jobs.length === 0) {
    return (content = (
      <ItemNotFound
        className="text-destructive"
        message="No jobs found for the selected criteria"
      />
    ));
  }

  if (jobs.length > 0) {
    content = jobs.map((job: IJob) => <JobPageCard key={job._id} job={job} />);
  }
  return content;
};

export default JobListContent;
