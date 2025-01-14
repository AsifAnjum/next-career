import { Skeleton } from "./skeleton";

const TableLoader = () => {
  return (
    <div className="space-y-8 mt-14 container mx-auto">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="h-5 bg-primary/75" />
      ))}
    </div>
  );
};

export default TableLoader;
