import Link from "next/link";
import { Button } from "../ui/button";
import { RainbowButton } from "../ui/rainbowButton";
import { ArrowRight, BookOpen, Briefcase, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className=" text-white">
      <div className="px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your Dream Job & Stay Informed
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Discover exciting career opportunities and read insightful industry
          articles
        </p>
        <div className="space-x-4">
          <RainbowButton>
            <Link href="/jobs">Browse Jobs</Link>
          </RainbowButton>
          <Button asChild variant="default" className="h-12">
            <Link href="/blogs">Read Blogs</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-20">
        <div className="bg-[#181820] p-6 rounded-lg">
          <Briefcase className="w-12 h-12 mx-auto mb-4 text-blue-400" />
          <p className="text-xl font-semibold mb-2">Diverse Opportunities</p>
          <p className="text-gray-300 line-clamp-2">
            From tech startups to Fortune 500 companies, find roles that match
            your skills and aspirations.
          </p>
        </div>
        <div className="bg-[#181820] p-6 rounded-lg">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-green-400" />
          <p className="text-xl font-semibold mb-2">Industry Insights</p>
          <p className="text-gray-300 line-clamp-2">
            Stay ahead with our curated articles on industry trends, career
            advice, and professional development.
          </p>
        </div>
        <div className="bg-[#181820] p-6 rounded-lg">
          <Users className="w-12 h-12 mx-auto mb-4 text-purple-400" />
          <p className="text-xl font-semibold mb-2">Community Support</p>
          <p className="text-gray-300 line-clamp-2">
            Connect with like-minded professionals, share experiences, and grow
            your network.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Take the Next Step?
        </h2>
        <p className="text-xl text-gray-300 mb-6">
          Join thousands of professionals who&apos;ve found their dream careers
          through our platform.
        </p>
        <Button asChild size="lg">
          <Link
            href="/signup"
            className="items-center hover:bg-black hover:text-white duration-500 transition-colors"
          >
            Get Started <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
