// src/pages/SubscriptionManagePage.tsx
import { useState } from "react";
import toast from "react-hot-toast";

const SubscriptionManagePage = () => {
  const [status, setStatus] = useState<"active" | "cancelled">("active");

  const handleToggle = () => {
    const newStatus = status === "active" ? "cancelled" : "active";
    setStatus(newStatus);
    toast.success(
      `Subscription ${newStatus === "active" ? "renewed" : "cancelled"} successfully!`,
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-lg text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Manage Your Subscription
        </h2>
        <p className="text-gray-600">
          Current status:{" "}
          <span className="font-semibold text-indigo-600">{status}</span>
        </p>
        <button
          onClick={handleToggle}
          className={`px-6 py-2 rounded font-medium transition text-white ${
            status === "active"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {status === "active" ? "Cancel Subscription" : "Renew Subscription"}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionManagePage;
