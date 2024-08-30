import React from "react";
import GithubIcon from "@/public/github-icon.svg";
import LinkedinIcon from "@/public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "../components/Contact/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me through my portfolio.",
};

const Contact = () => {
  return (
    <section
      id="Contact"
      className="grid md:grid-cols-2 mx-6 mb-12 py-16 lg:px-24 gap-4 relative justify-center overflow-hidden"
    >
      <div className="flex justify-center">
        <div className="p-4 border border-gray-700 shadow-lg rounded-3xl">
          <h1 className="text-2xl font-bold my-2 z-10 py-3 -rotate-3">
            Let'<span className="text-orange-600">s</span> Connect.
          </h1>
          <p className="mb-4 max-w-md text-slate-400">
            {` I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision. Whether you have a question
            or just want to say hi, feel free to reach out. Let's build
            something amazing together!`}
          </p>
          <div className="flex flex-row gap-2 ">
            <Link href="https://github.com">
              <Image
                className="hover:scale-105"
                src={GithubIcon}
                alt="Github"
              />
            </Link>
            <Link href="https://linkedin.com">
              <Image
                className="hover:scale-105"
                src={LinkedinIcon}
                alt="Linkedin"
              />
            </Link>
          </div>

          <div className="mt-6 text-slate-400 space-y-4">
            <div className="flex items-center gap-3 transition duration-300 hover:bg-slate-700 hover:rounded-lg p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500 transition-transform duration-300 hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12h4m-2-2v4m4 4H4m6-4v4m4-4H4m2-4H4m16 0H4"
                />
              </svg>
              <p className="transition duration-300 hover:text-blue-500">
                Email:{" "}
                <a
                  href="mailto:youremail@example.com"
                  className="text-blue-500 hover:underline hover:text-blue-400"
                >
                  youremail@example.com
                </a>
              </p>
            </div>
            <div className="flex items-center gap-3 transition duration-300 hover:bg-slate-700 hover:rounded-lg p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 transition-transform duration-300 hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h12M9 3v18"
                />
              </svg>
              <p className="transition duration-300 hover:text-blue-500">
                Phone:{" "}
                <a
                  href="tel:+1234567890"
                  className="text-blue-500 hover:underline hover:text-blue-400"
                >
                  +1 (234) 567-890
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ContactForm />
    </section>
  );
};

export default Contact;
