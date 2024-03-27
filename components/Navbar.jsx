"use client";
import Link from "next/link";
import NavLink from "./NavLink";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
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

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <section id="Navbar">
      <div className="backdrop-blur border-b border-[#334155] fixed top-0 left-0 right-0 w-full z-50 bg-slate-800 bg-opacity-80 mx-auto transform transition-all duration-[1s]">
        <div className="flex container flex-wrap items-center justify-between px-6 py-2 mx-auto">
          <Link
            href={"#Navbar"}
            className="text-3xl font-semibold rounded-full border-8 border-cyan-400 
            px-6 shadow-lg shadow-cyan-300 bg-slate-900 -rotate-3"
          >
            LOGO
          </Link>
          <div className="md:hidden ">
            {!navbarOpen ? (
              <button
                onClick={() => setNavbarOpen(true)}
                className="flex items-center px-3 py-2 border-2 rounded border-[#334155] text-gray-400 hover:text-white hover:border-gray-400 "
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
          <div className="hidden md:flex md:flex-row">
            <ul
              className="flex flex-row justify-between items-center
           space-x-4 p-1 mx-6"
            >
              {navlinks.map((link, index) => (
                <li key={index}>
                  <NavLink href={link.path} title={link.title} />
                </li>
              ))}
            </ul>
            <Link
              href={"#Contact"}
              className="border-2 border-cyan-400 py-1 px-8 font-bold text-white
           rounded-lg hover:text-white hover:bg-gradient-to-br from-cyan-500  to-blue-500 hover:border-none hover:px-[34px] hover:py-[6px] "
            >
              {`Let's Talk`}
            </Link>
          </div>
        </div>
        {navbarOpen && <MenuOverlay links={navlinks} />}
      </div>
    </section>
  );
};

export default Navbar;
