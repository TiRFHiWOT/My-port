import React from "react";
import GithubIcon from "../public/github-icon.svg";
import LinkedinIcon from "../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";

const Email = () => {
  return (
    <section
      id="Contact"
      className="grid md:grid-cols-2 mx-6 mb-12 py-12 lg:px-24 gap-4 relative"
    >
      <div className="p-4">
        <h1 className="text-xl font-bold my-2 z-10">{`Let's Connect`}</h1>
        <p className="mb-4 max-w-md text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nisi
          numquam incidunt perferendis iste cum explicabo illo eveniet rem
          corporis, minima dolore dolorum, ratione ea!
        </p>
        <div className="flex flex-row gap-2">
          <Link href="github.com">
            <Image src={GithubIcon} alt="Github" />
          </Link>
          <Link href="linkedin.com">
            <Image src={LinkedinIcon} alt="Linkedin" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            required
            className=" bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-sm rounded-lg block w-full p-2.5 "
            placeholder="abebebesobela@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block mb-2 text-sm font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            required
            className=" bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-sm rounded-lg block w-full p-2.5 "
            placeholder="What's in your mind."
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-2 text-sm font-medium">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            required
            className=" bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-sm rounded-lg block w-full p-2.5 "
            placeholder={`Let's talk...`}
          />
        </div>
        <button
          type="submit"
          className=" bg-blue-500 hover:bg-blue-600 font-medium rounded-lg block w-full p-2.5"
        >
          Send Message
        </button>
      </div>
    </section>
  );
};

export default Email;
