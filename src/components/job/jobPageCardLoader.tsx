import { Skeleton } from "../ui/skeleton";

const JobPageCardLoader = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} className="h-60 w-[550px] rounded-xl"></Skeleton>
      ))}
    </div>
  );
};

export default JobPageCardLoader;
