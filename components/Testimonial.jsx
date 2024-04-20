"use client";
import { db } from "@/app/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection, query, limit } from "firebase/firestore";
import TestimonialCard from "@/components/TestimonialCard";
import { motion } from "framer-motion";

const Testimonial = () => {
  const testmonialCollectionRef = collection(db, "testimonial");

  const [testimonial, setTestimonial] = useState([]);

  useEffect(() => {
    const getTestimonial = async () => {
      const data = await getDocs(query(testmonialCollectionRef, limit(3)));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTestimonial(filteredData);
    };
    getTestimonial();
  }, []);

  return (
    <section>
      <div className="bg-slate-900 rounded-xl mx-8 lg:mx-24 lg:p-5 lg:my-24 bg-opacity-50">
        <p className="text-lg md:text-xl pt-6 pb-2 tracking-wider text-gray-500 px-10">{`WHAT OTHER'S SAY`}</p>
        <h1 className="text-3xl lg:text-5xl  text-white md:text-5xl pb-6 font-bold tracking-wide px-10">
          Testimonials
        </h1>
        <div className="grid lg:grid-cols-3 gap-10 p-5 lg:p-10">
          {testimonial.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 100, opacity: 1 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <TestimonialCard
                key={item.id}
                userName={item.userName}
                position={item.position}
                comment={item.comment}
                imgUrl={item.image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
