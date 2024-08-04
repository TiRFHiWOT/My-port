"use client";
import { useState, useCallback } from "react";
import { auth } from "@/app/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        Cookies.set("token", token, { expires: 1 });
        router.push("/admin");
      } catch (error) {
        setError("Login failed. Please check your email and password.");
        console.error("Login error:", error);
      } finally {
        setLoading(false);
      }
    },
    [email, password, router]
  );

  const signUp = useCallback(() => {
    router.push("/register");
  }, [router]);

  return (
    <section className="h-screen w-screen bg-gradient-to-br from-blue-900 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="font-extrabold text-4xl text-gray-800">
            LOG<span className="text-orange-600">IN</span>
          </h1>
          <input
            type="email"
            className="outline-none text-slate-900 p-2 w-full border border-gray-300 rounded focus:border-indigo-500 transition duration-300"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="outline-none text-slate-900 p-2 w-full border border-gray-300 rounded focus:border-indigo-500 transition duration-300"
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
          {error && <span className="text-sm text-red-500">{error}</span>}
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
    </section>
  );
};

export default Login;
