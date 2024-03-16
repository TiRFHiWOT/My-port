"use client";
import Link from "next/link";
import Image from "next/image";
import code from "../public/code_occupation.png";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section>
      <div className="grid grid-cols-1 mt-20 mb-3 mx-3 p-6 items-center">
        <div className="place-self-center my-5 lg:my-0">
          <div
            className="rounded-full p-6 bg-[#121212] bg-opacity-50"
            style={{ boxShadow: "0 0 3px 8px #334155" }}
          >
            <Image src={code} alt="hero image" width={300} height={300} />
          </div>
        </div>

        <div className="placle-self-center text-center">
          <h1 className="text-white text-4xl lg:text-6xl font-extrabold my-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-amber-500">
              Hello, I am <br />
            </span>
            <TypeAnimation
              sequence={[
                "John",
                1000,
                "Web Developer",
                1000,
                "Mobile Developer",
                1000,
                "UI/UX Designer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ display: "inline-block" }}
              repeat={Infinity}
            />
          </h1>
          <p className="text-gray-400 text-base lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            Nam, consequuntur.
          </p>
          <div className="flex flex-col justify-center sm:flex-row md:flex-row lg:flex-row py-5 ">
            <button className="py-3 px-6 rounded-full w-full text-white sm:w-fit bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700 mb-2 sm:mx-1 md:mx-2 lg:mx-3">
              Get In Touch
            </button>
            <button className="py-1 px-1 rounded-full w-full text-white sm:w-fit bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700 mb-2 sm:mx-1 md:mx-2 lg:mx-3">
              <span className="block bg-slate-800 hover:bg-slate-900 rounded-full px-5 py-2">
                Download CV
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
