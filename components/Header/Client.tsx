"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";

const navlinks = [
  {
    title: "About",
    path: "#About",
  },
  {
    title: "Work",
    path: "#Work",
  },
  {
    title: "Projects",
    path: "#Projects",
  },
];

const ClientNavbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNavbarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 w-full z-50 transform transition-all duration-300 px-10 ${
        scrolling
          ? "bg-slate-800 bg-opacity-80 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between px-6 py-2 mx-auto w-full">
        <Link
          href={"#Navbar"}
          className="text-3xl font-semibold rounded-full border-8 border-cyan-400 px-6 shadow-lg shadow-cyan-300 bg-slate-900 -rotate-3 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-cyan-400 border-cyan-400 border-2 rounded-lg p-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M2 12h20" />
          </svg>
          <div className=" text-orange-700">MD</div>
        </Link>

        <div className="md:hidden flex items-center justify-end w-full">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border-2 rounded border-[#334155] text-gray-400 hover:text-white hover:border-gray-400"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border-2 rounded border-[#334155] text-gray-400 hover:text-white hover:border-gray-400"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="hidden md:flex w-full items-center justify-end">
          <ul className="flex flex-row justify-between items-center space-x-3 mr-4">
            {navlinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
          <Link
            href={"#Contact"}
            className="border-2 backdrop-blur border-cyan-400 py-1 px-8 font-bold text-white rounded-lg hover:text-white hover:bg-gradient-to-br from-cyan-500 to-blue-500 hover:border-none hover:px-[34px] hover:py-[6px]"
          >
            {`Let's Talk`}
          </Link>
        </div>
      </div>
      {navbarOpen && (
        <MenuOverlay
          links={navlinks}
          closeOverlay={() => setNavbarOpen(false)}
        />
      )}
    </div>
  );
};

export default ClientNavbar;
