import HArt from "@/components/Hero/HArt";
import Text from "@/components/Hero/Text";
import type { Metadata } from "next";
import { useEffect } from "react";
import savePageVisit from "@/utiles/pageTracker";
import Bottom from "@/components/Hero/Bottom";
import Background from "@/components/Hero/Background";

export const metadata: Metadata = {
  title: "Hero page",
  description: "This is the hero page",
};

const Hero = () => {
  useEffect(() => {
    savePageVisit("hero");
  }, []);

  return (
    <section className=" relative h-[100vh] overflow-hidden transition-opacity duration-1000">
      <Background />
      <div className="relative  grid lg:grid-cols-2 pt-[70px] lg:pt-0 mb-3 py-4 lg:p-10 justify-center items-center bg-cover bg-center bg-opacity-50 z-0">
        <Bottom />
        <div className="flex justify-center items-center z-30">
          <Text />
        </div>
        <div>
          <HArt />
        </div>
      </div>
    </section>
  );
};

export default Hero;
