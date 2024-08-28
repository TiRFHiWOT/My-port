import React from "react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  testimonial: {
    id: string;
    comment: string;
    userName: string;
    position: string;
    profilePicture: string[];
  };
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
}) => {
  const profilePictureUrl = testimonial.profilePicture;

  return (
    <motion.div
      key={testimonial.id}
      initial={{ width: "15rem", height: "15rem", x: 0, y: 0 }}
      whileInView={{
        width: "27rem",
        height: "16.5rem",
        transition: { duration: 2, delay: 3 },
      }}
      whileHover={{
        x: index % 2 === 0 ? "-20px" : "20px",
        y: index < 2 ? "-20px" : "20px",
        transition: { duration: 2 },
      }}
      viewport={{ once: true }}
      className="rounded-lg bg-[#151b24] shadow-2xl bg-opacity-50 relative backdrop-blur border-2 border-black
                   hover:border-white hover:border-2 hover:rotate-6 inline-block cursor-pointer group"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          delay: 4,
        }}
        viewport={{ once: true }}
        className="p-3 flex flex-col"
      >
        <div className=" absolute top-5 left-5 text-9xl group-hover:rotate-12 transition duration-700">
          ``
        </div>
        <div className=" absolute top-5 right-9 w-8 h-8 rounded-full bg-black group-hover:bg-green-600 group-hover:shadow-xl transition duration-700"></div>
        <p className="mt-14 mb-3 text-sm text-gray-400 font-semibold tracking-widest mx-6 pt-5 pb-2 line-clamp-2 h-20">
          {testimonial.comment}
        </p>
        <div className="flex justify-between items-center px-6 py-2 border border-gray-700 rounded-lg">
          <div className="flex-col justify-between items-center">
            <h1 className="text-white tracking-wider text-lg font-bold">
              @{testimonial.userName}
            </h1>
            <p className="text-gray-400">{testimonial.position}</p>
          </div>
          {profilePictureUrl && (
            <div
              className="rounded-full w-14 h-14"
              style={{
                backgroundImage: `url(${profilePictureUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;
