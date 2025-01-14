import Link from "next/link";

import LoginForm from "@/components/auth/LoginForm";

import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Access your account to explore features, manage your profile, and stay updated. Login now!",
};

const LoginPage = async () => {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center py-32">
      <div className="bg-white p-8 rounded-lg shadow-lg text-black w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login To Next Career
        </h1>

        <LoginForm />

        <div>
          <p className="mt-8 text-center text-slate-700">
            New User?{" "}
            <Link
              href="/signup"
              className="text-blue-500 hover:text-blue-700 duration-500 underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
