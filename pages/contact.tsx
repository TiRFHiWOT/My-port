import React, { Suspense, lazy } from "react";
import GithubIcon from "@/public/github-icon.svg";
import LinkedinIcon from "@/public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import EmailField from "../components/Contact/Email";
import SubjectField from "../components/Contact/Subject";
import MessageField from "../components/Contact/Message";
import SubmitButton from "../components/Contact/Submit";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact of this portifolio",
};

const Contact = () => {
  return (
    <section
      id="Contact"
      className="grid md:grid-cols-2 mx-6 mb-12 py-16 lg:px-24 gap-4 relative overflow-hidden"
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold my-2 z-10 py-3 -rotate-3">{`Let's Connect.`}</h1>
        <p className="mb-4 max-w-md text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nisi
          numquam incidunt perferendis iste cum explicabo illo eveniet rem
          corporis, minima dolore dolorum, ratione ea!
        </p>
        <div className="flex flex-row gap-2">
          <Link href="https://github.com">
            <Image src={GithubIcon} alt="Github" />
          </Link>
          <Link href="https://linkedin.com">
            <Image src={LinkedinIcon} alt="Linkedin" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div>
          <EmailField />
        </div>
        <div>
          <SubjectField />
        </div>
        <div>
          <MessageField />
        </div>
        <div>
          <SubmitButton />
        </div>
      </div>
    </section>
  );
};

export default Contact;
