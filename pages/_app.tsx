import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store/store";
import "@/app/globals.css";
import { Poppins } from "next/font/google";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect } from "react";
import { db } from "@/app/firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
  increment,
} from "firebase/firestore";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

async function getUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to fetch IP address:", error);
    return null;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const trackVisit = async () => {
      const userIP = await getUserIP();
      if (!userIP) return;
      const visitRef = doc(db, "siteVisits", userIP);
      const docSnap = await getDoc(visitRef);

      if (!docSnap.exists()) {
        await setDoc(visitRef, {
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent,
          visitCount: 1,
        });
      } else {
        await updateDoc(visitRef, {
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent,
          visitCount: increment(1),
        });
      }
    };

    trackVisit();
  }, []);

  return (
    <Provider store={store}>
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}

export default MyApp;
