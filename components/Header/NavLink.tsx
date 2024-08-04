import Link from "next/link";

const NavLink = ({ href, title }: any) => {
  return (
    <Link
      href={href}
      className="py-5 px-4 text-slate-400 md:text-sm hover:text-white hover:scale-125"
    >
      {title}
    </Link>
  );
};

export default NavLink;
