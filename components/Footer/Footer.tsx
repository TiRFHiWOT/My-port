import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t w-full bg-slate-800 bg-opacity-80 backdrop-blur border-[#334155] flex justify-around">
      <div className="container p-8 flex justify-between items-center">
        <Link
          href={"#Home"}
          className="text-3xl font-semibold rounded-full border-8 border-cyan-400 group px-6 shadow-lg shadow-cyan-300"
        >
          LOGO
        </Link>
        <p className="text-slate-400 text-sm">All rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
