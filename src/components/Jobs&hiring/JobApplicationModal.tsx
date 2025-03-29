import React, { useState, useEffect, ChangeEvent } from "react";
import ReactDOM from "react-dom";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  resume: File | null;
}

interface FormErrors {
  [key: string]: string;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ isOpen, onClose, companyName }) => {
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("jobApplicationData");
    return savedData
      ? JSON.parse(savedData)
      : {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          gender: "",
          resume: null,
        };
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    // We need to create a serializable version of the form data for storage
    const serializableData = {...formData};
    if (formData.resume) {
      // Store only the file name for localStorage since File objects can't be serialized
      (serializableData as any).resume = { name: formData.resume.name };
    }
    localStorage.setItem("jobApplicationData", JSON.stringify(serializableData));
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        resume: file,
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        resume: "",
      }));
    }
  };

  const handleNext = (): void => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      if (!value) {
        newErrors[key] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Proceeding and closing modal:", formData);
      onClose();
      window.location.href = "/"; // Redirect to home
    }
  };

  const calculateProgress = (): number => {
    const filledFields = Object.values(formData).filter(
      (value) => value
    ).length;
    return (filledFields / Object.keys(formData).length) * 100;
  };

  if (!isOpen) return null;

  // Ensure the modal root element exists
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    console.error("Modal root element not found");
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Apply to {companyName}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div className="w-full bg-gray-200 h-2">
            <div
              className="bg-blue-600 h-2"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Contact Info</h3>
            <div className="space-y-4">
              {["firstName", "lastName", "phoneNumber", "email"].map(
                (field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      *
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={`Enter your ${field}`}
                      value={formData[field as keyof FormData] as string}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors[field] ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                )
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender*
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume*
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.resume && (
                  <p className="text-sm text-gray-600 mt-1">
                    Uploaded: {formData.resume.name}
                  </p>
                )}
                {errors.resume && (
                  <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
                )}
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default JobApplicationModal;