import { auth } from "@/auth";
import Profile from "@/components/dashboard/Profile";
import { findUserByEmail } from "@/db/queries/userQueries";
import getSession from "@/lib/getSession";
import { serializeData } from "@/lib/helperFunctions";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const sessionUser = session.user;

  const user = await findUserByEmail(sessionUser.email);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-black bg-opacity-30">
        <h2 className="text-xl font-semibold">User Profile</h2>
      </div>

      {/* Profile Details */}
      <Profile user={serializeData(user)} />
    </div>
  );
};

export default Page;
