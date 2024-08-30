"use client";
import React from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ControlledEditor = ({
  editorState,
  onChange,
  wrapperClassName = "",
  editorClassName = "",
  toolbarClassName = "",
  readOnly = false,
  placeholder = "Type your content here...",
  toolbarOptions,
  locale = "en",
}: any) => {
  const handleEditorStateChange = (newState: EditorState) => {
    onChange(newState);
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: 200 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      viewport={{ once: true }}
    >
      <label htmlFor="editor" className="block mb-2 text-sm font-medium">
        Message
      </label>
      <div
        className={`bg-slate-700 border border-slate-600 text-slate-100 text-sm rounded-lg p-2.5 min-h-[150px] ${wrapperClassName}`}
        id="editor"
      >
        <Editor
          editorState={editorState}
          toolbarClassName={`${toolbarClassName} bg-slate-800 border-b border-slate-600 rounded-t-lg text-gray-900`}
          editorClassName={`${editorClassName} text-slate-100 p-2 min-h-[100px] text-gray-900`}
          onEditorStateChange={handleEditorStateChange}
          readOnly={readOnly}
          placeholder={placeholder}
          localization={{ locale }}
          toolbar={toolbarOptions}
        />
      </div>
    </motion.div>
  );
};

export default ControlledEditor;
