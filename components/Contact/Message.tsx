"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MessageField = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      viewport={{ once: true }}
    >
      <label htmlFor="message" className="block mb-2 text-sm font-medium">
        Message
      </label>
      <textarea
        name="message"
        id="message"
        required
        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-sm rounded-lg block w-full p-2.5"
        placeholder={`Let's talk...`}
      />
    </motion.div>
  );
};

export default MessageField;
