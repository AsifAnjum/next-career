import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../ui/card";

import { User, CalendarDays } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { IBlog } from "@/db/models/blogModel";
import { dateString } from "@/lib/helperFunctions";

interface BlogPageCardProps {
  post: IBlog;
}

const BlogPageCard = ({ post }: BlogPageCardProps) => {
  return (
    <Card
      key={post.id}
      className="bg-slate-900 hover:shadow-indigo-400 hover:shadow-md"
    >
      {/* Content Section */}
      <div className="">
        <CardHeader>
          <CardTitle>
            <Link
              className="hover:text-gray-400 duration-500"
              href={`/blog/${post.slug}`}
            >
              {post.title}
            </Link>
          </CardTitle>
          <CardDescription>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <Link
                  className="hover:underline hover:text-blue-500 duration-500"
                  href={`/blogs/?user=${post.authorInfo._id}`}
                >
                  {post.authorInfo.name}
                </Link>
              </span>
              <span className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" />
                {dateString(post.createdAt, false)}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Badge className="mb-2">{post.category}</Badge>

          <div
            className="text-sm prose prose-invert text-gray-400 mb-4 line-clamp-2 lg:line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Link className="primary__link" href={`/blog/${post.slug}`}>
            Discover More Insights
          </Link>
        </CardContent>
      </div>
    </Card>
  );
};

export default BlogPageCard;
