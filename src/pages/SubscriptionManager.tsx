import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { FaRegCreditCard, FaCalendarAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const SubscriptionManager = () => {
  const [subscription, setSubscription] = useState({
    type: "JobLinc Premium",
    price: 9.99,
    cycle: "month",
    startDate: "2024-05-01",
    endDate: "2025-05-01",
    autoRenew: true,
    paymentMethod: "Mastercard •••• 7590",
  });

  const handleCancel = () => {
    toast.success("Subscription cancelled.");
    setSubscription((prev) => ({
      ...prev,
      endDate: new Date().toISOString().split("T")[0],
      autoRenew: false,
    }));
  };

  const toggleRenew = () => {
    toast.success(
      subscription.autoRenew ? "Auto-renew disabled." : "Auto-renew enabled.",
    );
    setSubscription((prev) => ({ ...prev, autoRenew: !prev.autoRenew }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Manage Your Subscription
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700">
              Current Plan
            </h2>
            <div className="bg-gray-50 p-4 rounded border">
              <p className="text-gray-800 text-xl font-semibold">
                {subscription.type}
              </p>
              <p className="text-gray-500">
                ${subscription.price} / {subscription.cycle}
              </p>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <FaCalendarAlt className="text-gray-500" />
                <span>Start: {subscription.startDate}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaCalendarAlt className="text-gray-500" />
                <span>End: {subscription.endDate}</span>
              </div>
            </div>

            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              <MdCancel size={20} /> Cancel Subscription
            </button>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700">
              Billing Info
            </h2>
            <div className="bg-gray-50 p-4 rounded border space-y-2">
              <div className="flex items-center gap-2">
                <FaRegCreditCard className="text-gray-500" />
                <span>{subscription.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-700 font-medium">Auto-Renew</span>
                <Switch
                  checked={subscription.autoRenew}
                  onChange={toggleRenew}
                  className={`${
                    subscription.autoRenew ? "bg-green-500" : "bg-gray-300"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-all`}
                >
                  <span
                    className={`${
                      subscription.autoRenew ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;
