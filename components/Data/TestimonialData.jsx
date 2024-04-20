"use client";
import { useState, useEffect } from "react";
import {
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
  doc,
} from "firebase/firestore";
import { db } from "@/app/firebase";

const TestimonialData = () => {
  const testmonialCollectionRef = collection(db, "testimonial");
  const [Testimonial, setTestimonial] = useState([]);
  const [updatedUserName, setUpdatedUserName] = useState("");
  const [updatedPosition, setUpdatedPosition] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getTestimonial = async () => {
    try {
      const data = await getDocs(testmonialCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTestimonial(filteredData);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTestimonial();
  }, []);

  const deleteTestimonial = async (id) => {
    const testimonialDoc = doc(db, "testimonial", id);
    await deleteDoc(testimonialDoc);
    setIsDeleted(true);
    setDeleteId(null);
    setTimeout(() => setIsDeleted(false), 3000);
    getTestimonial();
  };

  const updateUserName = async (id) => {
    const testimonialDoc = doc(db, "testimonial", id);
    await updateDoc(testimonialDoc, { userName: updatedUserName });
    getTestimonial();
  };

  const updatePosition = async (id) => {
    const testimonialDoc = doc(db, "testimonial", id);
    await updateDoc(testimonialDoc, { position: updatedPosition });
    getTestimonial();
  };

  const updateComment = async (id) => {
    const testimonialDoc = doc(db, "testimonial", id);
    await updateDoc(testimonialDoc, { comment: updatedComment });
    getTestimonial();
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteTestimonial(deleteId);
    }
  };

  const handleCancel = () => {
    setDeleteId(null);
  };

  return (
    <section>
      {isLoading && <div></div>}

      {!isLoading && Testimonial.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          No testimonials available.
        </div>
      )}
      <div>
        {Testimonial.map((testimonial) => (
          <div
            key={testimonial.id}
            className="mb-2 p-3 rounded-lg flex flex-row justify-between border 
              backdrop-blur-lg border-[#334155] text-xs"
          >
            <div className="grid gap-y-1.5 w-full">
              <div
                className="flex flex-row justify-between px-4 items-center 
                rounded-sm bg-[#334155]"
              >
                <h1 className="my-1 pb-1 text-lg text-sky-300 ">
                  ID: {testimonial.id}
                </h1>
                <button
                  onClick={() => setDeleteId(testimonial.id)}
                  className="rounded-full border-2 border-[#5b6b83] text-white
                     bg-red-500 hover:bg-red-600 py-2 px-4 my-1"
                >
                  Delete
                </button>
              </div>

              <div
                className="flex flex-row justify-between items-center px-4
                 rounded-sm bg-[#334155]"
              >
                <h1>
                  <span className="text-sky-300">userName:</span>{" "}
                  {testimonial.userName}
                </h1>
                <div className="flex flex-row my-1 gap-2">
                  <input
                    type="text"
                    placeholder={testimonial.userName}
                    onChange={(e) => setUpdatedUserName(e.target.value)}
                    className="bg-slate-700 border border-slate-600 placeholder-slate-500
                       text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={() => updateUserName(testimonial.id)}
                    className="rounded-full text-white bg-sky-500 hover:bg-sky-600 py-2 px-4"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div
                className="flex flex-row justify-between items-center px-4 
                rounded-sm bg-[#334155]"
              >
                <h1>
                  <span className="text-sky-300">position:</span>{" "}
                  {testimonial.position}
                </h1>
                <div className="flex flex-row my-1 gap-2">
                  <input
                    type="text"
                    placeholder={testimonial.position}
                    onChange={(e) => setUpdatedPosition(e.target.value)}
                    className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={() => updatePosition(testimonial.id)}
                    className="rounded-full text-white bg-sky-500 hover:bg-sky-600 py-2 px-4"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div
                className="flex flex-row justify-between items-center px-4 
                rounded-sm bg-[#334155]"
              >
                <h1>
                  <span className="text-sky-300">comment:</span>{" "}
                  {testimonial.comment}
                </h1>
                <div className="flex flex-row my-1 gap-2">
                  <input
                    type="text"
                    placeholder={testimonial.comment}
                    onChange={(e) => setUpdatedComment(e.target.value)}
                    className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-full px-2 outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={() => updateComment(testimonial.id)}
                    className="rounded-full text-white bg-sky-500 hover:bg-sky-600 py-2 px-4"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div
                className="flex flex-row justify-between py-2 px-4 rounded-sm
                 bg-[#334155]"
              >
                <span className="text-sky-300">Image:</span> {testimonial.image}
              </div>
            </div>
          </div>
        ))}
      </div>
      {deleteId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#334155] border border-gray-600 p-6 rounded shadow-lg max-w-sm mx-auto">
            <h2 className="text-lg font-bold text-white">
              Are you sure you want to delete?
            </h2>
            <p className="text-gray-400 flex justify-end">
              This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleConfirmDelete}
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors mr-4"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-2 bg-gray-500 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleted && (
        <div className="bg-green-500 text-white p-2 absolute top-0 right-0 m-2 rounded-md">
          Testimonial deleted successfully!
        </div>
      )}
    </section>
  );
};

export default TestimonialData;
