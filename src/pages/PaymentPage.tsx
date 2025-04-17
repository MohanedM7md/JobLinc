import React from "react";
import PaymentForm from "../components/Payment/PaymentForm";

const PaymentPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-[#E60023] text-center mb-6">
          Secure Checkout
        </h1>

        {/* Billing Summary */}
        <div className="mb-6 border p-4 rounded bg-gray-50 shadow-sm text-sm text-gray-700">
          <h3 className="text-lg font-semibold mb-2 text-black">
            Billing Summary
          </h3>
          <div className="flex justify-between mb-1">
            <span>Plan:</span>
            <span>JobLinc Premium</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Billing Cycle:</span>
            <span>Monthly</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total:</span>
            <span>$49.99</span>
          </div>
        </div>

        {/* Payment Form */}
        <PaymentForm />
      </div>
    </div>
  );
};

export default PaymentPage;
