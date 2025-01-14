import { Badge } from "@/components/ui/badge";
import { IBlog } from "@/db/models/blogModel";
import { dateString } from "@/lib/helperFunctions";
import { BadgeCheck, CalendarDays, User, VerifiedIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPostProps {
  post: IBlog;
}

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="flex items-center mt-5 text-xl ">
        {/* <User className="h-4 w-4 mr-1" /> */}
        <Image
          src={post.authorInfo.image || "/defaultProfile.jpeg"}
          width={30}
          height={30}
          className="rounded-full mr-2 ring-2 ring-purple-400"
          alt={post.authorInfo.name}
        />
        {post.authorInfo.name}{" "}
        {post.authorInfo.isVerified && (
          <BadgeCheck
            size={14}
            xlinkTitle="verified"
            className="text-yellow-400 mb-4 ml-1"
          />
        )}
      </div>
      <p className="flex items-center text-sm text-gray-400 mt-5">
        <CalendarDays className="h-4 w-4 mr-1" />
        {dateString(post.createdAt)}
      </p>
      <div className="mt-5">
        <Badge className="capitalize">
          <Link href={`/blogs?category=${post.category}`}>{post.category}</Link>
        </Badge>

        <div className="mt-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <div
              key={tag}
              className="p-[1px] rounded bg-gradient-to-r from-purple-500 to-indigo-500"
            >
              <Link
                href={`/blogs/?tags=${tag}`}
                className=" bg-slate-800 rounded p-1 text-xs hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 block"
              >
                {tag}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div
        className="prose prose-invert max-w-none mt-20"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default BlogPost;
