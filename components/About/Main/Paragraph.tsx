"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Paragraph = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 200 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
      viewport={{ once: true }}
      className="mx-4"
    >
      <p className="text-xs md:text-sm text-white mb-5 leading-5 lg:leading-6 tracking-wider drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.8)]">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa tempora
        id inventore impedit illum dicta quis nisi incidunt dolore quam, labore
        similique praesentium quidem libero eligendi in nemo. Nostrum, accusamus
        fugiat minus quod, vitae iure quisquam illum corporis esse temporibus
        nihil sequi neque aut tenetur at. Necessitatibus quas quaerat atque.
      </p>
      <p className="text-xs md:text-sm text-white mb-5 leading-5 lg:leading-6 tracking-wider drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.8)]">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa tempora
        id inventore impedit illum dicta quis nisi incidunt dolore quam, labore
        similique praesentium quidem libero eligendi in nemo. Nostrum, accusamus
        fugiat minus quod, vitae iure quisquam illum corporis esse temporibus
        nihil sequi neque aut tenetur at.
      </p>
    </motion.div>
  );
};

export default Paragraph;
