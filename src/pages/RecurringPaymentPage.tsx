// src/pages/RecurringPaymentPage.tsx
import { useState } from "react";
import toast from "react-hot-toast";
import { RecurringPaymentService } from "../services/api/RecurringPaymentService";

const RecurringPaymentPage = () => {
  const [autoRenew, setAutoRenew] = useState(true);

  const handleToggle = async () => {
    const newState = !autoRenew;
    const message = await RecurringPaymentService.toggleAutoRenew(newState);
    setAutoRenew(newState);
    toast.success(message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-lg text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Recurring Payment Settings
        </h2>
        <p className="text-gray-600">
          Auto-renew is{" "}
          <span className="font-semibold text-indigo-600">
            {autoRenew ? "enabled" : "disabled"}
          </span>
        </p>
        <button
          onClick={handleToggle}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-medium"
        >
          {autoRenew ? "Disable Auto-Renew" : "Enable Auto-Renew"}
        </button>
      </div>
    </div>
  );
};

export default RecurringPaymentPage;
