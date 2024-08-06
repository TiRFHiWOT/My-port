import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EmailField from "@/components/Contact/Email";
import SubjectField from "@/components/Contact/Subject";
import MessageField from "@/components/Contact/Message";
import SubmitButton from "@/components/Contact/Submit";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Email sent successfully");
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <EmailField />
      <SubjectField />
      <MessageField />
      <SubmitButton />
      {loading && <p className="text-green-500">Sending...</p>}
      <ToastContainer />
    </form>
  );
};

export default ContactForm;
