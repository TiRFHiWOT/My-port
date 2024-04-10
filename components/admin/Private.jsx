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

const Private = () => {
  const privateControls = [
    {
      name: "title",
      placeholder: "Enter Title",
      type: "text",
      label: "TITLE",
      onChange: (e) => setNewPrivateTitle(e.target.value),
    },
    {
      name: "description",
      placeholder: "Enter Description",
      type: "text",
      label: "DESCRIPTION",
      onChange: (e) => setNewPrivateDescription(e.target.value),
    },
    {
      name: "imgUrl",
      placeholder: "Enter Image",
      type: "file",
      label: "USER IMAGE",
      onChange: (e) => {
        const selectedPrivateFiles = Array.from(e.target.files);
        setPrivateFiles(selectedPrivateFiles);
      },
    },
  ];

  const [newPrivateTitle, setNewPrivateTitle] = useState("");
  const [newPrivateDescription, setNewPrivateDescription] = useState("");
  const [privateFiles, setPrivateFiles] = useState([]);
  const [privatePer, setPrivatePer] = useState(null);

  useEffect(() => {
    const uploadPrivate = async () => {
      if (privateFiles.length === 0) return;

      const privateImageUrls = [];

      for (const file of privateFiles) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, "privateProjects/" + name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPrivatePer(progress);
          },
          () => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              privateImageUrls.push(downloadURL);

              if (privateImageUrls.length === privateFiles.length) {
                setPrivateFiles(privateImageUrls);
              }
            });
          }
        );
      }
    };

    uploadPrivate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateFiles]);

  const privateCollectionRef = collection(db, "privateProjects");

  const addPrivateToFirestore = async (privateImageUrls) => {
    if (newPrivateTitle.trim() === "" || newPrivateDescription.trim() === "") {
      console.error("Title or description cannot be empty");
      return;
    }
    await addDoc(privateCollectionRef, {
      title: newPrivateTitle,
      description: newPrivateDescription,
      images: privateFiles,
    });

    setNewPrivateTitle("");
    setNewPrivateDescription("");
    setPrivateFiles([]);
  };

  return (
    <>
      {privateControls.map((item) => (
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
        onClick={addPrivateToFirestore}
        className="bg-orange-600 hover:bg-orange-700 border-2 border-slate-600 font-medium rounded-md block px-4 py-2 mt-4 disabled:bg-blue-200 disabled:cursor-not-allowed"
        disabled={privatePer !== null && privatePer < 100}
      >
        Add Info
      </button>
    </>
  );
};

export default Private;
