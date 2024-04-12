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
  const [showVerification, setShowVerification] = useState(false);

  const experienceCollectionRef = collection(db, "experience");

  const addExperienceToFirestore = async () => {
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
  };

  const resetInputFields = () => {
    setNewName("");
    setNewPlace("");
    setNewPointOne("");
    setNewPointTwo("");
    setNewPointThree("");
    setNewYear("");
  };

  const onSubmit = () => {
    if (
      !(
        newName.trim() &&
        newPlace.trim() &&
        newPointOne.trim() &&
        newPointTwo.trim() &&
        newPointThree.trim() &&
        newYear.trim()
      )
    ) {
      window.alert("Please fill all required fields");
      return;
    }
    setShowVerification(true);
  };

  const handleVerificationConfirm = () => {
    addExperienceToFirestore();
    setShowVerification(false);
    resetInputFields();
  };

  return (
    <section>
      <div className=" rounded-sm">
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
        {showVerification && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-[#112035] p-8 rounded-lg">
              <p className="">Are you sure you want to add this item?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowVerification(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerificationConfirm}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
