import { blogCategories } from "@/lib/constant";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";
import FeaturedBlogs from "./FeaturedBlogs";
import BlogSearch from "./BlogSearch";

const BlogSidebar = () => {
  return (
    <aside className="lg:w-2/3 w-full max-xl:mx-auto  space-y-6">
      {/* search  */}
      <div className="blog__sideBar_bg">
        <h2 className="text-xl font-semibold mb-4">Search</h2>
        <BlogSearch />
      </div>

      {/* categories */}
      <div className="blog__sideBar_bg">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-4">
          <li>
            <Link
              href="/blogs"
              className="text-blue-400 hover:text-blue-300 p-0"
            >
              All
            </Link>
          </li>
          {blogCategories.map((category) => (
            <li key={category.id}>
              <Link
                href={category.url}
                className="text-blue-400 hover:text-blue-300 p-0"
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="blog__sideBar_bg ">
        <h2 className="text-xl font-semibold mb-4">Featured Post</h2>
        <ul className="space-y-2">
          <FeaturedBlogs />
        </ul>
      </div>

      <div className="blog__sideBar_bg">
        <h2 className="text-xl font-semibold mb-4">Subscribe</h2>
        <p className="text-sm text-gray-400 mb-4">
          Stay updated with our latest blog posts and career insights.
        </p>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
          <Button className="w-full">Subscribe</Button>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
