import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links }) => {
  return (
    <div>
      <ul className="flex flex-col items-center p-5 md:hidden">
        {links.map((link, index) => (
          <li key={index} className="py-2 hover:scale-105 text-xl">
            <NavLink href={link.path} title={link.title} />
          </li>
        ))}
        <button
          href={"#contact"}
          className="py-2 font-bold text-white text-xl "
        >
          {`Let's Talk`}
        </button>
      </ul>
    </div>
  );
};

export default MenuOverlay;
