"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-20">
      <Button
        size="sm"
        variant="dark"
        onClick={() => handlePagination(page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <Button
          key={number}
          variant={page === number ? "default" : "primaryOutline"}
          size="sm"
          className={page === number ? "pointer-events-none" : ""}
          onClick={() => handlePagination(number)}
        >
          {number}
        </Button>
      ))}
      <Button
        size="sm"
        variant="dark"
        onClick={() => handlePagination(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
