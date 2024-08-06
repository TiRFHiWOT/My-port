import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiSettings,
  FiBook,
  FiBriefcase,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import LogoutButton from "@/components/Button/Logout";

const Layout = ({ children }: any) => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "Skills", icon: <FiSettings /> },
    { name: "Education", icon: <FiBook /> },
    { name: "Projects", icon: <FiBriefcase /> },
    { name: "Experience", icon: <FiUser /> },
    { name: "Testimonials", icon: <FiMessageSquare /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      <nav className="w-64 bg-gray-800 text-gray-200 flex flex-col p-6 fixed h-full shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center mr-3 border-b-2 border-gray-700 pb-3">
          Explore
        </h1>
        <ul className="flex flex-col gap-4 border-b-2 border-gray-700 pb-3">
          {navItems.map(({ name, icon }) => (
            <li key={name}>
              <Link href={`/admin/${name.toLowerCase()}`} passHref>
                <div
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    pathname === `/admin/${name.toLowerCase()}`
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {icon}
                  <span>{name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </nav>
      <div className="flex-1 ml-64 bg-gray-900 text-gray-200 p-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
