"use client";
import { useTransition, useState, useEffect } from "react";

const FileUpload = () => {
  const [fileUpload, setFileUpload] = useState(null);

  const uploadFile = () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `testimonialFile/${fileUpload.name}`);
    uploadBytes(filesFolderRef, fileUpload).then(() => {
      alert("Image Uploaded");
    });
  };

  return (
    <section>
      <div className="flex flex-col space-y-4 bg-[#334155cb] p-2 border border-[#3e4e63] rounded-md shadow-xl">
        <input
          type="file"
          id="image"
          required
          className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-sm rounded-sm block w-full p-2.5"
          placeholder="User Image"
          onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 font-medium rounded-md block p-2.5"
          onClick={uploadFile}
        >
          Upload File
        </button>
      </div>
    </section>
  );
};

export default FileUpload;
