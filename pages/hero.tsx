import transparent from "@/public/circuit_board.png";
import HomeArt from "@/components/Hero/HomeArt";
import Image from "next/image";
import code from "@/public/code.png";
import Text from "@/components/Hero/Text";
import Achievement from "@/components/Achievement/achievement";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hero page",
  description: "This is the hero page",
};

const Hero = () => {
  return (
    <section className=" relative min-h-[100vh] max-w-[100vw]">
      <div
        className="relative grid lg:grid-cols-2 pt-[70px] lg:pt-0 mb-3 py-4 lg:p-10 justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${transparent.src})`,
          backgroundPositionY: "-115px",
        }}
      >
        <div className="hidden absolute top-[50%] -translate-y-[50%] right-0 opacity-10">
          <Image
            src={code}
            alt=""
            width={700}
            height={700}
            className=""
          ></Image>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        <div className="flex justify-center items-center z-30">
          <Text />
        </div>
        <div className="relative z-10">
          <HomeArt />
        </div>
      </div>
      <Achievement />
    </section>
  );
};

export default Hero;
