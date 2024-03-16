import Link from "next/link";

const NavLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="py-3 px-4 text-gray-400 
              sm:text-xl rounded hover:text-white"
    >
      {title}
    </Link>
  );
};

export default NavLink;
