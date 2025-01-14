"use client";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const BlogSearch = () => {
  const router = useRouter();
  return (
    <div className="space-y-2">
      <Label htmlFor="search">Search Posts</Label>
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const value = (e.target as HTMLInputElement).value.trim();
            if (value) {
              router.push(`/blogs?search=${encodeURIComponent(value)}`);
            }
          }
        }}
        id="search"
        placeholder="Enter keywords..."
      />
    </div>
  );
};

export default BlogSearch;
