"use client";
import { useState, useCallback } from "react";
import { auth } from "@/app/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      toast.dismiss();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        setLoading(false);
        return;
      }

      if (!password) {
        toast.error("Please enter your password.");
        setLoading(false);
        return;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        Cookies.set("token", token, { expires: 1 });

        router.push("/admin?loginSuccess=true");
        sessionStorage.setItem("fromLogin", "true");
      } catch (error) {
        toast.error("Login failed. Please check your email and password.");
        console.error("Login error:", error);
      }
    },
    [email, password, router]
  );

  const signUp = useCallback(() => {
    router.push("/register");
  }, [router]);

  return (
    <section className="h-screen w-screen bg-gradient-to-br from-blue-900 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md bg-gradient-to-br from-white to-blue-50">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="font-extrabold text-4xl text-gray-800">
            LOG<span className="text-orange-600">IN</span>
          </h1>
          <input
            type="email"
            className="outline-none text-slate-900 p-3 w-full border border-gray-300 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="outline-none text-slate-900 p-3 w-full border border-gray-300 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`bg-blue-900 hover:bg-blue-700 text-white rounded shadow-lg py-2 w-full transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <div className="flex justify-center pt-2">
          <button
            onClick={signUp}
            className="text-sm text-indigo-500 hover:text-indigo-700 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
