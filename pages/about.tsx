import AboutPage from "@/components/About/Main/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About page",
  description: "About page of the portifolio",
};

const About = () => {
  return (
    <section id="About">
      <AboutPage />
    </section>
  );
};

export default About;
