"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const EmailField = ({ value, onChange }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 200 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0 }}
      viewport={{ once: true }}
    >
      <label htmlFor="email" className="block mb-2 text-sm font-medium">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={value}
        onChange={onChange}
        required
        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-100 text-sm rounded-lg block w-full p-2.5"
        placeholder="youremail@example.com"
      />
    </motion.div>
  );
};

export default EmailField;
