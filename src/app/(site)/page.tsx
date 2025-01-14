import AboutUs from "@/components/home/AboutUs";
import Categories from "@/components/home/Categories";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import Hero from "@/components/home/Hero";
import NewsLetter from "@/components/home/NewsLetter";
import PopularBlogs from "@/components/home/PopularBlogs";

export default function Home() {
  return (
    <div className="space-y-36 container mx-auto overflow-hidden">
      <Hero />
      <FeaturedJobs />
      <PopularBlogs />
      <Categories />
      <AboutUs />
      <NewsLetter />
    </div>
  );
}
