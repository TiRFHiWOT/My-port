"use client";
import { useState } from "react";
import { auth, googleProvider } from "@/app/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Login = (onClick) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signinOut = async () => {
    await signOut(auth);
  };

  return (
    <section>
      <div className="flex flex-row space-x-3 p-2 mx-5 mt-5 bg-[#34465f] rounded-md">
        <div>
          <input
            type="text"
            id="email"
            required
            className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-sm rounded-lg block p-2.5 shadow-lg w-[20rem]"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="passsword"
            required
            className="bg-slate-700 border border-slate-600 placeholder-slate-500 text-slate-400 text-sm rounded-lg block w-[20rem] p-2.5 shadow-lg"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 font-medium rounded-lg block w-full p-2.5"
            onClick={signIn}
          >
            Sign In
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 font-medium rounded-lg block w-full p-2.5"
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 font-medium rounded-lg block w-full p-2.5"
            onClick={signinOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
