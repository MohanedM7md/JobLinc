import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SubscriptionLandingPage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("subscribed") === "true";
    setIsSubscribed(status);
  }, []);

  return (
    <section className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Upgrade to <span className="text-[#E60023]">JobLinc Premium</span>
          </h1>
          <p className="text-lg text-gray-600">
            Reach recruiters faster, unlock career insights, and become a
            top-tier professional in your field.
          </p>

          <ul className="space-y-3 text-gray-700 text-base">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✔</span>
              Direct message hiring managers with unlimited InMails
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✔</span>
              See who’s viewed your profile in the last 90 days
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✔</span>
              Get 5x more visibility in job searches
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✔</span>
              Access detailed salary insights and skill trends
            </li>
          </ul>

          {!isSubscribed ? (
            <Link
              to="/payment"
              className="inline-block bg-[#E60023] hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full text-lg transition"
            >
              Upgrade Now
            </Link>
          ) : (
            <Link
              to="/subscription"
              className="inline-block border border-gray-500 text-gray-800 font-semibold py-3 px-6 rounded-full text-lg hover:bg-gray-100 transition"
            >
              Manage Subscription
            </Link>
          )}
        </div>

        {/* Right Side - Image */}
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1624298357595-1b5adf204c33?auto=format&fit=crop&w=1050&q=80"
            alt="Professional man in a suit"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default SubscriptionLandingPage;
