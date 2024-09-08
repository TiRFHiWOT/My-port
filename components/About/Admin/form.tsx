import React, { ChangeEvent, useEffect, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import Image from "next/image";

type AboutFormProps = {
  aboutData: {
    description: string;
    image: string;
  };
  handleChange: (field: string, value: any) => void;
  handleImageChange: (image: File) => void;
  handleSubmit: () => Promise<void>;
  isUpdating: boolean;
  warning: string;
};

const AboutForm: React.FC<AboutFormProps> = ({
  aboutData,
  handleChange,
  handleImageChange,
  handleSubmit,
  isUpdating,
  warning,
}) => {
  const [uploading, setUploading] = useState(false);
  const [initialAboutInfo, setInitialAboutInfo] = useState(aboutData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<{
    url: string;
    width: number;
    height: number;
  } | null>(null);

  const [editorState, setEditorState] = useState(() => {
    const contentBlock = htmlToDraft(aboutData.description || "");
    const contentState = ContentState.createFromBlockArray(
      contentBlock ? contentBlock.contentBlocks : []
    );
    return EditorState.createWithContent(contentState);
  });

  useEffect(() => {
    const contentBlock = htmlToDraft(aboutData.description || "");
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [aboutData.description]);

  useEffect(() => {
    if (aboutData.image) {
      setImagePreview({
        url: aboutData.image,
        width: 150,
        height: 150,
      });
    }
  }, [aboutData.image]);

  useEffect(() => {
    setInitialAboutInfo(aboutData);
  }, [aboutData]);

  const handleEditorChange = (newState: EditorState) => {
    setEditorState(newState);
    const contentAsHTML = draftToHtml(
      convertToRaw(newState.getCurrentContent())
    );
    handleChange("description", contentAsHTML);
  };

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
    }
  };

  const hasChanges = () => {
    const currentDescription = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    const currentImage = imageFile ? imageFile.name : aboutData.image;

    const initialDescription = initialAboutInfo.description;
    const initialImage = initialAboutInfo.image;

    return (
      currentDescription !== initialDescription || currentImage !== initialImage
    );
  };

  const handleFormSubmit = async () => {
    if (!hasChanges()) return;
    setUploading(true);
    try {
      await handleSubmit();
      setInitialAboutInfo({
        description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        image: imageFile ? URL.createObjectURL(imageFile) : aboutData.image,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-4">
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
      {warning && <p className="text-red-500">{warning}</p>}
      <button
        onClick={handleFormSubmit}
        className={`py-2 px-4 border-2 rounded-lg transition ${
          hasChanges()
            ? "bg-green-600 text-white hover:bg-green-700 border-gray-700"
            : "bg-gray-600 text-gray-400 cursor-not-allowed border-gray-800"
        }`}
        disabled={uploading || !hasChanges()}
        title={!hasChanges() ? "No changes have been made" : ""}
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
