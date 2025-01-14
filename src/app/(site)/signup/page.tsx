import SignupForm from "@/components/auth/SignupForm";
import { Metadata } from "next";
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Signup",
  description:
    "Create your account to access exclusive features and personalized services. Join us today!",
};

const Page = () => {
  return (
    <div className="flex justify-center items-center">
      <SignupForm />
    </div>
  );
};

export default Page;
