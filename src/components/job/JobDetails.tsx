import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IJob } from "@/db/models/jobModel";
import { dateString } from "@/lib/helperFunctions";
import { Briefcase, MapPin, DollarSign, Calendar, Globe } from "lucide-react";

interface JobDetailsProps {
  job: IJob;
}

export function JobDetails({ job }: JobDetailsProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-white">
          {job.title}
        </CardTitle>
        <CardDescription className="text-xl text-gray-400">
          {job.company}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center text-gray-400">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <DollarSign className="h-5 w-5 mr-2" />
            <span>{job.salary}</span>
          </div>

          <div className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
            <Badge>{job.jobType}</Badge>
          </div>
          <div className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-gray-400" />
            <Badge>{job.jobLocation}</Badge>
          </div>
        </div>

        <div className="flex items-center text-gray-400 mt-4">
          <Calendar className="h-5 w-5 mr-2" />
          <span>Posted: {dateString(job.createdAt)}</span>
        </div>
        <div
          className="prose prose-invert max-w-none mt-12"
          dangerouslySetInnerHTML={{ __html: job.jobDescription }}
        />
        <div className="flex flex-col gap-5 mt-14">
          <div>
            <h4 className="font-semibold text-white ">Experience</h4>
            <p className="text-gray-400">{job.experience}</p>
          </div>
          <div>
            <h4 className="font-semibold text-white ">Application Deadline</h4>
            <p className="text-gray-400">{dateString(job.deadline)}</p>
          </div>
          <div>
            <h4 className="font-semibold text-white ">Apply</h4>
            <p className="text-gray-400">
              {job.applyLink?.length > 0
                ? job.applyLink
                : "No Apply Details Found"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
