"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  href: string;
}

const NavLink = ({ children, href }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`navbar__link ${
        pathname === href || (href !== "/" && pathname.startsWith(href))
          ? "bg-white text-black px-2 rounded-lg hover:text-black/80"
          : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
