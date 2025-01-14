import { auth } from "@/auth";
import UpdatePasswordForm from "@/components/auth/updatePasswordForm";
import UpdateProfileForm from "@/components/auth/UpdateProfileForm";

import { findUserById } from "@/db/queries/userQueries";
import getSession from "@/lib/getSession";
import { serializeData } from "@/lib/helperFunctions";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const sessionUser = session.user;

  const user = await findUserById(sessionUser._id);

  if (!user) {
    redirect("/login");
  }

  const serializeUser = serializeData(user);

  return (
    <div className="max-w-3xl mx-auto bg-black rounded-lg shadow-xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <p className="text-3xl font-bold text-center mb-8">Update Profile </p>
      <UpdateProfileForm user={serializeUser} />
      <div className="flex items-center mt-14">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-600">Change Password</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <UpdatePasswordForm userId={serializeUser._id} />
    </div>
  );
};

export default Page;
