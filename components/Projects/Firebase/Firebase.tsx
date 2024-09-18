import { db, storage } from "../../../app/firebaseConfig";
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

const projectsCollection = collection(db, "projects");

export const fetchProjects = async () => {
  const projectSnapshot = await getDocs(projectsCollection);
  return projectSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const addProject = async (project: any) => {
  const docRef = await addDoc(collection(db, "projects"), project);
  return { ...project, id: docRef.id };
};

export const updateProject = async (id: string, project: any) => {
  const projectRef = doc(db, "projects", id);
  await updateDoc(projectRef, project);
};

export const deleteProject = async (id: string) => {
  const projectRef = doc(db, "projects", id);
  await deleteDoc(projectRef);
};

export const uploadImage = async (image: File) => {
  const storageRef = ref(storage, `images/${image.name}`);
  await uploadBytes(storageRef, image);
  return await getDownloadURL(storageRef);
};

export const removeImage = async (url: string) => {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
};

export const updateProjectImages = async (projectId: string, images: any) => {
  const projectDoc = doc(db, "projects", projectId);
  await updateDoc(projectDoc, { images });
};
