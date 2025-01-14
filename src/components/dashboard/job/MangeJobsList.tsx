import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAllJobs } from "@/db/queries/jobQueries";
import { IJob } from "@/db/models/jobModel";
import ItemNotFound from "@/components/ui/ItemNotFound";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";

const MangeJobsList = async ({ searchParams }: { searchParams: any }) => {
  const queryParams = await searchParams;
  const { jobs, totalPages } = (await getAllJobs(queryParams, true)) as {
    jobs: IJob[];
    totalPages: number;
  };

  if (!jobs || jobs.length == 0)
    return <ItemNotFound message="No Jobs Found" />;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300">Title</TableHead>
            <TableHead className="text-gray-300">Posted By</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell className="font-medium text-blue-400">
                <Link href={`/dashboard/job/edit/${job._id}`} passHref>
                  {job.title}
                </Link>
              </TableCell>
              <TableCell className="text-gray-300">
                {job.postedBy?.name || "User"}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    job?.isPublished === true
                      ? "default"
                      : job.isPublished === false
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {job?.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </>
  );
};

export default MangeJobsList;
