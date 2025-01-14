import ManageUsers from "@/components/dashboard/user/ManageUsers";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <div className="container mx-auto rounded-lg shadow-lg overflow-hidden bg-black py-12 max-md:absolute">
      <ManageUsers searchParams={searchParams} />
    </div>
  );
};

export default Page;
