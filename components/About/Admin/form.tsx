"use client";
import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import Image from "next/image";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Link from "next/link";

type AboutFormProps = {
  aboutData: {
    image: string;
    description: string;
  };
  handleChange: (field: string, value: any) => void;
  handleImageChange: (image: File) => void;
  handleSubmit: (image: File | null, cvFile: File | null) => void;
  isUpdating: boolean;
  warning: string;
};

const createEditorStateFromHTML = (html: string) => {
  const contentBlock = htmlToDraft(html || "");
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  return EditorState.createWithContent(contentState);
};

const AboutForm: React.FC<AboutFormProps> = ({
  aboutData,
  handleChange,
  handleImageChange,
  handleCvChange,
  handleSubmit,
  isUpdating,
  warning,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<{
    url: string;
    width: number;
    height: number;
  } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>(() =>
    createEditorStateFromHTML(aboutData.description)
  );

  useEffect(() => {
    if (aboutData.image) {
      setImagePreview({
        url: aboutData.image,
        width: 150,
        height: 150,
      });
    }

    const newEditorState = createEditorStateFromHTML(aboutData.description);
    if (
      editorState.getCurrentContent().getPlainText() !==
      newEditorState.getCurrentContent().getPlainText()
    ) {
      setEditorState(newEditorState);
    }
  }, [aboutData.description, aboutData.image]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      handleImageChange(file);
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.onload = () => {
        setImagePreview({ url, width: img.width, height: img.height });
      };
      img.src = url;
      setHasChanges(true);
    }
  };
  const handleCvFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCvFile(file); 
    if (file) {
      handleCvChange(file); 
      setHasChanges(true);
    }
  };

  const handleEditorChange = useCallback(
    (newState: EditorState) => {
      setEditorState(newState);
      const contentAsHTML = draftToHtml(
        convertToRaw(newState.getCurrentContent())
      );
      handleChange("description", contentAsHTML);
      setHasChanges(true);
    },
    [handleChange]
  );

  const handleFormSubmit = async () => {
    setUploading(true);
    await handleSubmit(imageFile, cvFile);
    setUploading(false);
    setHasChanges(false);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-4">
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Upload CV</label>
        <input
          type="file"
          onChange={handleCvFileChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
          accept=".pdf,.doc,.docx"
        />
        {aboutData.cv && (
          <Link
            href={aboutData.cv}
            className="text-blue-400 mt-2 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            View uploaded CV
          </Link>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Description</label>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-2">
          <DraftEditor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
                "colorPicker",
                "link",
                "embedded",
                "image",
                "history",
              ],
            }}
            wrapperClassName="bg-gray-800 rounded-lg"
            editorClassName="p-3 text-gray-200 bg-gray-900 min-h-[150px] rounded-lg"
            toolbarClassName="border-b border-gray-700 bg-gray-800 text-gray-900"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Profile Image</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
          accept="image/*"
        />
      </div>
      {imagePreview && (
        <div className="mb-4">
          <Image
            src={imagePreview.url}
            alt="Selected"
            width={150}
            height={150}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      {warning && <p className="text-red-500 mb-4">{warning}</p>}

      <button
        onClick={handleFormSubmit}
        className={`py-2 px-4 border border-gray-700 rounded-lg transition ${
          hasChanges
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-500 text-gray-300 cursor-not-allowed"
        }`}
        disabled={uploading || !hasChanges}
        title={!hasChanges ? "No changes have been made" : ""}
      >
        {uploading
          ? "Uploading..."
          : isUpdating
          ? "Update About Info"
          : "Submit About Info"}
      </button>
    </div>
  );
};

export default AboutForm;
