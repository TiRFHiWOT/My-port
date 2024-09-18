"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbout } from "@/store/slice/aboutAdminSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";

const ButtonOne = ({ href, text }: any) => {
  const dispatch = useDispatch();
  const { about, loading, error } = useSelector(
    (state: RootState) => state.about
  );

  useEffect(() => {
    dispatch(fetchAbout());
  }, [dispatch]);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ y: "200px", opacity: 0 }}
      animate={inView ? { y: "0", opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {about && about.cv ? (
        <a href={about.cv} download className="button-86" role="button">
          Download CV
        </a>
      ) : (
        ""
      )}
    </motion.div>
  );
};

export default ButtonOne;
