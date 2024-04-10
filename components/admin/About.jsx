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
import { db, storage } from "@/app/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const About = () => {
  const controls = [
    {
      name: "skill",
      placeholder: "Enter Skill",
      type: "text",
      label: "SKILL",
      onChange: (e) => setNewSkill(e.target.value),
    },
    {
      name: "imgUrl",
      placeholder: "Enter Image",
      type: "file",
      label: "USER IMAGE",
      onChange: (e) => setFile(e.target.files[0]),
    },
  ];

  const education = [
    {
      name: "education",
      placeholder: "Enter Education",
      type: "text",
      label: "EDUCATION",
      onChange: (e) => setNewEducation(e.target.value),
    },
  ];
  const certification = [
    {
      name: "certification",
      placeholder: "Enter Certification",
      type: "text",
      label: "CERTIFICATION",
      onChange: (e) => setNewCertification(e.target.value),
    },
  ];

  const [newSkill, setNewSkill] = useState("");
  const [newEducation, setNewEducation] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [file, setFile] = useState("");
  const [per, setper] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, "skill/", file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setper(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFile((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const skillCollectionRef = collection(db, "skill");
  const educationCollectionRef = collection(db, "education");
  const certificationCollectionRef = collection(db, "certification");

  const onSubmitSki = async () => {
    let imageUrl = "";
    if (file) {
      const storageRef = ref(storage, "skills/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask;

      imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
    }
    await addDoc(skillCollectionRef, {
      skill: newSkill,
      image: imageUrl,
    });

    const deleteSkill = async (id) => {
      const skillDoc = doc(db, "skill", id);
      await deleteDoc(skillDoc);
    };

    setNewSkill("");
    setFile("");
  };

  const onSubmitEdu = async () => {
    await addDoc(educationCollectionRef, {
      education: newEducation,
    });
    setNewEducation("");
  };

  const onSubmitCer = async () => {
    await addDoc(certificationCollectionRef, {
      certification: newCertification,
    });
    setNewCertification("");
  };

  return (
    <section>
      <div className="w-full rounded-sm flex flex-col space-y-2">
        <div className=" bg-[#222a35] p-6 w-full rounded-lg">
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
            onClick={onSubmitSki}
            className="bg-orange-600 hover:bg-orange-700 border-2 border-slate-600 font-medium rounded-md block px-4 py-2 mt-4 disabled:bg-blue-200 disabled:cursor-not-allowed"
            disabled={per !== null && per < 100}
          >
            Add Info
          </button>
        </div>
        <div className="flex flex-row space-x-2 w-full">
          <div className=" bg-[#222a35] p-6 w-full rounded-lg">
            {education.map((item) => (
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
              onClick={onSubmitEdu}
              className="bg-orange-600 hover:bg-orange-700 border-2 border-slate-600 font-medium rounded-md block px-4 py-2 mt-4"
            >
              Add Info
            </button>
          </div>
          <div className=" bg-[#222a35] p-6 w-full rounded-lg">
            {certification.map((item) => (
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
              onClick={onSubmitCer}
              className="bg-orange-600 hover:bg-orange-700 border-2 border-slate-600 font-medium rounded-md block px-4 py-2 mt-4"
            >
              Add Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
