/* eslint-disable @next/next/no-img-element */

import { navItem } from "@/lib/constant";

import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Skeleton } from "../ui/skeleton";
import NavLink from "@/components/ui/NavLink";

import { signOut } from "@/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Menu, User } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";
import getSession from "@/lib/getSession";

const Navbar = async () => {
  const session = await getSession();
  const isLoggedIn = session ? true : false;

  return (
    <header>
      <nav className="mx-auto flex items-center justify-between max-w-screen-2xl overflow-x-hidden">
        <div className="md:hidden">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              aria-label="trigger"
              asChild
              className="border border-white"
            >
              <Menu size={30} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-900 shadow-lg rounded-md rounded-t p-2 w-48">
              {navItem
                .filter(
                  (item) =>
                    item.isLoggedIn === undefined ||
                    item.isLoggedIn === isLoggedIn
                )
                .map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    className="p-2 rounded group "
                  >
                    <Link
                      href={item.url}
                      className="text-gray-800 group-hover:text-white text-sm font-medium"
                    >
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link href="/">
          <Image
            src="/logo.png"
            width={144}
            // className="w-36 h-36"
            height={144}
            alt="logo"
            loading="eager"
          />
        </Link>

        <ul className="lg:gap-10 gap-7 font-semibold tracking-widest hidden md:flex">
          {navItem
            .filter(
              (item) =>
                item.isLoggedIn === undefined || item.isLoggedIn === isLoggedIn
            )
            .map((item) => (
              <li key={item.id}>
                <NavLink href={item.url}>{item.title}</NavLink>
              </li>
            ))}
        </ul>

        <div className="font-semibold tracking-widest">
          {session?.user?._id ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={session.user?.image || "/defaultProfile.jpeg"}
                    alt={session.user.name[0] || "User"}
                  />
                  <AvatarFallback className="capitalize bg-pink-400">
                    {session.user.name[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-900 shadow-lg rounded-md rounded-t  w-48">
                <DropdownMenuItem className="rounded group">
                  <User className="text-black group-hover:text-white" />
                  <Link
                    href="/dashboard/profile"
                    className="text-gray-800 group-hover:text-white text-sm font-medium"
                  >
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2 rounded group">
                  <LogOut className="text-black group-hover:text-white" />
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <button
                      type="submit"
                      className="!text-gray-800 text-sm font-medium group-hover:!text-red-500"
                    >
                      Sign Out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // <Button variant="primaryOutline" size="lg">
            //   <Link href="/login">Login</Link>
            // </Button>

            <form
              action={async () => {
                "use server";
                // await signIn()
                redirect("/login");
              }}
            >
              <Button variant="primaryOutline" size="lg" type="submit">
                Login
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
