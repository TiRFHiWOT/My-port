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
      label: "IMAGE",
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
  const [file, setFile] = useState(null);
  const [per, setper] = useState(null);
  const [showVerificationSkill, setShowVerificationSkill] = useState(false);
  const [showVerificationEducation, setShowVerificationEducation] =
    useState(false);
  const [showVerificationCertification, setShowVerificationCertification] =
    useState(false);

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

  const addSkillToFirestore = async () => {
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

    setNewSkill("");
    setFile("");
  };

  const addEducationToFirestore = async () => {
    await addDoc(educationCollectionRef, {
      education: newEducation,
    });
    setNewEducation("");
  };

  const addCertificationToFirestore = async () => {
    await addDoc(certificationCollectionRef, {
      certification: newCertification,
    });
    setNewCertification("");
  };

  const resetInputFields = () => {
    setNewSkill("");
    setNewEducation("");
    setNewCertification("");
    setFile([]);
  };

  const onSubmitSkill = () => {
    if (!(newSkill.trim() && file)) {
      window.alert("Please fill all required fields");
      return;
    }
    setShowVerificationSkill(true);
  };

  const onSubmitEducatiion = () => {
    if (!newEducation.trim()) {
      window.alert("Please fill all required fields");
      return;
    }
    setShowVerificationEducation(true);
  };

  const onSubmitCertification = () => {
    if (!newCertification.trim()) {
      window.alert("Please fill all required fields");
      return;
    }
    setShowVerificationCertification(true);
  };

  const handleVerificationConfirmSkill = () => {
    addSkillToFirestore();
    setShowVerificationSkill(false);
    resetInputFields();
  };
  const handleVerificationConfirmEducation = () => {
    addEducationToFirestore();
    setShowVerificationEducation(false);
    resetInputFields();
  };
  const handleVerificationConfirmCertification = () => {
    addCertificationToFirestore();
    setShowVerificationCertification(false);
    resetInputFields();
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
            onClick={onSubmitSkill}
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
              onClick={onSubmitEducatiion}
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
              onClick={onSubmitCertification}
              className="bg-orange-600 hover:bg-orange-700 border-2 border-slate-600 font-medium rounded-md block px-4 py-2 mt-4"
            >
              Add Info
            </button>
          </div>
        </div>
        {showVerificationSkill && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-[#112035] p-8 rounded-lg">
              <p className="">Are you sure you want to add this item?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowVerificationSkill(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerificationConfirmSkill}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {showVerificationEducation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-[#112035] p-8 rounded-lg">
              <p className="">Are you sure you want to add this item?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowVerificationEducation(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerificationConfirmEducation}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {showVerificationCertification && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-[#112035] p-8 rounded-lg">
              <p className="">Are you sure you want to add this item?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowVerificationCertification(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerificationConfirmCertification}
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

export default About;
