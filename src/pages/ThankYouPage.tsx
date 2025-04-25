import React from "react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-semibold text-green-600 mb-2">
          🎉 Payment Successful!
        </h1>
        <p className="text-gray-700 mb-4">
          Thank you for your purchase. Your transaction has been processed
          successfully.
        </p>
        <Link
          to="/home"
          className="mt-4 inline-block px-4 py-2 bg-[#E60023] text-white rounded hover:bg-red-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
