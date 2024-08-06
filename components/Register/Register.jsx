"use client";
import { auth } from "@/app/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const token = user.stsTokenManager.accessToken;
        localStorage.setItem("user", JSON.stringify(user));
        document.cookie = `token=${token}; path=/`;

        toast.success("Successfully signed up!");

        setTimeout(() => {
          router.push("/admin");
        }, 1500);
      })
      .catch((error) => {
        console.error("Signup error:", error);

        toast.error("Sign-up failed. Please try again.");
      });
  };

  return (
    <section className="h-screen w-screen bg-gradient-to-br from-blue-900 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form
          onSubmit={handleSignUp}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="font-extrabold text-4xl text-gray-800">
            SIGN<span className="text-orange-600">UP</span>
          </h1>
          <input
            type="email"
            className="outline-none text-slate-900 p-2 w-full border border-gray-300 rounded focus:border-indigo-500 transition duration-300"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="outline-none text-slate-900 p-2 w-full border border-gray-300 rounded focus:border-indigo-500 transition duration-300"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-700 text-white rounded shadow-lg py-2 w-full transition duration-300"
          >
            Sign up
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

export default Register;
