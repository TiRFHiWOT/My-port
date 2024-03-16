import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";

const page = () => {
  return (
    <main className="flex flex-col min-h-screen container mx-auto">
      <Navbar />
      <Hero />
      <About />
      <Projects />
    </main>
  );
};

export default page;
