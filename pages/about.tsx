import AboutPage from "@/components/About/Main/page";
import savePageVisit from "@/utiles/pageTracker";
import type { Metadata } from "next";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "About page",
  description: "About page of the portifolio",
};

const About = () => {
  useEffect(() => {
    savePageVisit("about");
  }, []);
  return (
    <section id="About">
      <AboutPage />
    </section>
  );
};

export default About;
