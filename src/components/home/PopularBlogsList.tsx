import { getAllBlogs } from "@/db/queries/blogQueries";
import ItemNotFound from "../ui/ItemNotFound";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CalendarDays } from "lucide-react";
import { dateString } from "@/lib/helperFunctions";
import Link from "next/link";

const PopularBlogsList = async () => {
  const { blogs } = await getAllBlogs({ sort: { views: -1 }, limit: 3 });

  if (!blogs) {
    return <ItemNotFound message="something went wrong" />;
  }

  return blogs.map((post) => (
    <Card key={post._id} className="bg-[#0c0d0f] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">{post.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">
              {dateString(post.createdAt, false)}
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={post.authorInfo.image || "/defaultProfile.jpeg"}
                alt={post.authorInfo.name}
              />
              <AvatarFallback className="text-sm">author</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-400">
              {post.authorInfo.name}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="text-sm prose prose-invert text-gray-400  line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <Link
          href={`/blog/${post.slug}`}
          className=" text-blue-600 hover:text-blue-300"
        >
          Continue Reading
        </Link>
      </CardContent>
    </Card>
  ));
};

export default PopularBlogsList;
