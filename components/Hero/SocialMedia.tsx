import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SocialMediaButton = ({ href, icon, label }: any) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="mx-3 text-white hover:text-cyan-600 transition-transform transform hover:scale-110"
    aria-label={label}
  >
    <FontAwesomeIcon icon={icon} size="2x" />
  </Link>
);

export default SocialMediaButton;
