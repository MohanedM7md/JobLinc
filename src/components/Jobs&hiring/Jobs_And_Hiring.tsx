import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import JobApplicationModal from "./JobApplicationModal";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { fetchJobs, uploadResume, applyToJob } from "@services/api/jobService";

export interface Job {
  id: string;
  title: string;
  company?: {
    name: string;
    logo?: string;
  };
  location?: {
    city: string;
    country: string;
  };
  description?: string;
  remote?: boolean;
  type?: string;
  experienceLevel?: string;
  salaryRange?: {
    from: number;
    to: number;
    currency: string;
  };
  highlights?: string[];
  applicants?: number;
  postedDate?: string;
  applicationStatus?: "Pending" | "Viewed" | "Rejected" | "Accepted" | null;
}

interface FilterOptions {
  datePosted: string;
  experienceLevel: string;
  jobType: string;
  remote: boolean;
}

interface SaveApplyProps {
  jobTitle?: string;
  companyName?: string;
}

// const getJobs = async (searchTerm = "", location = ""): Promise<Job[]> => {
//   try {
//     const params: any = {};
//     if (searchTerm) params.search = searchTerm;
//     if (location) params.search_location = location;

//     const response = await axios.get("http://localhost:3000/api/jobs", { params });
//     console.log("Mazen Fetched jobs:", response.data);
//     const jobsData = Array.isArray(response.data) ? response.data : [response.data];
//     return jobsData.map((job: any) => ({
//       ...job,
//       postedDate: job.createdAt?.split("T")[0],
//       highlights: job.skills || [],
//       remote: job.workplace === "Remote",
//     }));
//   } catch (error) {
//     console.error("Failed to fetch jobs:", error);
//     return [];
//   }
// };

//@ts-ignore
const Jobs_And_Hiring: React.FC<SaveApplyProps> = ({
  jobTitle,
  companyName,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [filters, setFilters] = useState<FilterOptions>({
    datePosted: "any",
    experienceLevel: "any",
    jobType: "any",
    remote: false,
  });
  const [isSaved, setIsSaved] = useState(false);
  const hasApplied = !!selectedJob?.applicationStatus;

  useEffect(() => {
    const fetchAllJobs = async () => {
      const fetchedJobs = await fetchJobs();
      setJobs(fetchedJobs);
      if (fetchedJobs.length > 0) {
        setSelectedJob(fetchedJobs[0]);
      }
    };
    fetchAllJobs();
  }, []);

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchedJobs = await fetchJobs(searchTerm, location);
    setJobs(searchedJobs);
    if (searchedJobs.length > 0) {
      setSelectedJob(searchedJobs[0]);
    } else {
      setSelectedJob(null);
    }
  };

  const handleFilterChange = (filterName: string, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleApplyClick = () => setShowModal(true);

  const handleApplicationSubmit = async (
    jobId: string,
    {
      phone,
      email,
      resume,
      coverLetter,
    }: { phone: string; email: string; resume: File; coverLetter?: string }
  ) => {
    try {
      const resumeResponse = await uploadResume(resume);
      console.log("📄 Resume upload response:", resumeResponse);
  
      const resumeId = resumeResponse?.id;
      if (!resumeId) {
        toast.error("Resume upload failed. Please try again.");
        return;
      }
  
      const applicationResponse = await applyToJob(jobId, phone, resumeId);
  
      // ✅ Success case
      console.log("✅ Application successful:", applicationResponse);
      toast.success("✅ Successfully applied for the job!");
  
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, applicationStatus: "Pending" } : job
        )
      );
      setSelectedJob((prev) =>
        prev?.id === jobId ? { ...prev, applicationStatus: "Pending" } : prev
      );
  
      setShowModal(false);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      const errorCode = error?.response?.data?.errorCode;
  
      console.error("❌ Application error:", error);
  
      // 🔀 Match based on known backend messages/codes
      if (message === "User has already applied for this job" && errorCode === 400) {
        toast.error("You have already applied for this job.");
      } else if (message === "This job is not accepting more applicants" && errorCode === 403) {
        toast.error("This job is no longer accepting applications.");
      } else if (message === "This job is not found" && errorCode === 404) {
        toast.error("The job you are trying to apply for was not found.");
      } else if (message === "Employers can't apply for their jobs" && errorCode === 400) {
        toast.error("Employers are not allowed to apply to their own jobs.");
      } else {
        // fallback
        toast.error(message || "An unexpected error occurred. Please try again.");
      }
    }
  };
  
  

  const getStatusColor = (status: string | null | undefined) => {
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

  const handleSaveClick = () => {
    if (!isSaved) {
      setIsSaved(true);
      toast.success(
        <div>
          You've saved this job.{" "}
          <Link to="/saved-jobs" className="text-blue-600 underline">
            See saved jobs
          </Link>
        </div>,
        { duration: 10000 },
      );
    } else {
      setIsSaved(false);
      toast.success("This job is no longer saved", { duration: 10000 });
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (filters.remote && !job.remote) return false;

    if (filters.datePosted !== "any" && job.postedDate) {
      const daysAgoLimit =
        { day: 1, week: 7, month: 30 }[filters.datePosted] ?? Infinity;
      const postedDate = new Date(job.postedDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - postedDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > daysAgoLimit) return false;
    }

    if (
      filters.experienceLevel !== "any" &&
      job.experienceLevel?.toLowerCase() !== filters.experienceLevel
    ) {
      return false;
    }

    if (
      filters.jobType !== "any" &&
      job.type?.toLowerCase() !== filters.jobType
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-warmWhite">
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6 text-darkBurgundy">
          Find your next job
        </h1>
        <button className="bg-softRosewood hover:bg-crimsonRed text-white px-6 py-3 rounded-md mb-5">
          Create New Job
        </button>

        <form onSubmit={handleSearchSubmit} className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search job titles, companies, or keywords"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="md:w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={location}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLocation(e.target.value)
                  }
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-softRosewood hover:bg-crimsonRed text-white px-6 py-3 rounded-md"
            >
              Search
            </button>
          </div>
        </form>

        <div className="bg-white p-4 rounded-md shadow-sm mb-6">
          <h2 className="font-semibold mb-2">Filters</h2>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm text-charcoalBlack mb-1">
                Date Posted
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={filters.datePosted}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange("datePosted", e.target.value)
                }
              >
                <option value="any">Any time</option>
                <option value="day">Past 24 hours</option>
                <option value="week">Past week</option>
                <option value="month">Past month</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Experience Level
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={filters.experienceLevel}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange("experienceLevel", e.target.value)
                }
              >
                <option value="any">Any level</option>
                <option value="junior">Junior</option>
                <option value="midlevel">Mid-level</option>
                <option value="senior">Senior</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Job Type
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={filters.jobType}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange("jobType", e.target.value)
                }
              >
                <option value="any">Any type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600"
                  checked={filters.remote}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFilterChange("remote", e.target.checked)
                  }
                />
                <span className="ml-2">Remote</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5">
            <h2 className="font-semibold mb-4 text-darkBurgundy">
              Jobs for you
            </h2>
            <div
              className="bg-white rounded-md shadow-sm"
              data-testid="job-listings-container"
            >
              {filteredJobs.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No jobs found.
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-4 border-b border-gray-200 hover:bg-blue-50 cursor-pointer ${
                      selectedJob?.id === job.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex">
                      <img
                        src={job.company?.logo || "/default-logo.png"}
                        alt={job.company?.name}
                        className="w-12 h-12 rounded-md mr-4"
                      />
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-darkBurgundy">
                            {job.title}
                          </h3>
                          {job.applicationStatus && (
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${getStatusColor(job.applicationStatus)}`}
                            >
                              {job.applicationStatus}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-800">{job.company?.name}</p>
                        <p className="text-gray-600 text-sm">
                          {job.location?.city}, {job.location?.country}{" "}
                          {job.remote && "(Remote)"}
                        </p>
                        <div className="flex text-gray-500 text-xs mt-2">
                          <span>{job.postedDate}</span>
                          <span className="mx-2">•</span>
                          <span>{job.applicants ?? 0} applicants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:w-3/5">
            <div className="bg-white rounded-md shadow-sm p-6">
              {selectedJob ? (
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex">
                      <img
                        src={selectedJob.company?.logo || "/default-logo.png"}
                        alt={selectedJob.company?.name}
                        className="w-16 h-16 rounded-md mr-4"
                      />
                      <div>
                        <h2 className="text-xl text-darkBurgundy font-semibold">
                          {selectedJob.title}
                        </h2>
                        <p className="text-gray-800">
                          {selectedJob.company?.name}
                        </p>
                        <p className="text-gray-600">
                          {selectedJob.location?.city},{" "}
                          {selectedJob.location?.country}{" "}
                          {selectedJob && selectedJob.remote && "(Remote)"}
                        </p>
                        <div className="flex text-gray-500 text-sm mt-1">
                          <span>{selectedJob && selectedJob.postedDate}</span>
                          <span className="mx-2">•</span>
                          <span>{selectedJob.applicants ?? 0} applicants</span>
                        </div>
                      </div>
                    </div>
                    {selectedJob && selectedJob.applicationStatus && (
                      <div
                        className={`px-3 py-1 rounded-md ${getStatusColor(selectedJob.applicationStatus)}`}
                      >
                        {selectedJob.applicationStatus}
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    {!hasApplied ? (
                      <div className="flex items-center space-x-2">
                        <button
                          className="bg-softRosewood hover:bg-crimsonRed text-white px-4 py-2 rounded-full"
                          onClick={handleApplyClick}
                        >
                          Apply now
                        </button>
                        <button
                          onClick={handleSaveClick}
                          className={`px-4 py-2 rounded-full border ${
                            isSaved
                              ? "text-crimsonRed border-softRosewood bg-hoverSoftRed cursor-default"
                              : "bg-white text-crimsonRed border-softRosewood hover:bg-hoverSoftRed"
                          }`}
                        >
                          {isSaved ? "Saved" : "Save"}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-700 mb-2">
                          Your application status:{" "}
                          <strong>
                            {selectedJob && selectedJob.applicationStatus}
                          </strong>
                        </p>
                        <div className="flex items-center space-x-2">
                          <button
                            className="bg-softRosewood hover:bg-crimsonRed text-white px-4 py-2 rounded-full"
                            onClick={() => {
                              if (selectedJob) {
                                setShowModal(true);
                              } else {
                                toast.error("No job selected");
                              }
                            }}
                            
                          >
                            View application
                          </button>
                          <button
                            onClick={handleSaveClick}
                            className={`px-4 py-2 rounded-full border ${
                              isSaved
                                ? "text-crimsonRed border-softRosewood bg-hoverSoftRed cursor-default"
                                : "bg-white text-crimsonRed border-softRosewood hover:bg-hoverSoftRed"
                            }`}
                          >
                            {isSaved ? "Saved" : "Save"}
                          </button>
                        </div>
                      </div>
                    )}

                    <JobApplicationModal
                      isOpen={showModal}
                      onClose={() => setShowModal(false)}
                      companyName={selectedJob.company?.name || ""}
                      jobId={selectedJob?.id || ""}
                      existingStatus={selectedJob?.applicationStatus}
                      onSubmit={handleApplicationSubmit}
                    />
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Job description</h3>
                    <p className="text-gray-700">{selectedJob.description}</p>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Job highlights</h3>
                    <ul className="list-disc pl-5">
                      {selectedJob.highlights?.length ? (
                        selectedJob.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))
                      ) : (
                        <li>No highlights available.</li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Application Timeline</h3>
                    {selectedJob && selectedJob.applicationStatus ? (
                      <div className="mt-4 relative">
                        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

                        <div className="relative flex items-start mb-6">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              selectedJob.applicationStatus !== null
                                ? "bg-green-500"
                                : "bg-gray-300"
                            } text-white z-10`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg font-medium">
                              Application Submitted
                            </h4>
                            <p className="text-gray-500">
                              Your application was submitted successfully
                            </p>
                            <p className="text-gray-500 text-sm">
                              April 10, 2025
                            </p>
                          </div>
                        </div>

                        <div className="relative flex items-start mb-6">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              ["Viewed", "Rejected", "Accepted"].includes(
                                selectedJob.applicationStatus || "",
                              )
                                ? "bg-green-500"
                                : "bg-gray-300"
                            } text-white z-10`}
                          >
                            {["Viewed", "Rejected", "Accepted"].includes(
                              selectedJob.applicationStatus || "",
                            ) ? (
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            ) : (
                              <span className="text-xs">2</span>
                            )}
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg font-medium">
                              Application Viewed
                            </h4>
                            <p className="text-gray-500">
                              Recruiter has reviewed your application
                            </p>
                            {["Viewed", "Rejected", "Accepted"].includes(
                              selectedJob.applicationStatus || "",
                            ) && (
                              <p className="text-gray-500 text-sm">
                                April 12, 2025
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="relative flex items-start">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              ["Rejected", "Accepted"].includes(
                                selectedJob.applicationStatus || "",
                              )
                                ? "bg-green-500"
                                : "bg-gray-300"
                            } text-white z-10`}
                          >
                            {["Rejected", "Accepted"].includes(
                              selectedJob.applicationStatus || "",
                            ) ? (
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            ) : (
                              <span className="text-xs">3</span>
                            )}
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg font-medium">
                              Decision Made
                            </h4>
                            <p className="text-gray-500">
                              {selectedJob.applicationStatus === "Accepted" &&
                                "Congratulations! Your application has been accepted."}
                              {selectedJob.applicationStatus === "Rejected" &&
                                "Your application was not selected at this time."}
                              {!["Rejected", "Accepted"].includes(
                                selectedJob.applicationStatus || "",
                              ) && "Waiting for decision"}
                            </p>
                            {["Rejected", "Accepted"].includes(
                              selectedJob.applicationStatus || "",
                            ) && (
                              <p className="text-gray-500 text-sm">
                                April 14, 2025
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        You haven't applied to this job yet.
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Similar jobs</h3>
                    <div className="flex flex-wrap gap-2">
                      {jobs
                        .filter((job) => job.id !== selectedJob?.id)
                        .slice(0, 3)
                        .map((job) => (
                          <div
                            key={job.id}
                            className="p-3 border border-gray-200 rounded-md w-full md:w-64 cursor-pointer"
                            onClick={() => setSelectedJob(job)}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-darkBurgundy">
                                {job.title}
                              </h4>
                              {job.applicationStatus && (
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${getStatusColor(job.applicationStatus)}`}
                                >
                                  {job.applicationStatus}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-800">{job.company?.name}</p>
                            <p className="text-gray-600 text-sm">
                              {selectedJob.location?.city},{" "}
                              {selectedJob.location?.country}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 py-10">
                  Select a job to see details.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-6 border-t border-gray-200">
        {/* <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-blue-600 font-bold">in</div>
                        <div className="text-gray-500 text-sm">
                            &copy; 2025 LinkedIn Clone
                        </div>
                    </div>
                </div> */}
      </footer>
    </div>
  );
};

export default Jobs_And_Hiring;
