import React from "react";

const CurrentPosition: React.FC = () => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-2">Current position</h4>
      <a href="/add-position" className="text-crimsonRed underline">
        Add new position
      </a>
      <div className="mt-4">
        <label
          htmlFor="industry"
          className="block text-sm font-medium text-charcoalBlack"
        >
          Industry
        </label>
        <input
          type="text"
          id="industry"
          className="w-full p-2 border rounded-lg"
          placeholder="Ex: Retail"
          required
        />
      </div>
    </div>
  );
};

export default CurrentPosition;
