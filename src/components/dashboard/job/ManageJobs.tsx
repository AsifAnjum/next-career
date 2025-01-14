import ManageJobsList from "./MangeJobsList";

import { Suspense } from "react";
import TableLoader from "@/components/ui/tableLoader";
import ManageFilters from "../ManageFilter";

const ManageJobs = async ({ searchParams }: { searchParams: any }) => {
  return (
    <div className="p-6 bg-black rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">All Jobs</h2>
      <ManageFilters />
      <Suspense fallback={<TableLoader />}>
        <ManageJobsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ManageJobs;
