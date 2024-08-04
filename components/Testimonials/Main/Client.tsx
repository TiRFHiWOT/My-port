"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonialsAsync } from "@/store/slice/testimonialSlice";
import { RootState } from "@/store/store";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { RotatingLines } from "react-loader-spinner";

const TestimonialCard = dynamic(() => import("./TestimonialCard"));

const TestimonialClient = () => {
  const dispatch = useDispatch();
  const { testimonials, loading, error } = useSelector(
    (state: RootState) => state.testimonials
  );

  useEffect(() => {
    dispatch(fetchTestimonialsAsync() as any);
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <RotatingLines width="50" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid lg:grid-cols-3 gap-10 p-5 lg:p-10">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ y: 100, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <TestimonialCard
            userName={testimonial.userName}
            position={testimonial.position}
            comment={testimonial.comment}
            imgUrl={testimonial.profilePicture}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default TestimonialClient;
