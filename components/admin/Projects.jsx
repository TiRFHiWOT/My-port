import { useEffect, useState } from "react";
import FormCard from "@/components/admin/FormCard";
import Private from "@/components/admin/Private";
import {
  getDocs,
  addDoc,
  deleteDoc,
  collection,
  doc,
} from "firebase/firestore";
import { db, storage } from "@/app/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Projects = () => {
  const controls = [
    {
      name: "title",
      placeholder: "Enter Title",
      type: "text",
      label: "TITLE",
      onChange: (e) => setNewTitle(e.target.value),
    },
    {
      name: "description",
      placeholder: "Enter Description",
      type: "text",
      label: "DESCRIPTION",
      onChange: (e) => setNewDescription(e.target.value),
    },
    {
      name: "previewUrl",
      placeholder: "Enter Preview Url",
      type: "text",
      label: "PREVIEW URL",
      onChange: (e) => setNewPreviewUrl(e.target.value),
    },
    {
      name: "gitUrl",
      placeholder: "Enter Github Url",
      type: "text",
      label: "GITHUB URL",
      onChange: (e) => setNewGitUrl(e.target.value),
    },
    {
      name: "imgUrl",
      placeholder: "Enter Image",
      type: "file",
      label: "USER IMAGE",
      onChange: (e) => {
        const selectedPublicFiles = Array.from(e.target.files);
        setPublicFiles(selectedPublicFiles);
      },
    },
  ];

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPreviewUrl, setNewPreviewUrl] = useState("");
  const [newGitUrl, setNewGitUrl] = useState("");
  const [publicFiles, setPublicFiles] = useState([]);
  const [per, setPer] = useState(null);

  useEffect(() => {
    const uploadPublic = async () => {
      if (publicFiles.length === 0) return;

      const publicImageUrls = [];

      for (const file of publicFiles) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, "publicProjects/" + name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPer(progress);
          },
          () => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              publicImageUrls.push(downloadURL);

              if (publicImageUrls.length === publicFiles.length) {
                setPublicFiles(publicImageUrls);
              }
            });
          }
        );
      }
    };

    uploadPublic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicFiles]);

  const publicCollectionRef = collection(db, "publicProjects");

  const addProjectsToFirestore = async () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      console.error("Title or description cannot be empty");
      return;
    }
    try {
      await addDoc(publicCollectionRef, {
        title: newTitle,
        description: newDescription,
        previewUrl: newPreviewUrl,
        gitUrl: newGitUrl,
        images: publicFiles,
      });

      setNewTitle("");
      setNewDescription("");
      setNewPreviewUrl("");
      setNewGitUrl("");
      setPublicFiles([]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <section>
      <div className="w-full h-full rounded-lg flex flex-row space-x-2">
        <div className=" bg-[#222a35] p-6 w-full h-full rounded-lg">
          <div className="flex justify-end mb-2">
            <h1 className="text-xl font-bold tracking-wider bg-slate-700 rounded-full px-6 py-1 border-2 border-[#334155]">
              PUBLIC
            </h1>
          </div>
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
            onClick={addProjectsToFirestore}
            className="bg-orange-600 hover:bg-orange-700 border-2 border-slate-600 font-medium rounded-md block px-4 py-2 mt-4 disabled:bg-blue-200 disabled:cursor-not-allowed"
            disabled={per !== null && per < 100}
          >
            Add Info
          </button>
        </div>
        <div className=" bg-[#222a35] p-6 w-full rounded-lg">
          <div className="flex justify-end mb-2">
            <h1 className="text-xl font-bold tracking-wider bg-slate-700 rounded-full px-6 py-1">
              PRIVATE
            </h1>
          </div>
          <Private />
        </div>
      </div>
    </section>
  );
};

export default Projects;
