// import React, { useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { PaymentService } from "../../services/api/PaymentService";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [message, setMessage] = useState("");
//   const [cardType, setCardType] = useState("default");
//   const [saveCard, setSaveCard] = useState(false);
//   const [receiptEmail, setReceiptEmail] = useState("");

//   const handleChange = (event: any) => {
//     setCardType(event.brand); // Stripe gives 'visa', 'mastercard', etc.
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     if (!receiptEmail || !receiptEmail.includes("@")) {
//       toast.error("Please enter a valid email.");
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       await PaymentService.createPaymentIntent();

//       toast.success("✅ Payment successful!");
//       setMessage("✅ Payment successful!");

//       setTimeout(() => {
//         navigate("/thank-you");
//       }, 2000);
//     } catch (err) {
//       setMessage("❌ Failed to connect to payment service.");
//       toast.error("❌ Payment failed. Try again.");
//     }

//     setIsProcessing(false);
//   };

//   const cardIcons: Record<string, string> = {
//     visa: "💳 Visa",
//     mastercard: "💳 MasterCard",
//     default: "💳 Card",
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-200"
//     >
//       <h2 className="text-xl font-semibold text-black">Payment Details</h2>

//       {/* Transaction Summary */}
//       <div className="mb-2 text-sm text-gray-600 border p-4 rounded shadow-sm bg-gray-50">
//         <div className="flex justify-between">
//           <span>Plan:</span>
//           <strong>JobLinc Premium</strong>
//         </div>
//         <div className="flex justify-between mt-1">
//           <span>Amount:</span>
//           <strong>$49.99 USD</strong>
//         </div>
//       </div>

//       {/* Card Type Icon */}
//       <div className="text-sm text-gray-500 italic">
//         {cardIcons[cardType] || cardIcons.default}
//       </div>

//       {/* Card Input */}
//       <div className="border border-gray-300 rounded p-3 bg-gray-50">
//         <CardElement
//           onChange={handleChange}
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#1a1a1a",
//                 "::placeholder": {
//                   color: "#9ca3af",
//                 },
//               },
//               invalid: {
//                 color: "#E60023",
//               },
//             },
//           }}
//         />
//       </div>

//       {/* Email Receipt */}
//       <div className="flex flex-col">
//         <label htmlFor="email" className="text-sm font-medium text-gray-700">
//           Email for receipt
//         </label>
//         <input
//           type="email"
//           placeholder="example@email.com"
//           className="mt-1 px-3 py-2 border border-gray-300 rounded text-sm"
//           value={receiptEmail}
//           onChange={(e) => setReceiptEmail(e.target.value)}
//         />
//       </div>

//       {/* Save card */}
//       <label className="inline-flex items-center text-sm">
//         <input
//           type="checkbox"
//           className="mr-2"
//           checked={saveCard}
//           onChange={() => setSaveCard(!saveCard)}
//         />
//         Save card for later
//       </label>

//       {/* Test Card Info */}
//       <div className="text-xs text-gray-500 mt-1 italic">
//         💡 Use test card: <code>4242 4242 4242 4242</code> | Any future date |
//         Any CVC
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={!stripe || isProcessing}
//         className={`w-full py-2 px-4 rounded text-white font-medium transition flex items-center justify-center ${
//           isProcessing ? "bg-gray-500" : "bg-[#E60023] hover:bg-red-700"
//         }`}
//       >
//         {isProcessing && (
//           <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
//         )}
//         {isProcessing ? "Processing..." : "Pay Now"}
//       </button>

//       {/* Inline Message */}
//       {message && (
//         <p
//           className={`text-sm font-medium ${
//             message.includes("✅")
//               ? "text-green-600"
//               : message.includes("❌")
//                 ? "text-red-600"
//                 : "text-blue-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}
//     </form>
//   );
// };

// export default PaymentForm;
