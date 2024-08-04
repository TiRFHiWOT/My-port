import { db, storage } from "@/app/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const testimonialsCollection = collection(db, "testimonial");

export const fetchTestimonials = async () => {
  const testimonialsSnapshot = await getDocs(testimonialsCollection);
  return testimonialsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addTestimonial = async (testimonial) => {
  const docRef = await addDoc(testimonialsCollection, testimonial);
  return { ...testimonial, id: docRef.id };
};

export const updateTestimonial = async (id, testimonial) => {
  const testimonialDoc = doc(db, "testimonial", id);
  await updateDoc(testimonialDoc, testimonial);
  return { ...testimonial, id };
};

export const deleteTestimonial = async (id) => {
  const testimonialDoc = doc(db, "testimonial", id);
  await deleteDoc(testimonialDoc);
};

export const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const removeImage = async (imageURL) => {
  const storageRef = ref(storage, imageURL);
  await deleteObject(storageRef);
};

export const updateTestimonialImage = async (testimonialId, imageURL) => {
  const testimonialDoc = doc(db, "testimonial", testimonialId);
  await updateDoc(testimonialDoc, { image: imageURL });
};
