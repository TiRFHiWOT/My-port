import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialMediaButton = ({ href, icon, label }: any) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="mx-3 text-white hover:text-cyan-600 transition-transform transform hover:scale-110"
    aria-label={label}
  >
    <FontAwesomeIcon icon={icon} size="2x" />
  </a>
);

export default SocialMediaButton;
