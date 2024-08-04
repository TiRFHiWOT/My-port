import TestimonialClient from "@/components/Testimonials/Main/Client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials page",
  description: "Testimonials of portifolio",
};

const Testimonials = () => {
  return (
    <section>
      <div className="bg-slate-900 rounded-xl mx-8 lg:mx-24 lg:p-5 lg:my-24 bg-opacity-50">
        <p className="text-lg md:text-xl pt-6 pb-2 tracking-wider text-gray-500 px-10">{`WHAT OTHER'S SAY`}</p>
        <h1 className="text-3xl lg:text-5xl  text-white md:text-5xl pb-6 font-bold tracking-wide px-10">
          Testimonials
        </h1>
        <TestimonialClient />
      </div>
    </section>
  );
};

export default Testimonials;
