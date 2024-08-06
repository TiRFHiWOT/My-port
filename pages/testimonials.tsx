import Test from "@/components/Testimonials/Main/Test";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials page",
  description: "Testimonials of portifolio",
};

const Testimonials = () => {
  return (
    <section>
      <Test />
    </section>
  );
};

export default Testimonials;
