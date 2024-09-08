"use client";
import { auth } from "@/app/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bars } from "react-loader-spinner";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = user.stsTokenManager.accessToken;
      localStorage.setItem("user", JSON.stringify(user));
      document.cookie = `token=${token}; path=/`;

      router.push("/admin");
      sessionStorage.setItem("fromRegister", "true");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Sign-up failed. Please try again.");
    }
  };

  return (
    <section className="h-screen w-screen bg-gradient-to-br from-blue-900 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md bg-gradient-to-br from-white to-blue-50">
        <form
          onSubmit={handleSignUp}
          className="flex flex-col items-center gap-6"
        >
          <h1 className="font-extrabold text-4xl text-gray-800">
            SIGN<span className="text-orange-600">UP</span>
          </h1>
          <input
            type="email"
            className="outline-none text-slate-900 p-3 w-full border border-gray-300 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="outline-none text-slate-900 p-3 w-full border border-gray-300 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`${
              loading ? "cursor-not-allowed" : "hover:bg-blue-700"
            } bg-blue-900 text-white rounded shadow-lg py-2 w-full transition duration-300`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <Bars
                  height="24"
                  width="24"
                  color="#ffffff"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              "Sign up"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Register;
