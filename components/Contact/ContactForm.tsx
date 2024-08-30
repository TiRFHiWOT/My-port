"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { EditorState } from "draft-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EmailField from "@/components/Contact/Email";
import SubjectField from "@/components/Contact/Subject";
import SubmitButton from "@/components/Contact/Submit";

const ControlledEditor = dynamic(() => import("./editor"), {
  ssr: false,
});

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const message = editorState.getCurrentContent().getPlainText();
    const data = { email, subject, message };

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Email sent successfully");

        setEmail("");
        setSubject("");
        setEditorState(EditorState.createEmpty());
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to send email");
      }
    } catch (err) {
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 w-full">
      <EmailField value={email} onChange={(e) => setEmail(e.target.value)} />
      <SubjectField
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <ControlledEditor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Type your content here..."
        readOnly={false}
        locale="en"
        toolbarOptions={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "history",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
      <SubmitButton loading={loading} />
      <ToastContainer />
    </form>
  );
};

export default ContactForm;
