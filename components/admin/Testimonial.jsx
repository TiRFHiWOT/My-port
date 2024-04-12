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

const Testimonial = () => {
  const controls = [
    {
      name: "userName",
      placeholder: "Enter User Name",
      type: "text",
      label: "USER NAME",
      onChange: (e) => setNewUserName(e.target.value),
    },
    {
      name: "position",
      placeholder: "Enter Position",
      type: "text",
      label: "POSTION",
      onChange: (e) => setNewPosition(e.target.value),
    },
    {
      name: "comment",
      placeholder: "Enter Comment",
      type: "text",
      label: "COMMENT",
      onChange: (e) => setNewComment(e.target.value),
    },
    {
      name: "imgUrl",
      placeholder: "Enter Image",
      type: "file",
      label: "USER IMAGE",
      onChange: (e) => setFile(e.target.files[0]),
    },
  ];

  const [newUserName, setNewUserName] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newComment, setNewComment] = useState("");
  const [file, setFile] = useState(null);
  const [per, setper] = useState(null);
  const [showVerification, setShowVerification] = useState(false);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, "testimonial/", file.name);

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

  const testmonialCollectionRef = collection(db, "testimonial");

  const addTestimonialToFirestore = async () => {
    let imageUrl = "";
    if (file) {
      const storageRef = ref(storage, "testimonial/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask;

      imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
    }
    await addDoc(testmonialCollectionRef, {
      userName: newUserName,
      position: newPosition,
      comment: newComment,
      image: imageUrl,
    });
  };

  const resetInputFields = () => {
    setNewUserName("");
    setNewPosition("");
    setNewComment("");
    setFile("");
  };

  const onSubmit = () => {
    if (
      !(newUserName.trim() && newPosition.trim() && newComment.trim() && file)
    ) {
      window.alert("Please fill all required fields");
      return;
    }
    setShowVerification(true);
  };

  const handleVerificationConfirm = () => {
    addTestimonialToFirestore();
    setShowVerification(false);
    resetInputFields();
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
            className="bg-orange-600 hover:bg-orange-700 border-2 border-slate-600 font-medium rounded-md block px-4 py-2 mt-4 disabled:bg-blue-200 disabled:cursor-not-allowed"
            disabled={per !== null && per < 100}
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
