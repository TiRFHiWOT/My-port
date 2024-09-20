import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t w-full bg-slate-800 bg-opacity-80 backdrop-blur border-[#334155] flex justify-around">
      <div className="container px-10 md:px-20 flex justify-between items-center">
        <Link
          href={"#Navbar"}
          className="text-3xl font-semibold rounded-full border-8 border-cyan-400 px-6 shadow-lg shadow-cyan-300 bg-slate-900 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-cyan-400 border-cyan-400 border-2 rounded-lg p-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M2 12h20" />
          </svg>
          <div className=" text-orange-700">MD</div>
        </Link>
        <p className="text-slate-400 text-sm">All rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
