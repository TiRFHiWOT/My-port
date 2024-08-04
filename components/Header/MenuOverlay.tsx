import React from "react";
import Link from "next/link";
import NavLink from "./NavLink";

interface Link {
  title: string;
  path: string;
}

interface MenuOverlayProps {
  links: Link[];
  closeOverlay: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ links, closeOverlay }) => {
  return (
    <div className="h-[100vh] flex justify-center inset-0 bg-[#101522] bg-opacity-75">
      <ul
        className="glass flex flex-col items-center p-5 md:hidden h-fit px-20 mt-16
       border-[#334155] bg-[#1b1e25] border rounded-xl text-center"
      >
        {links.map((link, index) => (
          <li
            key={index}
            className="py-2 hover:scale-105 text-xl 
            w-full border-[#334155]"
            onClick={closeOverlay}
          >
            <NavLink href={link.path} title={link.title} />
          </li>
        ))}
        <Link
          href={"#Contact"}
          className="py-2 font-bold text-white text-xl"
          onClick={closeOverlay}
        >
          {`Let's Talk`}
        </Link>
      </ul>
    </div>
  );
};

export default MenuOverlay;
