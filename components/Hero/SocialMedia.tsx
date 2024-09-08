import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";

interface SocialMediaButtonProps {
  href: string;
  icon: React.ReactElement;
  label: string;
}

const SocialMediaButton = ({ href, icon, label }: SocialMediaButtonProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="mx-2 text-white text-3xl group
    border-8 border-gray-500 rounded-full p-3  flex justify-center items-center bg-[#ffffff11] backdrop-blur"
    style={{
      textShadow: "10px 10px 15px rgba(0, 0, 0, 0.5)",
      boxShadow: "100px 100px 15px rgba(0, 0, 0, 0.5)",
    }}
    aria-label={label}
  >
    <div className="group-hover:scale-150 transition-transform transform group-hover:text-[#010116]">
      {icon}
    </div>
  </Link>
);

export default SocialMediaButton;
