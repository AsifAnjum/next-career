import { Suspense } from "react";
import ManageFilters from "../ManageFilter";
import ManageUsersList from "./ManageUsersList";
import TableLoader from "@/components/ui/tableLoader";

const ManageUsers = ({ searchParams }: { searchParams: any }) => {
  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-4 text-white">All Users</h2>
      <ManageFilters userFilter />

      <Suspense fallback={<TableLoader />}>
        <ManageUsersList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ManageUsers;
