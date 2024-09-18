import { FC } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaTools } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

interface TabIconProps {
  selectedTab: string;
}

const TabIcon: FC<TabIconProps> = ({ selectedTab }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const icons = {
    skills: {
      icon: <FaTools size={300} className="text-blue-500" />,
      color: "",
      shadow: "shadow-blue-500/60",
    },
    education: {
      icon: <FaGraduationCap size={300} className="text-yellow-500" />,
      color: "",
      shadow: "shadow-yellow-500/60",
    },
  };

  const currentIcon = icons[selectedTab] || icons.skills;

  return (
    <motion.div
      ref={ref}
      className={`flex justify-center items-center h-full w-full bg-gradient-to-br ${currentIcon.color} rounded-full border border-gray-700 p-10 ${currentIcon.shadow} transform-gpu`}
      whileHover={{ scale: 1.15, rotateY: 20, rotateX: 15 }}
      whileTap={{ scale: 0.95, rotateY: -20 }}
      initial={{ opacity: 0, scale: 0.6, rotateY: -10 }}
      whileInView={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <motion.div
        className="relative"
        initial={{ filter: "brightness(0.8)" }}
        whileHover={{
          filter: "brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.3))",
        }}
        transition={{ duration: 0.4 }}
      >
        {currentIcon.icon}
      </motion.div>
    </motion.div>
  );
};

export default TabIcon;
