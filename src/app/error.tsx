"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" mt-24">
        <h2 className="text-4xl font-bold text-red-500 mb-4">
          Something Went Wrong!
        </h2>
        <p className="text-lg text-gray-500 mb-8">
          An unexpected error has occurred. Please try again later.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button size="lg" onClick={() => reset()}>
            Try Again
          </Button>
          <Link
            href="/"
            className="p-2 rounded-lg border border-white shadow-sm hover:bg-white hover:text-black duration-500 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
