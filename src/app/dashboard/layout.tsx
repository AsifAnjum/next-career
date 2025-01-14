import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import getSession from "@/lib/getSession";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Next Career Dashboard!",
};

const DashboardLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const userRole = session?.user?.role;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar userRole={userRole} />
      <SidebarInset>
        <main className="p-4 overflow-hidden">
          <SidebarTrigger />

          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
