"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const ManageFilters = ({ userFilter }: { userFilter?: boolean }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const handleSearch = (value: string) => {
    if (!value) {
      params.delete("search");
      replace(`${pathname}?${params.toString()}`);
    }

    if (value) {
      params.set("search", value);

      setTimeout(() => {
        replace(`${pathname}?${params.toString()}`);
      }, 1000);
    }
  };

  const handleIsPublished = (value: string) => {
    if (value === "all") {
      params.delete("isPublished");
      replace(`${pathname}?${params.toString()}`);
      return;
    }

    params.set("isPublished", value);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleStatus = (value: string) => {
    if (value === "all") {
      params.delete("status");
      replace(`${pathname}?${params.toString()}`);
      return;
    }

    params.set("status", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      <Input
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        className=" text-white border-gray-600"
      />
      {userFilter ? (
        <Select onValueChange={handleStatus}>
          <SelectTrigger className="w-[180px] border-gray-600 text-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className=" text-white ">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <Select onValueChange={handleIsPublished}>
          <SelectTrigger className="w-[180px] border-gray-600 text-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className=" text-white ">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Published</SelectItem>
            <SelectItem value="false">Draft</SelectItem>
          </SelectContent>
        </Select>
      )}
      <Button
        onClick={() => {
          replace(`${pathname}`);
        }}
        variant="destructive"
        className="border-gray-600 text-white"
      >
        Clear
      </Button>
    </div>
  );
};

export default ManageFilters;
