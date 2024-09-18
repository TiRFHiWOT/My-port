import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, selectContacts } from "@/store/slice/contactAdminSlice";
import { AppDispatch } from "@/store/store";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import ButtonOne from "./ButtonOne";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SocialMediaButton from "./SocialMedia";
import { FaLinkedin, FaGithub, FaTelegram } from "react-icons/fa";

const Text = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contact = contacts[0] || {};

  const [hoveredOnce, setHoveredOnce] = useState(false);

  const socialMediaLinks = [
    {
      href: contact.telegram,
      icon: <FaTelegram />,
      label: "Telegram",
    },
    {
      href: contact.linkedin,
      icon: <FaLinkedin />,
      label: "LinkedIn",
    },
    {
      href: contact.github,
      icon: <FaGithub />,
      label: "GitHub",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0 }}
    >
      <div
        className="relative mt-5 lg:mt-0 lg:text-start mx-5 text-center px-6 lg:ml-12 border-2 border-blue-900
      rounded-3xl glass"
      >
        <Heading />

        <Paragraph />
        <div className="flex flex-col md:flex-row justify-between items-center py-5">
          <ButtonOne />
          <motion.div
            ref={ref}
            initial={{ y: "200px", opacity: 0 }}
            animate={inView ? { y: "0", opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mt-4 lg:mt-0 ml-5"
          >
            {socialMediaLinks
              .filter((link) => link.href)
              .map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ y: "200px", opacity: 0 }}
                  animate={inView ? { y: "0", opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                  className="mx-2"
                >
                  <SocialMediaButton
                    href={link.href}
                    icon={link.icon}
                    label={link.label}
                  />
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Text;
