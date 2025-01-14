import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { IJob } from "@/db/models/jobModel";

interface RelatedJobsProps {
  jobs: IJob[];
}

export function RelatedJobs({ jobs }: RelatedJobsProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">
          Related Jobs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job._id}>
              <Link
                href={`/job/${job._id}`}
                className="block hover:bg-slate-700 rounded-lg p-3 transition-colors duration-200"
              >
                <h3 className="font-semibold text-white">{job.title}</h3>
                <p className="text-sm text-gray-400">{job.company}</p>
                <Badge variant="secondary" className="mt-2">
                  {job.jobType}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
