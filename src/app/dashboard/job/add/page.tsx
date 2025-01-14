import JobForm from "@/components/dashboard/job/JobForm";

const AddJob = () => {
  return (
    <div className="max-w-3xl mx-auto bg-black rounded-lg shadow-xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <p className="text-3xl font-bold text-center mb-8">Add Job </p>
      <JobForm />
    </div>
  );
};

export default AddJob;
