import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Email from "@/components/Email";
import Footer from "@/components/Footer";
import Achievement from "@/components/Achievement";
import Work from "@/components/Work";
import Testimonial from "@/components/Testimonial";

const page = () => {
  return (
    <main>
      <Navbar />
      <Projects />
    </main>
  );
};

export default page;
