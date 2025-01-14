import { Briefcase, MapPin, DollarSign, Globe, Clock10 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

interface JobPageCardProps {
  job: IJob;
}

import Link from "next/link";
import { IJob } from "@/db/models/jobModel";
import { dateString } from "@/lib/helperFunctions";

const JobPageCard = ({ job }: JobPageCardProps) => {
  return (
    <Card key={job.id} className="hover:shadow-sky-400 hover:shadow-md">
      <CardHeader>
        <CardTitle>
          <Link
            className="hover:text-primary/80 transition-colors duration-500"
            href={`/job/${job._id}`}
          >
            {job.title}
          </Link>
        </CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
            <Badge variant="secondary">{job.jobType}</Badge>
          </div>
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-2 text-gray-400" />
            <Badge variant="secondary">{job.jobLocation}</Badge>
          </div>
          <div className="flex items-center">
            <Clock10 className="h-4 w-4 mr-2 text-gray-400" />
            <small suppressHydrationWarning>{dateString(job.deadline)}</small>
          </div>
        </div>

        <Link className="primary__link" href={`/job/${job._id}`}>
          View Details
        </Link>
      </CardContent>
    </Card>
  );
};

export default JobPageCard;
