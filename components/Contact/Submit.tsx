"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Bars } from "react-loader-spinner";

const SubmitButton = ({ loading }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={inView ? { opacity: 1, scaleX: 1 } : {}}
      transition={{
        delay: 0.7,
        duration: 0.2,
        type: "spring",
        stiffness: 700,
      }}
      viewport={{ once: true }}
      type="submit"
      className={`bg-blue-500 hover:bg-blue-600 font-medium rounded-lg block w-full p-2.5  ${
        loading ? "cursor-not-allowed opacity-50" : ""
      }`}
      disabled={loading}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <Bars
            height="24"
            width="24"
            color="#ffffff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        "Send Message"
      )}
    </motion.button>
  );
};

export default SubmitButton;
