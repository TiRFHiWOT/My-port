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

  const deleteTestimonial = async (id) => {
    const testimonialDoc = doc(db, "testimonial", id);
    await deleteDoc(testimonialDoc);
  };

  const updateUserName = async (id) => {
    const testimonialDoc = doc(db, "testimonial", id);
    await updateDoc(testimonialDoc, { userName: updatedUserName });
  };

  const updatePosition = async (id) => {
    const testimonialDoc = doc(db, "testimonial", id);
    await updateDoc(testimonialDoc, { position: updatedPosition });
  };

  const updateComment = async (id) => {
    const testimonialDoc = doc(db, "testimonial", id);
    await updateDoc(testimonialDoc, { comment: updatedComment });
  };

  const getTestimonial = async () => {
    const data = await getDocs(testmonialCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setTestimonial(filteredData);
  };

  useEffect(() => {
    getTestimonial();
  }, []);

  getTestimonial();
  return (
    <section>
      <div>
        <div>
          {Testimonial.map((testimonial) => (
            <div
              key={testimonial.id}
              className="mb-2 p-3 flex flex-row justify-between bg-[#33415580] text-xs"
            >
              <div>
                <div className="flex flex-row justify-between space-x-2 my-1">
                  <h1 className="my-1 pb-1 text-sky-300 border-b border-[#334155]">
                    ID: {testimonial.id}
                  </h1>
                  <button
                    onClick={() => deleteTestimonial(testimonial.id)}
                    className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>

                <div className="my-2">
                  <div className="my-1 flex flex-row justify-between space-x-2">
                    <h1>
                      <span className="text-sky-300">userName:</span>{" "}
                      {testimonial.userName}
                    </h1>
                    <div className="flex flex-row space-x-2">
                      <input
                        type="text"
                        placeholder="New User Name"
                        onChange={(e) => setUpdatedUserName(e.target.value)}
                        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                      />
                      <button
                        onClick={() => updateUserName(testimonial.id)}
                        className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  <div className="my-1 flex flex-row justify-between space-x-2">
                    <h1>
                      <span className="text-sky-300">position:</span>{" "}
                      {testimonial.position}
                    </h1>
                    <div className="flex flex-row space-x-2">
                      <input
                        type="text"
                        placeholder="New Position"
                        onChange={(e) => setUpdatedPosition(e.target.value)}
                        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                      />
                      <button
                        onClick={() => updatePosition(testimonial.id)}
                        className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  <div className="my-1 flex flex-row justify-between space-x-2">
                    <h1>
                      <span className="text-sky-300">comment:</span>{" "}
                      {testimonial.comment}
                    </h1>
                    <div className="flex flex-row space-x-2">
                      <input
                        type="text"
                        placeholder="New Comment"
                        onChange={(e) => setUpdatedComment(e.target.value)}
                        className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-xs rounded-sm block"
                      />
                      <button
                        onClick={() => updateComment(testimonial.id)}
                        className="rounded-md px-3 py-1 bg-sky-400 text-black hover:bg-sky-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  <div className="my-1 flex flex-row justify-between space-x-2 w-[80%]">
                    <span className="text-sky-300">Image:</span>{" "}
                    {testimonial.image}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialData;
