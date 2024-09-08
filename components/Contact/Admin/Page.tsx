import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveContact,
  fetchContacts,
  selectContacts,
  selectLoading,
  selectError,
} from "@/store/slice/contactAdminSlice";

import ContactForm from "./Form";
import Spinner from "@/components/Spinner/Spinner";
import { AppDispatch } from "@/store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Contact {
  id?: string;
  description: string;
  email: string;
  phone: string;
  telegram?: string;
  linkedin?: string;
  github?: string;
}

const ContactAdmin: React.FC = () => {
  const [contact, setContact] = useState<Contact>({
    description: "",
    email: "",
    phone: "",
    telegram: "",
    linkedin: "",
    github: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (contacts.length > 0) {
      setContact(contacts[0]);
    }
  }, [contacts]);

  const handleUpdateContact = (contact: Contact) => {
    dispatch(saveContact(contact))
      .unwrap()
      .then(() => {
        toast.success(
          isEditing
            ? "Contact updated successfully!"
            : "Contact saved successfully!"
        );
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Failed to save contact");
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !contact.description ||
      !contact.email ||
      !contact.phone ||
      !contact.telegram ||
      !contact.linkedin ||
      !contact.github
    ) {
      toast.error("Please fill in all required fields before submitting.");
      return;
    }
    try {
      await handleUpdateContact(contact);
    } catch (err) {
      console.error("Error saving contact: ", err);
      toast.error("Failed to save contact");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setLoadingData(true);
    dispatch(fetchContacts())
      .unwrap()
      .finally(() => {
        setLoadingData(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg border-2 border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Contact Info</h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="py-2 px-4 text-gray-200 border-2 border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition"
          >
            Show Contact
          </button>
        )}
      </div>
      {loadingData ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        isEditing && (
          <ContactForm
            contact={contact}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isUpdating={isEditing}
          />
        )
      )}
      <ToastContainer />
    </div>
  );
};

export default ContactAdmin;
