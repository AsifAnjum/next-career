import Profile from "@/components/dashboard/Profile";
import UpdateUserByStaff from "@/components/dashboard/user/UpdateUserByStaff";
import ItemNotFound from "@/components/ui/ItemNotFound";
import { findUserById } from "@/db/queries/userQueries";
import { admin } from "@/lib/constant";
import getSession from "@/lib/getSession";
import { serializeData } from "@/lib/helperFunctions";

type Params = Promise<{ id: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const session = await getSession();

  if (!session) {
    return <ItemNotFound message="You are not authorized" />;
  }

  const authUser = session.user;

  const user = await findUserById(id);

  if (!user) {
    return (
      <ItemNotFound message="No User Found" className="text-destructive" />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden">
      <div className=" bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg rounded-lg ">
        {/* Header */}
        <div className="px-6 py-4 bg-black bg-opacity-30 rounded-t-lg">
          <h2 className="text-xl font-semibold">User Profile</h2>
        </div>

        {/* Profile Details */}
        <Profile user={serializeData(user)} />
      </div>

      {/* Update User Info */}

      {(user.role !== admin ||
        (user.role === admin && authUser.role === admin)) && (
        <div className=" bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg rounded-lg mt-20">
          <div className="px-6 py-4 bg-black bg-opacity-30 rounded-t-lg">
            <h2 className="text-xl font-semibold">Update User</h2>
          </div>

          <UpdateUserByStaff
            userId={user._id.toString()}
            status={user.status}
            role={user.role}
            isVerified={user.isVerified}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
