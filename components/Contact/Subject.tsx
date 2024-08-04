"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SubjectField = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      viewport={{ once: true }}
    >
      <label htmlFor="subject" className="block mb-2 text-sm font-medium">
        Subject
      </label>
      <input
        type="text"
        id="subject"
        required
        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-sm rounded-lg block w-full p-2.5"
        placeholder="What's in your mind."
      />
    </motion.div>
  );
};

export default SubjectField;
