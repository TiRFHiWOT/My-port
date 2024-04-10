"use client";
import { useState } from "react";
import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/admin");
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <section>
      <div className="flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-4 w-[100vw] h-[80vh]">
        <h1 className="font-extrabold text-2xl sm:text-4xl ">
          LOG<span className="text-orange-600">IN</span>
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
          className="rounded-sm bg-blue-900 hover:bg-blue-800 shadow-lg py-1.5 font-semibold w-full max-w-[20%] tracking-wider text-lg"
          onClick={handleLogin}
        >
          Log in
        </button>
        {error && (
          <span className=" text-xs text-red-500">
            Wrong email or password!
          </span>
        )}
      </div>
    </section>
  );
};

export default Login;
