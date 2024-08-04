"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const goToAdmin = () => {
    router.push("/admin");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 p-4">
      <div className="text-red-500 text-6xl mb-4">🚫</div>
      <h2 className="text-4xl font-bold mb-2">Page Not Found</h2>
      <p className="text-lg mb-4">
        {`Oops! The page you're looking for doesn't exist or has been moved.`}
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-150"
        onClick={goToAdmin}
      >
        Return to Home
      </button>
    </main>
  );
}
