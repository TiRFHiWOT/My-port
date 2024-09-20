"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonialsAsync } from "@/store/slice/testimonialSlice";
import TestimonialCard from "./TestimonialCard";
import { RotatingLines } from "react-loader-spinner";
import Image from "next/image";

const Test = () => {
  const dispatch = useDispatch();
  const { testimonials, loading, error } = useSelector(
    (state: any) => state.testimonials
  );

  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchTestimonialsAsync() as any);
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const limitedTestimonials = testimonials.slice(0, 4);

  return (
    <section>
      <div className="flex flex-col justify-center items-center relative">
        <div className="text-center mb-5">
          <h1 className="text-2xl text-slate-500">What the people say</h1>
          <h1 className="text-4xl text-white font-extrabold my-3">
            Testimonials
          </h1>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <RotatingLines width="50" />
          </div>
        ) : limitedTestimonials.length === 0 ? (
          <div className="text-center py-4">No testimonials available.</div>
        ) : isLargeScreen ? (
          <motion.div
            initial={{ borderRadius: "100%" }}
            whileInView={{
              borderRadius: "1rem",
            }}
            transition={{
              delay: 2.9,
            }}
            viewport={{ once: true }}
            style={{
              background: `url(${"/blue.jpg"})`,
              backgroundSize: "cover",
              backgroundPositionX: "-40px",
              backgroundPositionY: "-11px",
            }}
          >
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 p-3 border border-gray-900 rounded-xl relative"
              initial={{ rotate: "180deg", scale: 0, gap: 0, opacity: 0 }}
              whileInView={{
                rotate: ["180deg", "180deg", "180deg", "0"],
                scale: 1,
                gap: "0.5rem",
                opacity: 1,
              }}
              transition={{
                duration: 3,
              }}
              viewport={{ once: true }}
            >
              {limitedTestimonials.map((testimonial: any, id: number) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={id}
                />
              ))}
              <div
                className="hidden lg:flex absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[5rem] h-[5rem] rounded-full bg-gray-700 justify-center items-center opacity-50"
                style={{ boxShadow: "0px 0px 50px -10px black" }}
              >
                <div className="w-[4rem] h-[4rem] rounded-full bg-gray-600 flex justify-center items-center">
                  <div className="w-[3rem] h-[3rem] rounded-full bg-gray-500 flex justify-center items-center">
                    <div className="w-[2rem] h-[2rem] rounded-full bg-gray-400 flex justify-center items-center">
                      <div className="w-[1rem] h-[1rem] rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div
            className="grid grid-cols-1 lg:grid-cols-2 p-3 gap-y-2 border border-gray-900 rounded-xl"
            style={{
              background: `url(${"/blue.jpg"})`,
              backgroundSize: "cover",
              backgroundPositionX: "-40px",
              backgroundPositionY: "-11px",
            }}
          >
            {testimonials.map((testimonial: any, id: number) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Test;
