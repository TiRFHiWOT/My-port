"use client";
import Link from "next/link";
import NavLink from "./NavLink";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Menu from "./MenuOverlay";
import MenuOverlay from "./MenuOverlay";

const Navlinks = [
  {
    title: "About",
    path: "#About",
  },
  {
    title: "Skill",
    path: "#Skill",
  },
  {
    title: "Projects",
    path: "#Projects",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <div
        className="flex flex-wrap justify-between items-center backdrop-blur
       px-5 py-3 border border-[#334155] fixed top-0 left-0 right-0 z-50 h-15 bg-slate-800 bg-opacity-80"
      >
        <Link href={"/"} className="text-3xl font-semibold">
          LOGO
        </Link>
        <div className="block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-gray-400 text-gray-400 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-gray-400 text-gray-400 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="hidden md:flex md:flex-row" id="Navbar">
          <ul
            className="flex flex-row justify-between items-center
           space-x-4 p-1 mx-6"
          >
            {Navlinks.map((link, index) => (
              <li key={index} className="text-sm">
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>

          <button
            className="border-2 border-indigo-500 py-1 px-4
           rounded-full hover:bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700 hover:border-none hover:px-[18px]"
          >
            Lets Talk
          </button>
        </div>
        {navbarOpen && <MenuOverlay links={Navlinks} />}
      </div>
    </>
  );
};

export default Navbar;
