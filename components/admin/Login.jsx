"use client";
import { useState, useEffect } from "react";
import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import useAuthMiddleware from "@/lib/middleWare";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useAuthMiddleware();

  const handleLogin = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/admin");
      })
      .catch((error) => {
        setError(true);
      });
  };

  const signUp = () => {
    router.push("/signup");
  };
  return (
    <section>
      <div className="flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-4 w-[100vw] h-[85.5vh]">
        <h1 className="font-extrabold text-4xl ">
          LOG<span className="text-orange-600">IN</span>
        </h1>
        <input
          type="email"
          className=" outline-none text-slate-900 p-2 w-full max-w-[17rem]"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className=" outline-none text-slate-900 p-2 w-full max-w-[17rem]"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className=" bg-blue-900 hover:bg-blue-800 rounded-sm shadow-lg py-1.5 font-semibold w-full max-w-[17rem] tracking-wider text-lg"
          onClick={handleLogin}
        >
          Log in
        </button>
        {error && (
          <span className=" text-xs text-red-500">
            Wrong email or password!
          </span>
        )}
        <button
          onClick={signUp}
          className="text-xs border-b hover:text-orange-600 hover:border-orange-600 "
        >
          Sign Up
        </button>
      </div>
    </section>
  );
};

export default Login;
