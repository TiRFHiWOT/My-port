"use client";
import TabButton from "./TabButton";
import { useTransition, useState, useEffect } from "react";
import SkillsCard from "@/components/SkillsCard";
import { motion, MotionConfig } from "framer-motion";
import { db } from "@/app/firebase";
import { getDocs, collection } from "firebase/firestore";

const About = () => {
  const skillCollectionRef = collection(db, "skill");
  const educationCollectionRef = collection(db, "education");
  const certificationCollectionRef = collection(db, "certification");

  const [skill, setSkill] = useState([]);
  const [education, setEducation] = useState([]);
  const [certification, setCertification] = useState([]);

  useEffect(() => {
    const getSkill = async () => {
      const data = await getDocs(skillCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSkill(filteredData);
    };
    getSkill();
  }, []);

  useEffect(() => {
    const getEducation = async () => {
      const data = await getDocs(educationCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEducation(filteredData);
    };
    getEducation();
  }, []);

  useEffect(() => {
    const getCertification = async () => {
      const data = await getDocs(certificationCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCertification(filteredData);
    };
    getCertification();
  }, []);

  const TAB_DATA = [
    {
      title: "Skills",
      id: "skills",
      content: (
        <div className="grid grid-cols-2 gap-5 text-gray-300">
          {skill.map((item) => (
            <SkillsCard
              key={item.id}
              skillName={item.skill}
              imgUrl={item.image}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Education",
      id: "education",
      content: (
        <ul className="grid grid-cols-1 gap-2 text-gray-300">
          {education.map((item) => (
            <li
              key={item.id}
              className="shadow-lg hover:shadow-xl py-2 mr-1 px-3 border border-[#334155] rounded-full"
            >
              {item.education}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Certifications",
      id: "certifications",
      content: (
        <ul className="grid grid-cols-1 gap-2 text-gray-300">
          {certification.map((item) => (
            <li
              key={item.id}
              className="shadow-lg hover:shadow-xl py-2 mr-1 px-3 border border-[#334155] rounded-full"
            >
              {item.certification}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section id="About">
      <MotionConfig transition={{ duration: 0.5, delay: 0, type: "spring" }}>
        <div className="glass py-12 px-10 lg:px-12 my-16 rounded-e-2xl md:px-8 relative container border-y border-r border-[#334155] overflow-hidden">
          <div className="flex flex-col md:mx-12 lg:mx-0 lg:flex-row items-center">
            <div className="flex flex-row my-10 lg:mx-10">
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col justify-between items-center border-r-4 border-orange-600 px-2"
              >
                <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
                  A
                </h1>
                <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
                  B
                </h1>
                <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
                  O
                </h1>
                <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
                  U
                </h1>
                <h1 className="text-4xl font-semibold text-white tracking-widest flex flex-row">
                  T
                </h1>
                <h1 className="text-4xl font-semibold text-orange-500 tracking-widest flex flex-row">
                  M
                </h1>
                <h1 className="text-4xl font-semibold text-orange-500 tracking-widest flex flex-row">
                  E
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mx-4"
              >
                <p className="text-xs md:text-sm text-white mb-5 leading-5 lg:leading-6">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa
                  tempora id inventore impedit illum dicta quis nisi incidunt
                  dolore quam, labore similique praesentium quidem libero
                  eligendi in nemo. Nostrum, accusamus fugiat minus quod, vitae
                  iure quisquam illum corporis esse temporibus nihil sequi neque
                  aut tenetur at. Necessitatibus quas quaerat atque.
                </p>
                <p className="text-xs md:text-sm text-white mb-5 leading-5 lg:leading-6">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa
                  tempora id inventore impedit illum dicta quis nisi incidunt
                  dolore quam, labore similique praesentium quidem libero
                  eligendi in nemo. Nostrum, accusamus fugiat minus quod, vitae
                  iure quisquam illum corporis esse temporibus nihil sequi neque
                  aut tenetur at.
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col p-2 bg-slate-700 shadow-xl rounded-lg relative h-[350px]"
            >
              <div className="flex flex-row justify-center bg-slate-800 pt-3 rounded-md">
                <TabButton
                  selectTab={() => handleTabChange("skills")}
                  active={tab === "skills"}
                >
                  {" "}
                  SKILLS{" "}
                </TabButton>
                <TabButton
                  selectTab={() => handleTabChange("education")}
                  active={tab === "education"}
                >
                  {" "}
                  EDUCATION{" "}
                </TabButton>
                <TabButton
                  selectTab={() => handleTabChange("certifications")}
                  active={tab === "certifications"}
                >
                  {" "}
                  CERTIFICATION{" "}
                </TabButton>
              </div>
              <div className="skills-bar mt-2 py-1 rounded-md bg-slate-800 h-[18rem] overflow-y-auto overflow-x-hidden ps-1">
                {TAB_DATA.find((t) => t.id === tab).content}
              </div>
            </motion.div>
          </div>
          <div className="h-[100px] w-[100px] rounded-full bg-slate-700 absolute shadow-lg top-[-3rem] right-[-2rem] -z-10 opacity-50"></div>
          <div className="h-[50px] w-[50px] rounded-full bg-slate-700 absolute shadow-lg top-[2rem] right-[33rem] -z-10 opacity-50"></div>
        </div>
      </MotionConfig>
    </section>
  );
};

export default About;
