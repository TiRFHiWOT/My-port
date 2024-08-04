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

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return (
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
  );
};

export default ClientWorkExperience;
