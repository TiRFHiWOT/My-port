import React, { ChangeEvent, useEffect, useState } from "react";

type ContactFormProps = {
  contact: {
    description: string;
    email: string;
    phone: string;
    telegram: string;
    linkedin: string;
    github: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
  isUpdating: boolean;
  warning: string;
};

const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  handleChange,
  handleSubmit,
  isUpdating,
  warning,
}) => {
  const [uploading, setUploading] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [initialContact, setInitialContact] = useState(contact);

  useEffect(() => {
    const hasFormChanged =
      JSON.stringify(contact) !== JSON.stringify(initialContact);
    setHasChanged(hasFormChanged);
  }, [contact, initialContact]);

  const ensureProtocol = (url: string) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `http://${url}`;
  };

  const handleFormSubmit = async () => {
    if (!hasChanged) return;
    setUploading(true);
    try {
      await handleSubmit();
      setInitialContact(contact);
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
        <input
          type="text"
          name="description"
          value={contact.description}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Social Media</label>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="telegram"
            placeholder="Telegram"
            value={ensureProtocol(contact.telegram)}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
          />
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn"
            value={ensureProtocol(contact.linkedin)}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
          />
          <input
            type="text"
            name="github"
            placeholder="GitHub"
            value={ensureProtocol(contact.github)}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-gray-600"
          />
        </div>
      </div>
      {warning && <p className="text-red-600 mb-4">{warning}</p>}
      <button
        onClick={handleFormSubmit}
        className={`py-2 px-4 border-2 border-gray-700 rounded-lg transition ${
          hasChanged
            ? "bg-green-600 text-white hover:bg-green-700 border-gray-700"
            : "bg-gray-600 text-gray-400 cursor-not-allowed border-gray-800"
        }`}
        disabled={uploading || !hasChanged}
        title={!hasChanged ? "No changes have been made" : ""}
      >
        {uploading
          ? "Uploading..."
          : isUpdating
          ? "Update Contact"
          : "Save Contact"}
      </button>
    </div>
  );
};

export default ContactForm;
