import { db } from "@/app/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

export const logVisit = async (page: any) => {
  try {
    await addDoc(collection(db, "frontPageVisits"), {
      page,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error logging visit: ", error);
  }
};

export const fetchVisitData = async () => {
  const querySnapshot = await getDocs(collection(db, "frontPageVisits"));
  const visitsData = querySnapshot.docs.map((doc) => doc.data());

  const heatmapData = Array(7)
    .fill(0)
    .map(() => Array(24).fill(0)); // 7 days, 24 hours

  visitsData.forEach(({ timestamp }) => {
    const date = new Date(timestamp.seconds * 1000);
    const day = date.getDay(); // Sunday - Saturday : 0 - 6
    const hour = date.getHours(); // 0 - 23 hours
    heatmapData[day][hour]++;
  });

  return heatmapData;
};
