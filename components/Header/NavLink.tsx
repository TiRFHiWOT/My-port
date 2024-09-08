import Link from "next/link";

const NavLink = ({ href, title }: any) => {
  return (
    <Link
      href={href}
      className="py-5 px-4 text-gray-100 tracking-widest md:text-sm hover:text-cyan-600 hover:scale-125"
    >
      {title}
    </Link>
  );
};

export default NavLink;
