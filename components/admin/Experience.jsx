"use client";
import { useEffect, useState } from "react";
import FormCard from "@/components/admin/FormCard";
import {
  getDocs,
  addDoc,
  deleteDoc,
  collection,
  doc,
} from "firebase/firestore";
import { db } from "@/app/firebase";

const Testimonial = () => {
  const controls = [
    {
      name: "name",
      placeholder: "Enter Programming Language",
      type: "text",
      label: "PROGRAMMING LANGUAGE",
      onChange: (e) => setNewName(e.target.value),
    },
    {
      name: "place",
      placeholder: "Enter Place Of Occupation",
      type: "text",
      label: "PLACE OF OCCUPATION",
      onChange: (e) => setNewPlace(e.target.value),
    },
    {
      name: "PointOne",
      placeholder: "Enter First Description",
      type: "text",
      label: "FIRST DESCRIPTION",
      onChange: (e) => setNewPointOne(e.target.value),
    },
    {
      name: "PointTwo",
      placeholder: "Enter Second Description",
      type: "text",
      label: "SECOND DESCRIPTION",
      onChange: (e) => setNewPointTwo(e.target.value),
    },
    {
      name: "pointOne",
      placeholder: "Enter Third Description",
      type: "text",
      label: "THIRD DESCRIPTION",
      onChange: (e) => setNewPointThree(e.target.value),
    },
    {
      name: "year",
      placeholder: "Enter Year",
      type: "text",
      label: "YEAR",
      onChange: (e) => setNewYear(e.target.value),
    },
  ];

  const [newName, setNewName] = useState("");
  const [newPlace, setNewPlace] = useState("");
  const [newPointOne, setNewPointOne] = useState("");
  const [newPointTwo, setNewPointTwo] = useState("");
  const [newPointThree, setNewPointThree] = useState("");
  const [newYear, setNewYear] = useState("");

  const experienceCollectionRef = collection(db, "experience");

  const onSubmit = async () => {
    await addDoc(experienceCollectionRef, {
      name: newName,
      place: newPlace,
      pointOne: newPointOne,
      pointTwo: newPointTwo,
      pointThree: newPointThree,
      year: newYear,
    });

    const deleteExperience = async (id) => {
      const experienceDoc = doc(db, "experience", id);
      await deleteDoc(experienceDoc);
    };

    setNewName("");
    setNewPlace("");
    setNewPointOne("");
    setNewPointTwo("");
    setNewPointThree("");
    setNewYear("");
  };

  return (
    <section>
      <div className="w-full rounded-sm">
        <div className=" bg-[#222a35] p-6 rounded-lg">
          {controls.map((item) => (
            <FormCard
              key={item.id}
              label={item.label}
              name={item.name}
              placeholder={item.placeholder}
              type={item.type}
              onChange={item.onChange}
            />
          ))}
          <button
            onClick={onSubmit}
            className="bg-orange-600 hover:bg-orange-700 border-2 border-slate-600 font-medium rounded-md block px-4 py-2 mt-4"
          >
            Add Info
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
