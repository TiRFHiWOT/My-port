import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Email from "@/components/Email";
import Footer from "@/components/Footer";
import Achievement from "@/components/Achievement";

const page = () => {
  return (
    <main className="flex flex-col min-h-screen transform transition-all duration-300 overflow-hidden">
      <Navbar />
      <Hero />
      <Achievement />
      <About />
      <Projects />
      <Email />
      <Footer />
    </main>
  );
};

export default page;
