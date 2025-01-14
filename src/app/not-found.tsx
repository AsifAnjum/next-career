import { Navbar } from "@/components";
import Footer from "@/components/common/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mt-24 flex-grow">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-red-500">404</h1>

          <p className="mt-4 text-2xl font-semibold">Oops! Page Not Found</p>
          <p className="mt-2 text-gray-400">
            The page you’re looking for doesn’t exist or has been moved.
          </p>

          <div className="mt-6">
            <Link
              href="/"
              className="p-3 rounded-lg border border-white shadow-sm hover:bg-white hover:text-black duration-500 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
