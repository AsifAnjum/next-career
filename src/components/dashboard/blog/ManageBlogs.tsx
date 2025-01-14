import ManageFilters from "../ManageFilter";
import { Suspense } from "react";
import TableLoader from "@/components/ui/tableLoader";
import ManageBlogsList from "./manageBlogsList";

const ManageBlogs = ({ searchParams }: { searchParams: any }) => {
  return (
    <div className="p-6 bg-black rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">All Blogs</h2>
      <ManageFilters />

      <Suspense fallback={<TableLoader />}>
        <ManageBlogsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ManageBlogs;
