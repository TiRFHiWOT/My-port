import Hero from "@/pages/hero";
import Navbar from "@/components/Header/Navbar";
import About from "@/pages/about";
import Projects from "@/pages/projects";
import Contact from "@/pages/contact";
import Footer from "@/components/Footer/Footer";
import Work from "@/pages/work";
import Testimonials from "@/pages/testimonials";

const Page = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

export default Page;
