"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Paragraph = () => {
  const { about, loading, error } = useSelector(
    (state: RootState) => state.about
  );
  const [contentHTML, setContentHTML] = useState<string>("");

  useEffect(() => {
    if (about?.description) {
      const processHTMLContent = (html: string) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        const paras = tempDiv.querySelectorAll("p");
        paras.forEach((para) => {
          para.style.marginBottom = "1rem";
        });

        return tempDiv.innerHTML;
      };

      setContentHTML(processHTMLContent(about.description));
    }
  }, [about?.description]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
      viewport={{ once: true }}
      className="mx-4"
    >
      <div
        className="text-xs md:text-sm text-white mb-5 leading-5 lg:leading-6 tracking-wider drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.8)]"
        dangerouslySetInnerHTML={{ __html: contentHTML }}
      />
    </motion.div>
  );
};

export default Paragraph;
