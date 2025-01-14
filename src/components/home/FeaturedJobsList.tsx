import { getAllJobs } from "@/db/queries/jobQueries";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Briefcase, Eye, MapPin } from "lucide-react";

import { Badge } from "../ui/badge";
import Link from "next/link";
const FeaturedJobsList = async () => {
  const { jobs } = await getAllJobs(
    { sort: "salary(high)", limit: 3 },
    false,
    true
  );

  return jobs.map((job) => (
    <Card key={job._id} className="bg-[#0c0d0f] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">{job.title}</CardTitle>
        <CardDescription className="text-gray-400">
          {job.company}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-400">{job.location}</span>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Briefcase className="h-4 w-4 text-gray-400" />
          <Badge variant="secondary" className="bg-[#3a3b3f] text-gray-200">
            {job.jobType}
          </Badge>
        </div>
        <Link
          href={`/job/${job._id}`}
          className="flex items-center justify-center primary__link"
        >
          <Eye className="mr-2" /> View Full Details
        </Link>
      </CardContent>
    </Card>
  ));
};

export default FeaturedJobsList;
