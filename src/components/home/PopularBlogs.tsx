import Link from "next/link";

import PopularBlogsList from "./PopularBlogsList";
import { Suspense } from "react";
import HomePageCardLoader from "../ui/homePageCardLoader";

const PopularBlogs = () => {
  return (
    <section>
      <h2 className="section__title">Popular Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<HomePageCardLoader />}>
          <PopularBlogsList />
        </Suspense>
      </div>
      <div className="text-center mt-8">
        <Link href="/blogs?sort=-views" className="primary_outline__link">
          View Popular Blogs
        </Link>
      </div>
    </section>
  );
};

export default PopularBlogs;
