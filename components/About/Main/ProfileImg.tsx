"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAbout } from "@/store/slice/aboutAdminSlice";

const ProfileImg = () => {
  const dispatch = useDispatch();
  const { about, loading, error } = useSelector(
    (state: RootState) => state.about
  );

  useEffect(() => {
    if (!about) {
      dispatch(fetchAbout());
    }
  }, [dispatch, about]);

  return (
    <motion.div
      initial={{ y: "50%", opacity: 0, scale: 0.85 }}
      animate={about ? { y: "0%", opacity: 1, scale: 1 } : {}}
      whileHover={{
        scale: 1.1,
        rotateY: "-10deg",
        boxShadow: "0 0 20px 10px rgba(0, 0, 0, 0.5)",
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-72 h-72 rounded-full z-10 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden shadow-2xl"
      style={{ boxShadow: "0px 0px 25px 10px rgba(0, 0, 0, 0.3)" }}
    >
      {/* Portfolio Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ perspective: "1000px" }}
        whileHover={{
          scale: 1.1,
          rotateY: 10,
          rotateX: 5,
          boxShadow: "0 0px 60px 20px rgba(0, 0, 0, 0.5)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Cool Border Wrapper */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-full animate-spin-slow border-gray-900"
          initial={{ borderWidth: "0px" }}
          animate={{ borderWidth: "10px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Inner Image Container */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ rotateZ: 0 }}
            animate={{ rotateZ: 2 }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Image
              src={about?.image || "/default-profile.jpg"}
              alt="Profile Image"
              layout="fill"
              objectFit="cover"
              className="rounded-full opacity-95 shadow-2xl rotate-12"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileImg;
