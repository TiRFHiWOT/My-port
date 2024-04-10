"use client";
import { useTransition, useState, useEffect, useRef } from "react";
import {
  getDocs,
  addDoc,
  deleteDoc,
  collection,
  doc,
} from "firebase/firestore";
import { db, auth } from "@/app/firebase";

const TestimonialUI = () => {
  const testmonialCollectionRef = collection(db, "testimonial");
  const [Testimonial, setTestimonial] = useState([]);

  const [newUserName, setNewUserName] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newComment, setNewComment] = useState("");

  const deleteTestimonial = async (id) => {
    const testimonialDoc = doc(db, "Testimonial", id);
    await deleteDoc(testimonialDoc);
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

  const onSubmit = async () => {
    await addDoc(testmonialCollectionRef, {
      userName: newUserName,
      position: newPosition,
      Comment: newComment,
      userId: auth?.currentUser?.uid,
    });

    getTestimonial();
  };

  return (
    <section>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-3 bg-[#34465f] p-3 rounded-sm h-fit">
          <div>
            <input
              type="text"
              id="userName"
              required
              className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-sm rounded-sm block w-full p-2.5"
              placeholder="User Name"
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              id="position"
              required
              className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-sm rounded-sm block w-full p-2.5"
              placeholder="Position"
              onChange={(e) => setNewPosition(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              id="comment"
              required
              className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-sm rounded-sm block w-full p-2.5"
              placeholder="Comment"
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 font-medium rounded-lg block w-full p-2.5"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          {Testimonial.map((testimonial) => (
            // eslint-disable-next-line react/jsx-key
            <div className="mb-2 p-3 flex flex-row justify-between bg-[#33415580] text-xs">
              <div className="rounded-md  ">
                <h1 className="my-1 pb-1 text-sky-300 border-b border-[#334155]">
                  ID: {testimonial.id}
                </h1>

                <div className="my-2">
                  <h1>
                    <span className="text-sky-300">userName:</span>{" "}
                    {testimonial.userName}
                  </h1>
                  <h1>
                    <span className="text-sky-300">position:</span>{" "}
                    {testimonial.position}
                  </h1>
                  <h1>
                    <span className="text-sky-300">comment:</span>{" "}
                    {testimonial.Comment}
                  </h1>
                </div>
              </div>
              <div>
                <button
                  onClick={() => deleteTestimonial(testimonial.id)}
                  className="rounded-sm px-3 py-1 bg-sky-400 text-black hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialUI;
