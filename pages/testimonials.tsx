import { motion } from "framer-motion";
import Test from "@/components/Testimonials/Main/Test";
import type { Metadata } from "next";
import savePageVisit from "@/utiles/pageTracker";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Testimonials page",
  description: "Testimonials of portfolio",
};

const Testimonials = () => {
  useEffect(() => {
    savePageVisit("testimonials");
  }, []);
  return (
    <section className="relative py-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-gradient-to-br from-blue-500 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 8, ease: "easeOut", delay: 0.5 }}
          className="absolute top-[10%] right-[-20%] w-[400px] h-[400px] bg-gradient-to-br from-purple-500 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 8, ease: "easeOut", delay: 1 }}
          className="absolute bottom-[-20%] left-[10%] w-[600px] h-[600px] bg-gradient-to-br from-yellow-500 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 8, ease: "easeOut", delay: 1.5 }}
          className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-gradient-to-br from-red-500 to-transparent rounded-full blur-3xl"
        />
      </div>
      <Test />
    </section>
  );
};

export default Testimonials;
