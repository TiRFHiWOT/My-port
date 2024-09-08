import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiSettings,
  FiBook,
  FiBriefcase,
  FiUser,
  FiMessageSquare,
  FiPhoneCall,
} from "react-icons/fi";
import LogoutButton from "@/components/Button/Logout";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";

const Layout = ({ children }: any) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "Skills", icon: <FiSettings /> },
    { name: "Education", icon: <FiBook /> },
    { name: "Projects", icon: <FiBriefcase /> },
    { name: "Experience", icon: <FiUser /> },
    { name: "Testimonials", icon: <FiMessageSquare /> },
    { name: "Contact", icon: <FiPhoneCall /> },
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      {/* Desktop menu */}
      <nav className="hidden md:flex flex-col w-64 bg-gray-800 text-gray-200 p-6 fixed h-full shadow-2xl border-r border-gray-700">
        <h1 className="text-3xl font-bold mb-3 text-center border-b-2 border-gray-700 pb-5 flex items-center justify-start gap-3 ml-1">
          <FaGlobe className="text-blue-400" />
          Explore
        </h1>
        <ul className="flex flex-col gap-3 border-b-2 border-gray-700 pb-3">
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

      {/* Mobile menu button */}
      <button
        className="fixed top-7 left-5 z-50 md:hidden text-gray-200"
        onClick={handleMobileMenuToggle}
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 left-0 w-64 backdrop-blur-lg text-gray-200 p-6 h-full z-40 transform border-r border-gray-800 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:hidden`}
      >
        <h1 className="text-3xl font-bold mb-3 text-center mr-3 border-b-2 border-gray-700 pb-5">
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
        <div className="mt-auto ">
          <LogoutButton />
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 p-8 md:ml-64 bg-gray-900 text-gray-200 transition-transform ${
          isMobileMenuOpen ? "md:ml-0" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
