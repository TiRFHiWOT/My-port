import React from "react";
import Image from "next/image";
import one from "../public/one.png";
import two from "../public/two.png";
import three from "../public/three.png";
import four from "../public/four.png";
import five from "../public/five.png";

const Slides = (img1, img2, img3, img4, img5) => {
  return (
    <section className="">
      <ul className=" relative group -z-10">
        <li className="absolute top-0 left-0 group-hover:opacity-0 transform transition-all duration-[1s] delay-[1s] z-40">
          <Image src={one} alt="hero image" />
        </li>
        <li className="absolute top-0 left-0 group-hover:opacity-0 transform transition-all duration-[1s] delay-[3s] z-30">
          <Image src={two} alt="hero image" />
        </li>
        <li className="absolute top-0 left-0 group-hover:opacity-0 transform transition-all duration-[1s] delay-[5s] z-20">
          <Image src={three} alt="hero image" />
        </li>
        <li className="absolute top-0 left-0 group-hover:opacity-0 transform transition-all duration-[1s] delay-[7s] z-10">
          <Image src={four} alt="hero image" />
        </li>
        <li className="absolute top-0 left-0 z-0">
          <Image src={five} alt="hero image" />
        </li>
      </ul>
    </section>
  );
};

export default Slides;
