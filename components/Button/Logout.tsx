import React from "react";
import { useLogout } from "@/utiles/auth";
import { FiLogOut } from "react-icons/fi";

const LogoutButton: React.FC = () => {
  const Logout = useLogout();
  return (
    <button
      onClick={Logout}
      className="mt-10 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      <FiLogOut size={20} />
      Log Out
    </button>
  );
};

export default LogoutButton;
