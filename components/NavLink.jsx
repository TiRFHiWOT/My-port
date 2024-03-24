import Link from "next/link";

const NavLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="py-5 px-4  text-slate-400 
               md:text-sm hover:text-white hover:scale-125 transform transition-all duration-[0.5s] "
    >
      {title}
    </Link>
  );
};

export default NavLink;
