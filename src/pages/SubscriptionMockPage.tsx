import React, { useState } from "react";
import toast from "react-hot-toast";

const SubscriptionMockPage = () => {
  const [isSubscribed, setIsSubscribed] = useState(true);

  const handleCancel = () => {
    toast.success("Subscription cancelled!");
    setIsSubscribed(false);
  };

  const handleRenew = () => {
    toast.success("Subscription renewed!");
    setIsSubscribed(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Subscription Status
        </h1>
        <p className="text-lg text-gray-600">
          {isSubscribed
            ? "✅ You are subscribed to JobLinc Pro."
            : "❌ You have cancelled your subscription."}
        </p>

        <button
          onClick={isSubscribed ? handleCancel : handleRenew}
          className={`w-full py-2 px-4 rounded font-semibold text-white transition ${
            isSubscribed
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isSubscribed ? "Cancel Subscription" : "Renew Subscription"}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionMockPage;
