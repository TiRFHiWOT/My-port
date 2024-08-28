"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExperience } from "@/store/slice/workSlice";
import WorkCard from "./WorkCard";
import { RotatingLines } from "react-loader-spinner";

const ClientWorkExperience = () => {
  const dispatch = useDispatch();
  const experience = useSelector((state) => state.workExperience.experience);
  const status = useSelector((state) => state.workExperience.status);
  const error = useSelector((state) => state.workExperience.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchExperience() as any);
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center">
        <RotatingLines width="50" />
      </div>
    );
  }

  if (experience.length === 0) {
    return <div className="text-center py-4">No experience available.</div>;
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return (
    <div className="work-slide flex w-fit">
      {experience.map((item) => (
        <WorkCard
          key={item.id}
          position={item.position}
          pointOne={item.pointOne}
          pointTwo={item.pointTwo}
          pointThree={item.pointThree}
          place={item.place}
          year={item.year}
          skillsUsed={item.skillsUsed}
        />
      ))}
      {experience.map((item) => (
        <WorkCard
          key={item.id}
          position={item.position}
          pointOne={item.pointOne}
          pointTwo={item.pointTwo}
          pointThree={item.pointThree}
          place={item.place}
          year={item.year}
          skillsUsed={item.skillsUsed}
        />
      ))}
    </div>
  );
};

export default ClientWorkExperience;
