import { Navbar } from "@/components";
import Footer from "@/components/common/Footer";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="my-20 flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
