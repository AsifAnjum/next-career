import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAllBlogs } from "@/db/queries/blogQueries";
import { IBlog } from "@/db/models/blogModel";
import ItemNotFound from "@/components/ui/ItemNotFound";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";

const ManageBlogsList = async ({ searchParams }: { searchParams: any }) => {
  const queryParams = await searchParams;

  const { blogs, totalPages } = (await getAllBlogs(queryParams, true)) as {
    blogs: IBlog[];
    totalPages: number;
  };

  if (!blogs || blogs.length == 0)
    return <ItemNotFound message="No Blogs Found" />;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300">Title</TableHead>
            <TableHead className="text-gray-300">Author</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog._id}>
              <TableCell className="font-medium text-blue-400">
                <Link href={`/dashboard/blog/edit/${blog._id}`} passHref>
                  {blog.title}
                </Link>
              </TableCell>
              <TableCell className="text-gray-300">
                {blog.authorInfo.name}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    blog?.isPublished === true
                      ? "default"
                      : blog.isPublished === false
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {blog?.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination totalPages={totalPages} />
    </>
  );
};

export default ManageBlogsList;
