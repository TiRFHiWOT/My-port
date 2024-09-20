import React, { useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import SkillsDropdown from "./Drop";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

type WorkExperienceFormProps = {
  workExperience: any;
  handleChange: (field: string, value: any) => void;
  handleSubmit: () => void;
  isUpdating: boolean;
  warning: string;
};

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  workExperience,
  handleChange,
  handleSubmit,
  isUpdating,
  warning,
}) => {
  const [uploading, setUploading] = useState(false);

  const contentBlock = htmlToDraft(workExperience.description || "");
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(contentState)
  );

  const handleEditorChange = (newState: EditorState) => {
    setEditorState(newState);
    const contentAsHTML = draftToHtml(
      convertToRaw(newState.getCurrentContent())
    );
    handleChange("description", contentAsHTML);
  };

  const handleSkillsChange = (skills: string[]) => {
    handleChange("skillsUsed", skills.join(", "));
  };

  const handleFormSubmit = async () => {
    setUploading(true);
    await handleSubmit();
    setUploading(false);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-4">
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Position</label>
        <input
          type="text"
          value={workExperience.position}
          onChange={(e) => handleChange("position", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Work Place</label>
        <input
          type="text"
          value={workExperience.place}
          onChange={(e) => handleChange("place", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Address</label>
        <input
          type="text"
          value={workExperience.address}
          onChange={(e) => handleChange("address", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Year</label>
        <input
          type="text"
          value={workExperience.year}
          onChange={(e) => handleChange("year", e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Skills Used</label>
        <SkillsDropdown
          selectedSkills={workExperience.skillsUsed.split(", ").filter(Boolean)}
          onChange={handleSkillsChange}
        />
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
      {warning && <p className="text-red-500">{warning}</p>}
      <button
        onClick={handleFormSubmit}
        className="py-2 px-4 border-2 border-gray-700 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={uploading}
      >
        {uploading
          ? "Uploading..."
          : isUpdating
          ? "Update Experience"
          : "Submit Experience"}
      </button>
    </div>
  );
};

export default WorkExperienceForm;
