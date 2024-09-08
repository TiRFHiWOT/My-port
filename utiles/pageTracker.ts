import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

const savePageVisit = async (pageName:any) => {
  try {
    const pageRef = doc(db, "pageVisits", pageName);
    const pageSnap = await getDoc(pageRef);

    if (pageSnap.exists()) {
      await updateDoc(pageRef, {
        visitCount: increment(1),
      });
    } else {
      await setDoc(pageRef, { visitCount: 1 });
    }
  } catch (error) {
    console.error("Error saving page visit: ", error);
  }
};

export default savePageVisit;
