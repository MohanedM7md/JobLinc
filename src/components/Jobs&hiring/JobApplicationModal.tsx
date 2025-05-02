import React, { useState, FormEvent, useEffect } from "react";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  jobId: string;
  existingStatus?: "Pending" | "Viewed" | "Rejected" | "Accepted" | null;
  // onSubmit: (status: "Pending" | "Viewed" | "Rejected" | "Accepted") => void;
  onSubmit: (
    jobId: string,
    data: { phone: string; email: string; resume: File; coverLetter?: string },
  ) => Promise<void>;
  applicationData?: {
    phone?: string;
    email?: string;
    resume?: {
      name: string;
      size: number;
    };
  };
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  onClose,
  companyName,
  jobId,
  existingStatus,
  onSubmit,
  applicationData,
}) => {
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInfo, setSubmittedInfo] = useState<{
    resumeName?: string;
    resumeSize?: number;
    email?: string;
    phone?: string;
  }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    console.log("✅ Submit clicked");

    const errors = [];
    if (!resume && !existingStatus) errors.push("resume");
    if (!email && !existingStatus) errors.push("email");
    if (!phone && !existingStatus) errors.push("phone");

    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }

    try {
      console.log("📄 Resume file:", resume);
      setIsSubmitting(true);
      await onSubmit(jobId, {
        phone,
        email,
        resume: resume as File,
        coverLetter,
      });
      localStorage.setItem(`applied-email-${jobId}`, email);
      setSubmittedInfo({
        resumeName: resume?.name,
        resumeSize: resume?.size,
        email,
        phone,
      });

      setIsSubmitting(false);
    } catch (err) {
      console.error("❌ Failed to submit application:", err);
      setError("Failed to apply. Please try again.");
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setResume(null);
    setCoverLetter("");
    setPhone("");
    setEmail("");
    setError("");
    setSubmittedInfo({});
  };

  useEffect(() => {
    if (isOpen && existingStatus) {
      const storedEmail = localStorage.getItem(`applied-email-${jobId}`);
      if (storedEmail) {
        setSubmittedInfo((prev) => ({ ...prev, email: storedEmail }));
      }
    }
  }, [isOpen, existingStatus, jobId]);
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {existingStatus
              ? "Application Details"
              : `Apply to ${companyName || "this company"}`}
          </h2>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
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
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm ${
                  existingStatus === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : existingStatus === "Viewed"
                      ? "bg-blue-100 text-blue-800"
                      : existingStatus === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                }`}
              >
                {existingStatus}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Resume</h3>
              <div className="border border-gray-300 rounded-md p-3 flex items-center">
                <svg
                  className="w-8 h-8 text-gray-400 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
                </svg>
                <div>
                  <p className="font-medium">
                    {applicationData?.resume?.name ||
                      submittedInfo.resumeName ||
                      "Your_Resume.pdf"}
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF,{" "}
                    {(
                      (applicationData?.resume?.size ??
                        submittedInfo.resumeSize ??
                        1200000) /
                      (1024 * 1024)
                    ).toFixed(1)}{" "}
                    MB
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Contact Information</h3>
              <p className="text-gray-700">
                Email: {submittedInfo.email || applicationData?.email || "john.doe@example.com"}
              </p>
              <p className="text-gray-700">
                Phone:{" "}
                {applicationData?.phone ||
                  submittedInfo.phone ||
                  "(555) 123-4567"}
              </p>
            </div>

            {/* <div className="mb-4">
              <h3 className="font-medium mb-2">Cover Letter</h3>
              <div className="border border-gray-300 rounded-md p-3 text-gray-700">
                <p>Dear Hiring Manager,</p>
                <p className="my-2">
                  I am writing to express my interest in the position at{" "}
                  {companyName}. With my experience in the field, I believe I
                  would be a great fit for your team.
                </p>
                <p>Thank you for considering my application.</p>
              </div>
            </div> */}

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              {/* <button
                onClick={async () => {
                  if (!resume || !email || !phone) {
                    setError("resume,email,phone");
                    return;
                  }
                  try {
                    await onSubmit(jobId, {
                      phone,
                      email,
                      resume,
                      coverLetter,
                    });
                  } catch (err) {
                    console.error("❌ Reapply failed:", err);
                    setError("Failed to reapply. Please try again.");
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={existingStatus === "Pending"}
              >
                Reapply
              </button> */}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} data-testid="application-form">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                {error.includes("resume") && (
                  <div>Please upload your resume</div>
                )}
                {error.includes("email") && <div>Please enter your email</div>}
                {error.includes("phone") && (
                  <div>Please enter your phone number</div>
                )}
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

            {/* <div className="mb-4">
              <label htmlFor="coverLetter" className="block font-medium mb-1">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                placeholder="Write a cover letter (optional)"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              ></textarea>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Email *
                </label>
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
                <label htmlFor="phone" className="block font-medium mb-1">
                  Phone*
                </label>
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
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-darkBurgundy text-white rounded-md hover:bg-softRosewood flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobApplicationModal;
