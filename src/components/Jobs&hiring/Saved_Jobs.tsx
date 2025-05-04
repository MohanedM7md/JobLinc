import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Job } from "../Jobs&hiring/Jobs_And_Hiring";
import {
  fetchSavedJobs,
  fetchMyApplications,
  fetchJobApplications,
  fetchJobs,
  updateJobApplicationStatus,
} from "@services/api/jobService";
import { useAppSelector } from "@store/hooks";

const JobTabs = ["Saved", "Applied", "View Applicants"] as const;

const SavedJobs: React.FC = () => {
  const userprofile = useAppSelector((state) => state.user.profilePicture);
  const userId = useAppSelector((state) => state.user.userId);

  const [selectedTab, setSelectedTab] = useState("Saved");
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);

  const allowedStatuses = [
    "Pending",
    "Viewed",
    "Rejected",
    "Accepted",
  ] as const;
  type StatusType = (typeof allowedStatuses)[number];

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Viewed":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Accepted":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };

  const handleStatusChange = async (
    jobId: string,
    appId: string,
    newStatus: StatusType,
  ) => {
    try {
      await updateJobApplicationStatus(jobId, appId, newStatus);
      const updatedApplications = applications.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app,
      );
      setApplications(updatedApplications);
    } catch (err) {
      console.error("Failed to update application status", err);
    }
  };

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const saved = await fetchSavedJobs();
        const applied = await fetchMyApplications();

        const appliedJobsMapped: Job[] = applied.map((app: any) => ({
          ...app.job,
          createdAt: app.createdAt,
          accepting: app.job.accepting,
          easyApply: true,
          applicationStatus: app.status,
        }));

        setSavedJobs(saved);
        setAppliedJobs(appliedJobsMapped);
      } catch (error) {
        console.error("Failed to load saved jobs:", error);
      }
    };
    loadJobs();
  }, []);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const allJobs = await fetchJobs();
        const posted = allJobs.filter((job) => job.employer?.id === userId);
        setPostedJobs(posted);
        const allApplications = await Promise.all(
          posted.map((job) => fetchJobApplications(job.id)),
        );
        setApplications(allApplications.flat());
      } catch (err) {
        console.error("Failed to fetch applicants:", err);
      }
    };

    if (selectedTab === "View Applicants") {
      fetchApplicants();
    }
  }, [selectedTab, userId]);

  return (
    <div className="min-h-screen bg-warmWhite">
      <div className="flex items-start justify-center p-6">
        <aside className="inline-block bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2 2v12l6-4.5L14 14V2z" />
            </svg>
            My items
          </h2>

          <Link
            to="/saved-jobs"
            onClick={() => setSelectedTab("Saved")}
            className={`flex items-center justify-between font-medium border-l-4 pl-2 py-2 mb-2 ${
              selectedTab === "Saved"
                ? "text-crimsonRed border-crimsonRed"
                : "text-gray-600 border-transparent"
            }`}
          >
            My Saved jobs <span className="ml-6">{savedJobs.length}</span>
          </Link>

          <Link
            to="/saved-jobs"
            onClick={() => setSelectedTab("Applied")}
            className={`flex items-center justify-between font-medium border-l-4 pl-2 py-2 mb-2 ${
              selectedTab === "Applied"
                ? "text-crimsonRed border-crimsonRed"
                : "text-gray-600 border-transparent"
            }`}
          >
            My Applied jobs <span className="ml-6">{appliedJobs.length}</span>
          </Link>

          <Link
            to="/saved-jobs"
            onClick={() => setSelectedTab("View Applicants")}
            className={`flex items-center justify-between font-medium border-l-4 pl-2 py-2 ${
              selectedTab === "View Applicants"
                ? "text-crimsonRed border-crimsonRed"
                : "text-gray-600 border-transparent"
            }`}
          >
            View My Applicants
          </Link>
        </aside>

        <main className="ml-6 w-1/2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-semibold mb-4 text-darkBurgundy">
              My Jobs
            </h1>

            <div className="flex space-x-3 mb-6">
              {JobTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-1 rounded-full border ${selectedTab === tab ? "bg-softRosewood text-white" : "bg-gray-100 text-gray-700"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <ul className="space-y-7">
              {selectedTab === "Saved" &&
                savedJobs.map((job) => (
                  <li key={job.id} className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <img
                        src={
                          job.company?.logo ??
                          userprofile ??
                          "/default-logo.png"
                        }
                        alt={job.company?.name}
                        className="h-12 w-12 rounded"
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-charcoalBlack">
                          {job.title}
                        </h3>
                        <p className="text-mutedSilver">{job.company?.name}</p>
                        <p className="text-sm text-mutedSilver">
                          {job.location?.city + ", " + job.location?.country}
                          {job.workplace ? ` (${job.workplace})` : ""}
                        </p>
                        <div className="flex flex-wrap text-sm text-mutedSilver gap-2 mt-1">
                          {job.accepting && (
                            <>
                              <span className="text-softRosewood flex items-center">
                                <i className="fa-solid fa-check"></i>
                              </span>
                              <span className="text-softRosewood flex items-center">
                                Actively recruiting
                              </span>
                            </>
                          )}
                          <span>
                            {job.createdAt
                              ? new Date(job.createdAt).toLocaleDateString()
                              : "Unknown date"}
                          </span>
                          {job.easyApply && (
                            <span className="text-softRosewood">
                              LinkedIn Easy Apply
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}

              {selectedTab === "Applied" &&
                appliedJobs.map((job) => (
                  <li key={job.id} className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <img
                        src={
                          job.company?.logo ??
                          userprofile ??
                          "/default-logo.png"
                        }
                        alt={job.company?.name}
                        className="h-12 w-12 rounded"
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-charcoalBlack">
                          {job.title}
                        </h3>
                        <p className="text-mutedSilver">{job.company?.name}</p>
                        <p className="text-sm text-mutedSilver">
                          {job.location?.city + ", " + job.location?.country}
                          {job.workplace ? ` (${job.workplace})` : ""}
                        </p>
                        <div className="flex flex-wrap text-sm text-mutedSilver gap-2 mt-1">
                          {job.accepting && (
                            <>
                              <span className="text-softRosewood flex items-center">
                                <i className="fa-solid fa-check"></i>
                              </span>
                              <span className="text-softRosewood flex items-center">
                                Actively recruiting
                              </span>
                            </>
                          )}
                          <span>
                            {job.createdAt
                              ? new Date(job.createdAt).toLocaleDateString()
                              : "Unknown date"}
                          </span>
                          {job.easyApply && (
                            <span className="text-softRosewood">
                              LinkedIn Easy Apply
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {job.applicationStatus && (
                      <span
                        className={`ml-2 text-xs font-medium px-3 py-1 rounded ${getStatusColor(job.applicationStatus)}`}
                      >
                        {job.applicationStatus}
                      </span>
                    )}
                  </li>
                ))}

              {selectedTab === "View Applicants" &&
                (applications.length === 0 ? (
                  <p>No applicants found for your jobs.</p>
                ) : (
                  applications.map((application) => {
                    const relatedJob = postedJobs.find(
                      (job) => job.id === application.job,
                    );
                    return (
                      <li
                        key={application.id}
                        className="border p-4 rounded-lg bg-white shadow-sm"
                      >
                        <h3 className="text-lg font-semibold">
                          {application.applicant.firstname}{" "}
                          {application.applicant.lastname}
                        </h3>
                        <p>Applied to: {relatedJob?.title || "Unknown Job"}</p>
                        <p>
                          Company: {relatedJob?.employer?.firstname}{" "}
                          {relatedJob?.employer?.lastname}
                        </p>
                        <p>Email: {application.applicant.email}</p>
                        <p>Phone: {application.phone}</p>
                        <p>
                          Location: {application.applicant.city},{" "}
                          {application.applicant.country}
                        </p>
                        <a
                          href={application.resume?.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Resume
                        </a>
                        <p>Status: {application.status}</p>
                        <div className="flex gap-2 mt-2">
                          {application.status !== "Rejected" &&
                            application.status !== "Accepted" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleStatusChange(
                                      application.job,
                                      application.id,
                                      "Viewed",
                                    )
                                  }
                                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded"
                                >
                                  Mark as Viewed
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusChange(
                                      application.job,
                                      application.id,
                                      "Accepted",
                                    )
                                  }
                                  className="px-2 py-1 bg-green-100 text-green-800 rounded"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusChange(
                                      application.job,
                                      application.id,
                                      "Rejected",
                                    )
                                  }
                                  className="px-2 py-1 bg-red-100 text-red-800 rounded"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                        </div>
                        <p>
                          Applied on:{" "}
                          {new Date(application.createdAt).toLocaleString()}
                        </p>
                      </li>
                    );
                  })
                ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SavedJobs;
