import React, { useState, FormEvent } from "react";
import { createJob } from "@services/api/jobService";

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated?: () => void;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({ isOpen, onClose, onJobCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    industry: "",
    description: "",
    workplace: "Onsite",
    type: "Full-time",
    experienceLevel: "Freshman",
    salaryFrom: "",
    salaryTo: "",
    currency: "USD",
    address: "",
    city: "",
    country: "",
    skills: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const job = {
        title: formData.title,
        industry: formData.industry,
        description: formData.description,
        workplace: formData.workplace,
        type: formData.type,
        experienceLevel: formData.experienceLevel,
        salaryRange: {
          from: parseInt(formData.salaryFrom),
          to: parseInt(formData.salaryTo),
          currency: formData.currency,
        },
        location: {
          address: formData.address,
          city: formData.city,
          country: formData.country,
        },
        skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
      };

      await createJob(job);
      setIsSubmitting(false);
      if (onJobCreated) onJobCreated();
      onClose();
    } catch (err) {
      console.error("❌ Failed to create job:", err);
      setError("Failed to create job. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Job</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Job Title*" value={formData.title} onChange={handleChange} required className="w-full border px-3 py-2 rounded-md" />
          <input type="text" name="industry" placeholder="Industry*" value={formData.industry} onChange={handleChange} required className="w-full border px-3 py-2 rounded-md" />
          <textarea name="description" placeholder="Description*" value={formData.description} onChange={handleChange} required className="w-full border px-3 py-2 rounded-md" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="workplace" value={formData.workplace} onChange={handleChange} className="border px-3 py-2 rounded-md">
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <select name="type" value={formData.type} onChange={handleChange} className="border px-3 py-2 rounded-md">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Internship">Internship</option>
            </select>

            <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="border px-3 py-2 rounded-md">
              <option value="Freshman">Freshman</option>
              <option value="Junior">Junior</option>
              <option value="MidLevel">MidLevel</option>
              <option value="Senior">Senior</option>
            </select>

            <input type="text" name="skills" placeholder="Skills (comma-separated)*" value={formData.skills} onChange={handleChange} className="w-full border px-3 py-2 rounded-md" />

            <input type="number" name="salaryFrom" placeholder="Salary From*" value={formData.salaryFrom} onChange={handleChange} className="w-full border px-3 py-2 rounded-md" />
            <input type="number" name="salaryTo" placeholder="Salary To*" value={formData.salaryTo} onChange={handleChange} className="w-full border px-3 py-2 rounded-md" />
            <input type="text" name="currency" placeholder="Currency (USD, EGP...)" value={formData.currency} onChange={handleChange} className="w-full border px-3 py-2 rounded-md" />
          </div>

          <input type="text" name="address" placeholder="Address*" value={formData.address} onChange={handleChange} className="w-full border px-3 py-2 rounded-md" />
          <input type="text" name="city" placeholder="City*" value={formData.city} onChange={handleChange} className="w-full border px-3 py-2 rounded-md" />
          <input type="text" name="country" placeholder="Country*" value={formData.country} onChange={handleChange} className="w-full border px-3 py-2 rounded-md" />

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded-md hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="bg-darkBurgundy text-white px-4 py-2 rounded-md hover:bg-softRosewood flex items-center">
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                </svg>
              ) : (
                "Create Job"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
