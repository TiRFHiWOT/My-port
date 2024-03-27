import React from "react";
import Image from "next/image";
import one from "../public/one.png";
import two from "../public/two.png";
import three from "../public/three.png";
import four from "../public/four.png";
import five from "../public/five.png";

const slides = () => {
  return (
    <section>
      <div>
        <li>
          <Image src={code} alt="hero image" width={250} height={250} />
        </li>
        <li>
          <Image src={code} alt="hero image" width={250} height={250} />
        </li>
        <li>
          <Image src={code} alt="hero image" width={250} height={250} />
        </li>
        <li>
          <Image src={code} alt="hero image" width={250} height={250} />
        </li>
        <li>
          <Image src={code} alt="hero image" width={250} height={250} />
        </li>
      </div>
    </section>
  );
};

export default slides;
