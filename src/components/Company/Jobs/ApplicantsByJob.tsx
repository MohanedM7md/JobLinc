import React, { useEffect, useState } from "react";
import { fetchJobApplications, updateJobApplicationStatus } from "@services/api/jobService";

interface Props {
  jobId: string;
}

const ApplicantsByJob: React.FC<Props> = ({ jobId }) => {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const data = await fetchJobApplications(jobId);
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applicants", error);
      }
    };
    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (
    applicationId: string,
    newStatus: "Viewed" | "Accepted" | "Rejected"
  ) => {
    try {
      await updateJobApplicationStatus(jobId, applicationId, newStatus);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Failed to update application status", error);
    }
  };

  const statusClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Viewed":
        return "bg-blue-100 text-blue-800";
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  if (applications.length === 0) {
    return <p className="text-gray-500">No applicants for this job yet.</p>;
  }

  return (
    <div className="space-y-5">
      {applications.map((app) => (
        <div key={app.id} className="border p-4 rounded bg-white shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {app.applicant.firstname} {app.applicant.lastname}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${statusClass(app.status)}`}
            >
              {app.status}
            </span>
          </div>
          <p>Email: {app.applicant.email}</p>
          <p>Phone: {app.phone}</p>
          <p>
            Location: {app.applicant.city}, {app.applicant.country}
          </p>
          <a
            href={app.resume.file}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
          <p className="text-sm text-gray-500">
            Applied on: {new Date(app.createdAt).toLocaleString()}
          </p>
          {!["Accepted", "Rejected"].includes(app.status) && (
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleStatusChange(app.id, "Viewed")}
                className="px-2 py-1 rounded bg-blue-100 text-blue-800"
              >
                Mark as Viewed
              </button>
              <button
                onClick={() => handleStatusChange(app.id, "Accepted")}
                className="px-2 py-1 rounded bg-green-100 text-green-800"
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusChange(app.id, "Rejected")}
                className="px-2 py-1 rounded bg-red-100 text-red-800"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ApplicantsByJob;
