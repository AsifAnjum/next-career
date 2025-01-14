import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getRelatedBlogs } from "@/db/queries/blogQueries";

interface RelatedBlogsProps {
  tags: string[];
  currentBlogId: string;
}

const RelatedBlogs = async ({ tags, currentBlogId }: RelatedBlogsProps) => {
  const relatedPosts = await getRelatedBlogs(tags, currentBlogId);

  if (!relatedPosts) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
      <div className="space-y-4">
        {relatedPosts.map((post) => (
          <Card key={post._id} className="bg-[#2a2b2f] border-gray-700">
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-400 hover:underline"
                >
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription
                className="mb-2 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <Badge>{post.category}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedBlogs;
