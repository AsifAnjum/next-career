import { Skeleton } from "./skeleton";

const HomePageCardLoader = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <Skeleton key={index} className="h-[236px] w-[496px] rounded-xl" />
  ));
};

export default HomePageCardLoader;
