"use client";
import { db } from "@/app/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import WorkCard from "@/components/WorkCard";
import { motion } from "framer-motion";

const workData = [
  {
    id: "1",
    name: "red",
    place: "Place of Occupation",
    pointOne:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    pointTwo:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    pointThree:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    year: "2018-2019",
  },
  {
    id: "2",
    name: "green",
    place: "Place of Occupation",
    pointOne:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    pointTwo:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    pointThree:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    year: "2019-2020",
  },
  {
    id: "3",
    name: "blue",
    place: "Place of Occupation",
    pointOne:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    pointTwo:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    pointThree:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    year: "2020-2021",
  },
  {
    id: "4",
    name: "yellow",
    place: "Place of Occupation",
    pointOne:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    pointTwo:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    pointThree:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    year: "2021-2022",
  },
  {
    id: "5",
    name: "gray",
    place: "Place of Occupation",
    pointOne:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    pointTwo:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    pointThree:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, soluta sit!",
    year: "2022-2023",
  },
];

const Work = () => {
  const experienceCollectionRef = collection(db, "experience");

  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const getExperience = async () => {
      const data = await getDocs(experienceCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setExperience(filteredData);
    };
    getExperience();
  }, []);

  return (
    <section id="Work">
      <div className="my-10 py-5 lg:py-12 relative">
        <h1 className="text-[30rem] absolute left-10 -bottom-44 text-cyan-600 text-opacity-10 font-extrabold tracking-wider">
          exp
        </h1>
        <motion.p
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-center pt-6 pb-2 tracking-wider text-gray-500"
        >
          WHAT I HAVE DONE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl text-white md:text-5xl text-center pb-6 font-bold tracking-wide"
        >
          Work <span className="text-orange-500">Ex</span>perience
        </motion.h1>
        <div className="big-slide pt-10 pb-5 overflow-hidden relative w-full">
          <div className="work-slide flex w-fit">
            {experience.map((item) => (
              <WorkCard
                key={item.id}
                name={item.name}
                pointOne={item.pointOne}
                pointTwo={item.pointTwo}
                pointThree={item.pointThree}
                place={item.place}
                year={item.year}
              />
            ))}
            {experience.map((item) => (
              <WorkCard
                key={item.id}
                name={item.name}
                pointOne={item.pointOne}
                pointTwo={item.pointTwo}
                pointThree={item.pointThree}
                place={item.place}
                year={item.year}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
