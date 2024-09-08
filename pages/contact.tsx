import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  selectContacts,
  selectLoading,
  selectError,
} from "@/store/slice/contactAdminSlice";
import { AppDispatch } from "@/store/store";
import GithubIcon from "@/public/github-icon.svg";
import LinkedinIcon from "@/public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ContactForm from "@/components/Contact/Main/ContactForm";
import { RotatingLines } from "react-loader-spinner";
import savePageVisit from "@/utiles/pageTracker";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me through my portfolio.",
};

const Contact = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    savePageVisit("contact");
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-16 flex-col">
        <RotatingLines width="50" />
      </div>
    );
  if (error) return <p className="text-red-500">Failed to load contacts.</p>;

  const contact = contacts[0] || {};

  return (
    <section
      id="Contact"
      className="mx-6 mb-12 py-16 lg:px-24 gap-4 relative justify-center overflow-hidden"
    >
      <div className="flex justify-center items-center"></div>
      <div className="grid md:grid-cols-2 gap-4 justify-center">
        <div className="flex justify-center">
          <div className="p-4 border border-gray-700 shadow-lg rounded-3xl">
            <h1 className="text-3xl font-bold my-2 z-10 py-3 -rotate-3">
              Let'<span className="text-orange-600">s</span> Connect.
            </h1>

            <p className="mb-4 max-w-md text-slate-400">
              {contact.description}
            </p>
            <div className="flex flex-row gap-2 ">
              {contact.github && (
                <Link href={contact.github}>
                  <Image
                    className="hover:scale-105"
                    src={GithubIcon}
                    alt="Github"
                  />
                </Link>
              )}
              {contact.linkedin && (
                <Link href={contact.linkedin}>
                  <Image
                    className="hover:scale-105"
                    src={LinkedinIcon}
                    alt="Linkedin"
                  />
                </Link>
              )}
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
                  <Link
                    href={`mailto:${contact.email}`}
                    className="text-blue-500 hover:underline hover:text-blue-400"
                  >
                    {contact.email}
                  </Link>
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
                  <Link
                    href={`tel:${contact.phone}`}
                    className="text-blue-500 hover:underline hover:text-blue-400"
                  >
                    {contact.phone}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
