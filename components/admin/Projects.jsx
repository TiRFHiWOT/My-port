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
  let controls = [
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
      placeholder: "Enter Images",
      type: "file",
      label: "IMAGES",
      onChange: (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
      },
    },
  ];

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPreviewUrl, setNewPreviewUrl] = useState("");
  const [newGitUrl, setNewGitUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [per, setPer] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  useEffect(() => {
    const uploadProjects = async () => {
      if (files.length === 0) return;

      const urls = [];

      for (const file of files) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, "projects/" + name);
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
              console.log("Download URL:", downloadURL);
              urls.push(downloadURL);

              if (urls.length === files.length) {
                console.log("All URLs generated:", urls);
                setImageUrls(urls);
              }
            });
          }
        );
      }
    };

    uploadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const collectionRef = collection(db, "projects");

  const addProjectsToFirestore = async () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      console.error("Title or description cannot be empty");
      return;
    }
    try {
      await addDoc(collectionRef, {
        title: newTitle,
        description: newDescription,
        previewUrl: newPreviewUrl,
        gitUrl: newGitUrl,
        images: imageUrls,
        tag: isPrivate,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const resetInputFields = () => {
    setNewTitle("");
    setNewDescription("");
    setNewPreviewUrl("");
    setNewGitUrl("");
    setFiles([]);
  };

  if (isPrivate) {
    controls = controls.filter(
      (control) => control.name !== "previewUrl" && control.name !== "gitUrl"
    );
  }

  const handlePrivacyChange = (e) => {
    setIsPrivate(e.target.checked);
  };

  const onSubmit = () => {
    if (!(newTitle.trim() && newDescription.trim() && files.length > 0)) {
      window.alert("Please fill all required fields");
      return;
    }
    setShowVerification(true);
  };

  const handleVerificationConfirm = () => {
    addProjectsToFirestore();
    setShowVerification(false);
    resetInputFields();
  };

  return (
    <section>
      <div className="w-full h-full rounded-lg flex flex-row space-x-2">
        <div className=" bg-[#222a35] p-6 w-full h-full rounded-lg">
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
          <div className="flex flex-col">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={handlePrivacyChange}
                className="form-checkbox"
              />
              <span className="ml-2">Private</span>
            </label>
            <div>
              <button
                onClick={onSubmit}
                className="bg-orange-600 hover:bg-orange-700 border-2 border-slate-600 font-medium rounded-md block px-4 py-2 mt-4 disabled:bg-blue-200 disabled:cursor-not-allowed"
                disabled={per !== null && per < 100}
              >
                Add Info
              </button>
            </div>
          </div>
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

export default Projects;
