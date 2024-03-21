"use client";
import Link from "next/link";
import NavLink from "./NavLink";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Menu from "./MenuOverlay";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";
import { motion } from "framer-motion";

const navlinks = [
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
      <div className="backdrop-blur border-b border-[#334155] fixed top-0 left-0 right-0 w-full z-30 bg-slate-800 bg-opacity-80 ">
        <div className="flex container flex-wrap items-center justify-between  px-10 py-2">
          <Link
            href={"#Home"}
            className="text-3xl font-semibold rounded-full border-8 border-cyan-400 group px-6 shadow-lg shadow-cyan-300 bg-slate-900  "
          >
            LOGO
          </Link>

          <div className="md:hidden">
            {!navbarOpen ? (
              <button
                onClick={() => setNavbarOpen(true)}
                className="flex items-center px-3 py-2 border rounded border-gray-400 text-gray-400 hover:text-white"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => setNavbarOpen(false)}
                className="flex items-center px-3 py-2 border rounded border-gray-400 text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="hidden md:flex md:flex-row " id="Navbar">
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

            <button
              href={"#contact"}
              className="border-2 border-white py-1 px-8 font-bold text-white
           rounded-full hover:bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700 hover:border-none hover:px-[34px] hover:py-[6px]"
            >
              {`Let's Talk`}
            </button>
          </div>
        </div>
        {navbarOpen && <MenuOverlay links={navlinks} />}
      </div>
    </>
  );
};

export default Navbar;
