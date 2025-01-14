import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./prosemirror.css";
// import './'

import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Next Career",
    default: "Next Career",
  },
  description:
    "Explore job opportunities and career advice with Next Career. Find your dream role, stay updated on industry trends, and gain insights through expert blog posts tailored for today's professionals.",
  keywords: [
    "jobs",
    "careers",
    "job search",
    "career advice",
    "blog",
    "job openings",
    "react",
    "nextjs",
    "programmer",
    "developer",
    "software engineer",
    "tech industry",
    "career growth",
    "industry trends",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className={`${poppins.className} `}>
        {children}
        <Toaster richColors position="top-right" visibleToasts={2} />
      </body>
    </html>
  );
}
