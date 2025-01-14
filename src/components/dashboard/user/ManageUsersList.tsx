import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAllUsers } from "@/db/queries/userQueries";
import { IUser } from "@/db/models/userModel";
import ItemNotFound from "@/components/ui/ItemNotFound";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";

const ManageUsersList = async ({ searchParams }: { searchParams: any }) => {
  const queryParams = await searchParams;
  const { users, totalPages } = (await getAllUsers(queryParams)) as {
    users: IUser[];
    totalPages: number;
  };

  if (!users || users.length == 0)
    return <ItemNotFound message="No Users Found" />;
  return (
    <>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium text-blue-400">
                <Link href={`/dashboard/user/${user._id}`}>{user.name}</Link>
              </TableCell>
              <TableCell className="text-gray-300">{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.status === "active"
                      ? "default"
                      : user.status === "inactive"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="capitalize">{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination totalPages={totalPages} />
    </>
  );
};

export default ManageUsersList;
