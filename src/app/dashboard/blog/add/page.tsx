import BlogForm from "@/components/dashboard/blog/BlogForm";

const AddBlog = () => {
  return (
    <div className="max-w-3xl mx-auto bg-black rounded-lg shadow-xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <p className="text-3xl font-bold text-center mb-8">Add Blog</p>
      <BlogForm />
    </div>
  );
};

export default AddBlog;
