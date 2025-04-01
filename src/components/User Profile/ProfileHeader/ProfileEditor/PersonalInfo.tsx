import React from "react";

const PersonalInfo: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-charcoalBlack"
        >
          First name
        </label>
        <input
          type="text"
          id="firstName"
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-charcoalBlack"
        >
          Last name
        </label>
        <input
          type="text"
          id="lastName"
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="additionalName"
          className="block text-sm font-medium text-charcoalBlack"
        >
          Additional name
        </label>
        <input
          type="text"
          id="additionalName"
          className="w-full p-2 border rounded-lg"
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
