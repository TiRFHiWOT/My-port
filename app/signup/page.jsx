"use client";
import { auth } from "@/app/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const signup = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("");
  const handlesignin = (e) => {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
      }
    );
  };
  return (
    <section>
      <div className="h-[80vh] w-[100vw] flex justify-center items-center">
        <div className="flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4 w-fit">
          <h1 className="font-extrabold text-2xl sm:text-4xl ">
            SIGN<span className="text-orange-600">UP</span>
          </h1>
          <input
            type="email"
            className=" outline-none text-slate-900 p-2 w-full max-w-[20%]"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className=" outline-none text-slate-900 p-2 w-full max-w-[20%]"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-sm bg-blue-900 hover:bg-blue-800 shadow-lg py-1.5 font-semibold w-full max-w-[20%] tracking-wider text-lg"
            onClick={handlesignin}
          >
            Sign up
          </button>
        </div>
      </div>
    </section>
  );
};

export default signup;
