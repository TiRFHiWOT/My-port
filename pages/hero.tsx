import transparent from "@/public/circuit_board.png";
import HArt from "@/components/Hero/HArt";
import Text from "@/components/Hero/Text";
import Achievement from "@/components/Achievement/achievement";
import type { Metadata } from "next";
import { useEffect } from "react";
import savePageVisit from "@/utiles/pageTracker";

export const metadata: Metadata = {
  title: "Hero page",
  description: "This is the hero page",
};

const Hero = () => {
  useEffect(() => {
    savePageVisit("hero");
  }, []);

  return (
    <section className=" relative h-[100vh] max-w-[100vw] overflow-hidden">
      <div
        className="relative grid lg:grid-cols-2 pt-[70px] lg:pt-0 mb-3 py-4 lg:p-10 justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${transparent.src})`,
          backgroundPositionY: "-115px",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        <div className="flex justify-center items-center z-30">
          <Text />
        </div>
        <div>
          <HArt />
        </div>
      </div>
      <div className="absolute -top-2 -left-7 shining-circle"></div>
    </section>
  );
};

export default Hero;
