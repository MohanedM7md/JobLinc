import React, { useState, FormEvent } from "react";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  existingStatus?: "Pending" | "Viewed" | "Rejected" | "Accepted" | null;
  onSubmit: (status: "Pending" | "Viewed" | "Rejected" | "Accepted") => void;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  onClose,
  companyName,
  existingStatus,
  onSubmit,
}) => {
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError("");

    const errors = [];
    if (!resume && !existingStatus) errors.push("resume");
    if (!email && !existingStatus) errors.push("email");

    if (errors.length > 0) {
      setError(errors.join(","));
      return;
    }

    onSubmit(existingStatus || "Pending");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {existingStatus ? "Application Details" : `Apply to ${companyName}`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
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

        {existingStatus ? (
          <div>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Application Status</h3>
              <div className={`inline-block px-3 py-1 rounded-full text-sm ${existingStatus === "Pending" ? "bg-yellow-100 text-yellow-800" :
                existingStatus === "Viewed" ? "bg-blue-100 text-blue-800" :
                  existingStatus === "Rejected" ? "bg-red-100 text-red-800" :
                    "bg-green-100 text-green-800"
                }`}>
                {existingStatus}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Resume</h3>
              <div className="border border-gray-300 rounded-md p-3 flex items-center">
                <svg className="w-8 h-8 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
                </svg>
                <div>
                  <p className="font-medium">Your_Resume.pdf</p>
                  <p className="text-sm text-gray-500">PDF, 1.2 MB</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Contact Information</h3>
              <p className="text-gray-700">Email: john.doe@example.com</p>
              <p className="text-gray-700">Phone: (555) 123-4567</p>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Cover Letter</h3>
              <div className="border border-gray-300 rounded-md p-3 text-gray-700">
                <p>Dear Hiring Manager,</p>
                <p className="my-2">I am writing to express my interest in the position at {companyName}. With my experience in the field, I believe I would be a great fit for your team.</p>
                <p>Thank you for considering my application.</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => onSubmit("Pending")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={existingStatus === "Pending"}
              >
                Reapply
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} data-testid="application-form">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                {error.includes("resume") && <div>Please upload your resume</div>}
                {error.includes("email") && <div>Please enter your email</div>}
              </div>
            )}

            <div className="mb-4">
              <label className="block font-medium mb-1">Resume *</label>
              <div className="border border-gray-300 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-50">
                <input
                  data-testid="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume-upload"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setResume(e.target.files[0]);
                      setError("");
                    }
                  }}
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <svg
                    className="w-10 h-10 text-gray-400 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  {resume ? (
                    <p className="text-blue-600">{resume.name}</p>
                  ) : (
                    <p>Upload your resume (PDF, DOC, DOCX)</p>
                  )}
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="coverLetter" className="block font-medium mb-1">Cover Letter</label>
              <textarea
                id="coverLetter"
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                placeholder="Write a cover letter (optional)"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="email" className="block font-medium mb-1">Email *</label>
                <input
                  id="email"
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-medium mb-1">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobApplicationModal;