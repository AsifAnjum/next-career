import Link from "next/link";
import { Suspense } from "react";
import FeaturedJobsList from "./FeaturedJobsList";
import HomePageCardLoader from "../ui/homePageCardLoader";

const FeaturedJobs = () => {
  return (
    <section className="">
      <h2 className="section__title">Featured Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<HomePageCardLoader />}>
          <FeaturedJobsList />
        </Suspense>
      </div>
      <div className="text-center mt-8">
        <Link href="/jobs" className="primary_outline__link">
          View Jobs
        </Link>
      </div>
    </section>
  );
};

export default FeaturedJobs;
