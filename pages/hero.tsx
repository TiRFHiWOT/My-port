import transparent from "@/public/circuit_board.png";
import HArt from "@/components/Hero/HArt";
import Text from "@/components/Hero/Text";
import Achievement from "@/components/Achievement/achievement";
import type { Metadata } from "next";
import { useEffect } from "react";
import savePageVisit from "@/utiles/pageTracker";
import Image from "next/image";
import Bottom from "@/components/Hero/Bottom";

export const metadata: Metadata = {
  title: "Hero page",
  description: "This is the hero page",
};

const Hero = () => {
  useEffect(() => {
    savePageVisit("hero");
  }, []);

  return (
    <section className=" relative h-[100vh] max-w-[100vw] overflow-hidden transition-opacity duration-1000">
      <div className=" absolute inset-0 -z-50">
        <Image alt="" src="/pngegg (2).png" layout="fill" objectFit="cover" />
      </div>
      <div className="relative grid lg:grid-cols-2 pt-[70px] lg:pt-0 mb-3 py-4 lg:p-10 justify-center items-center bg-cover bg-center bg-opacity-50 z-0">
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
