import React from "react";
import Link from "next/link";
import NavLink from "./NavLink";

const MenuOverlay = ({ links }) => {
  return (
    <div>
      <ul
        className="glass flex flex-col items-center p-5 md:hidden border-x
       border-[#334155] border-t rounded-t-lg mx-[20%] text-center -z-10"
      >
        {links.map((link, index) => (
          <li
            key={index}
            className="py-2 hover:scale-105 text-xl 
            w-full border-[#334155]"
          >
            <NavLink href={link.path} title={link.title} />
          </li>
        ))}
        <Link
          href={"#Contact"}
          className="py-2 font-bold text-white text-xl "
        >
          {`Let's Talk`}
        </Link>
      </ul>
    </div>
  );
};

export default MenuOverlay;
