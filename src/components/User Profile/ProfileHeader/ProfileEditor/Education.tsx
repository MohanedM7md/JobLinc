import React from "react";

const Education: React.FC = () => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-2">Education</h4>
      <div className="mb-4">
        <label
          htmlFor="school"
          className="block text-sm font-medium text-charcoalBlack"
        >
          School
        </label>
        <select id="school" className="w-full p-2 border rounded-lg" required>
          <option value="">Please select</option>
          <option value="Cairo University">Cairo University</option>
          <option value="USAID scholarship">USAID scholarship</option>
        </select>
      </div>
      <a href="/add-education" className="text-crimsonRed underline">
        Add new education
      </a>
    </div>
  );
};

export default Education;
