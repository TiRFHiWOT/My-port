import { motion } from "framer-motion";
import Image from "next/image";

const Background = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className=" absolute inset-0 -z-50"
    >
      <Image alt="" src="/pngegg (2).png" layout="fill" objectFit="cover" />
    </motion.div>
  );
};

export default Background;
