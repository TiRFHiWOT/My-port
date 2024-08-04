"use client";
import { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
      <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg max-w-lg">
        <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />
        <h1 className="text-3xl font-bold mb-2 text-center">
          Something went wrong!
        </h1>
        <p className="text-lg text-center mb-4">
          An unexpected error has occurred. Please try the action again, or
          contact support if the issue persists.
        </p>
        <button
          className="bg-blue-500 text-white font-bold rounded-full px-6 py-2 shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-150"
          onClick={reset}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
