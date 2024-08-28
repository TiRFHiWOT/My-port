"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  getTestimonials,
  createTestimonial,
  modifyTestimonial,
  removeTestimonial,
} from "@/store/slice/testimonialAdminSlice";
import TestimonialForm from "@/components/Testimonials/Admin/Form";
import TestimonialList from "@/components/Testimonials/Admin/List";
import Spinner from "@/components/Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Testimonial {
  id?: string;
  comment: string;
  userName: string;
  position: string;
  profilePicture?: string;
}

const TestimonialsAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { testimonials, loading } = useSelector(
    (state: RootState) => state.testimonialsAdmin
  );

  const [testimonial, setTestimonial] = useState<Testimonial>({
    comment: "",
    userName: "",
    position: "",
    profilePicture: "",
  });
  const [showInputs, setShowInputs] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTestimonialId, setCurrentTestimonialId] = useState<
    string | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showTestimonials, setShowTestimonials] = useState(false);

  useEffect(() => {
    if (showTestimonials) {
      dispatch(getTestimonials() as any).finally(() => {});
    }
  }, [dispatch, showTestimonials]);

  const handleChange = (field: keyof Testimonial, value: string) => {
    setTestimonial((prevTestimonial) => ({
      ...prevTestimonial,
      [field]: value,
    }));
  };

  const handleImageChange = (image: string) => {
    setTestimonial((prevTestimonial) => ({
      ...prevTestimonial,
      profilePicture: image,
    }));
  };

  const handleSubmit = async () => {
    if (
      !testimonial.comment ||
      !testimonial.userName ||
      !testimonial.position
    ) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    try {
      if (isUpdating) {
        if (currentTestimonialId) {
          const existingTestimonial = testimonials.find(
            (t) => t.id === currentTestimonialId
          );

          const updatedTestimonial = {
            ...testimonial,
            profilePicture:
              testimonial.profilePicture !== ""
                ? testimonial.profilePicture
                : existingTestimonial?.profilePicture || "",
          };

          await dispatch(
            modifyTestimonial({
              id: currentTestimonialId,
              testimonial: updatedTestimonial,
            }) as any
          ).unwrap();
          toast.success("Testimonial updated successfully!");
        }
      } else {
        await dispatch(createTestimonial(testimonial) as any).unwrap();
        toast.success("Testimonial submitted successfully!");
      }

      setTestimonial({
        comment: "",
        userName: "",
        position: "",
        profilePicture: "",
      });
      setShowInputs(false);
      setIsUpdating(false);
      setCurrentTestimonialId(null);
    } catch (error) {
      console.error("Error submitting testimonial: ", error);
      toast.error("Failed to submit testimonial");
    }
  };

  const handleEdit = (testimonial: Testimonial & { id: string }) => {
    setTestimonial({
      comment: testimonial.comment,
      userName: testimonial.userName,
      position: testimonial.position,
      profilePicture: testimonial.profilePicture || "",
    });
    setIsUpdating(true);
    setShowInputs(true);
    setCurrentTestimonialId(testimonial.id);
  };

  const handleRemove = async (id: string) => {
    try {
      await dispatch(removeTestimonial(id) as any).unwrap();
      toast.success("Testimonial removed successfully!");
    } catch (error) {
      console.error("Error removing testimonial: ", error);
      toast.error("Failed to remove testimonial");
    }
  };

  const filteredTestimonials = testimonials.filter((t) =>
    t.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg border-2 border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Testimonials</h2>
          {!showInputs && (
            <button
              onClick={() => setShowInputs(true)}
              className={`py-2 px-4 text-gray-200 border-2 border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition ${
                showInputs ? "bg-blue-600" : ""
              }`}
            >
              Add Testimonial
            </button>
          )}
        </div>
        {showInputs && (
          <TestimonialForm
            testimonial={testimonial}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            isUpdating={isUpdating}
          />
        )}
        <div className="flex justify-between items-center mb-1">
          <button
            onClick={() => setShowTestimonials(!showTestimonials)}
            className={`py-2 px-4 text-gray-200 border-2 rounded-lg transition ${
              showTestimonials
                ? "bg-blue-500 text-white border-blue-500"
                : "border-blue-600 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {showTestimonials ? "Hide Testimonials" : "Show Testimonials"}
          </button>
          {showTestimonials && (
            <input
              type="text"
              className="py-2 px-4 bg-gray-800 border-2 border-gray-600 shadow-lg rounded-full placeholder-gray-500 text-gray-300 outline-none"
              placeholder="Search items"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
      </div>
      {showTestimonials && (
        <div className="max-w-4xl mt-5 mx-auto p-6 rounded-lg shadow-lg border-2 border-gray-700 transition-opacity duration-300 ease-in-out opacity-100">
          {loading ? (
            <Spinner />
          ) : (
            <TestimonialList
              testimonials={filteredTestimonials}
              handleEdit={handleEdit}
              handleRemove={handleRemove}
            />
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TestimonialsAdmin;
