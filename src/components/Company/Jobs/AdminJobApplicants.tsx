import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import CreateJobModal from "../../Jobs&hiring/CreateJobModal";
import toast from "react-hot-toast";
import { useAppSelector } from "../../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchJobs,
  uploadResume,
  applyToJob,
  saveJob,
  unsaveJob,
  fetchSavedJobs,
  fetchCompanyJobs,
} from "@services/api/jobService";
import { useCompanyStore } from "@store/comapny/companyStore";
import ApplicantsByJob from "./ApplicantsByJob";

export interface Job {
  id: string;
  title: string;
  industry?: string;
  company?: {
    id?: string;
    name: string;
    logo?: string;
    urlSlug?: string;
    size?: string;
    industry?: string;
    overview?: string;
    followers?: number;
  };
  location?: {
    id?: string;
    address?: string;
    city: string;
    country: string;
  };
  description?: string;
  remote?: boolean;
  workplace?: string;
  type?: string;
  experienceLevel?: string;
  salaryRange?: {
    id?: string;
    from: number;
    to: number;
    currency: string;
  };
  skills?: string[];
  highlights?: string[];
  applicants?: number;
  applicationStatus?: "Pending" | "Viewed" | "Rejected" | "Accepted" | null;
  postedDate?: string;
  createdAt?: string;
  accepting?: boolean;
  easyApply?: true;
  employer?: {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    country?: string;
    city?: string;
    phoneNumber?: string;
    profilePicture?: string;
    coverPicture?: string;
  };
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

interface Applicant {
    id: string;
    job: string;
    applicant: {
      firstname: string;
      lastname: string;
      email: string;
      city?: string;
      country?: string;
    };
    phone: string;
    resume: {
      file: string;
    };
    status: "Pending" | "Viewed" | "Accepted" | "Rejected";
    createdAt: string;
  }
  
  interface Props {
    jobId: string;
  }

//@ts-ignore
const AdminJobApplicants: React.FC<SaveApplyProps> = ({ jobTitle, companyName, jobId }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
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
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Record<string, any>>({});
  const hasApplied = !!selectedJob?.applicationStatus;
  const { company } = useCompanyStore();
  const companyId = company?.id;

  const loadCompanyJobs = async () => {
    if (!companyId) return;

    const result = await fetchCompanyJobs(companyId);
    setJobs(result.jobs);
    setSavedJobs(result.savedJobs);
    setAppliedJobs(result.appliedJobsMap);

    if (result.jobs.length > 0) {
      setSelectedJob(result.jobs[0]);
      const isJobSaved = result.savedJobs.some(
        (job) => job.id === result.jobs[0].id,
      );
      setIsSaved(isJobSaved);
    }
  };

  useEffect(() => {
    loadCompanyJobs();
  }, [companyId]);

  useEffect(() => {
    if (!selectedJob) return;

    const checkIfSaved = async () => {
      try {
        const saved = await fetchSavedJobs();
        setSavedJobs(saved);
        const isAlreadySaved = saved.some((job) => job.id === selectedJob.id);
        setIsSaved(isAlreadySaved);
      } catch (error) {
        console.error("Failed to fetch saved jobs:", error);
      }
    };

    checkIfSaved();
  }, [selectedJob]);

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
      //@ts-ignore
      email,
      resume,
      //@ts-ignore
      coverLetter,
    }: { phone: string; email: string; resume: File; coverLetter?: string },
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
          job.id === jobId ? { ...job, applicationStatus: "Pending" } : job,
        ),
      );

      setSelectedJob((prev) =>
        prev?.id === jobId ? { ...prev, applicationStatus: "Pending" } : prev,
      );

      setShowModal(false);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      const errorCode = error?.response?.data?.errorCode;

      console.error("❌ Application error:", error);

      // 🔀 Match based on known backend messages/codes
      if (
        message === "User has already applied for this job" &&
        errorCode === 400
      ) {
        toast.error("You have already applied for this job.");
      } else if (
        message === "This job is not accepting more applicants" &&
        errorCode === 403
      ) {
        toast.error("This job is no longer accepting applications.");
      } else if (message === "This job is not found" && errorCode === 404) {
        toast.error("The job you are trying to apply for was not found.");
      } else if (
        message === "Employers can't apply for their jobs" &&
        errorCode === 400
      ) {
        toast.error("Employers are not allowed to apply to their own jobs.");
      } else {
        // fallback
        toast.error(
          message || "An unexpected error occurred. Please try again.",
        );
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

  const handleSaveClick = async () => {
    if (!selectedJob) return;

    try {
      if (!isSaved) {
        await saveJob(selectedJob.id);
        setIsSaved(true);
        setSavedJobs((prev) => [...prev, selectedJob]);
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
        await unsaveJob(selectedJob.id);
        setIsSaved(false);
        setSavedJobs((prev) => prev.filter((job) => job.id !== selectedJob.id));
        toast.success("This job is no longer saved", { duration: 10000 });
      }
    } catch (error: any) {
      const message = error?.response?.data?.message;
      const code = error?.response?.data?.errorCode;

      console.error("Save/Unsave error:", error);

      if (!isSaved) {
        // Save errors
        if (message === "This job is already saved" && code === 400) {
          toast.error("You've already saved this job.");
        } else if (message === "This job is not found" && code === 404) {
          toast.error("This job was not found.");
        } else {
          toast.error(message || "An unexpected error occurred while saving.");
        }
      } else {
        // Unsave errors
        if (message === "This job is not saved" && code === 400) {
          toast.error("This job wasn't saved in the first place.");
        } else if (message === "This job is not found" && code === 404) {
          toast.error("This job was not found.");
        } else {
          toast.error(
            message || "An unexpected error occurred while unsaving.",
          );
        }
      }
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

  const navigate = useNavigate();
  const userprofile = useAppSelector((state) => state.user.profilePicture);

  return (
    <div className="flex flex-col min-h-screen bg-warmWhite">
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6 text-darkBurgundy">
          Find your next job
        </h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-softRosewood hover:bg-crimsonRed text-white px-6 py-3 rounded-md mb-5"
        >
          Create New Job
        </button>
        <button
          onClick={() => navigate("/saved-jobs")}
          className="bg-softRosewood hover:bg-crimsonRed text-white px-6 py-3 rounded-md mb-5 ml-5"
        >
          View Saved,applied Jobs & My applicants
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
                        src={
                          job.company?.logo ??
                          userprofile ??
                          "/default-logo.png"
                        }
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
                <ApplicantsByJob jobId={selectedJob.id} />
              ) : (
                <div className="text-center text-gray-500 py-10">
                  Select a job to see details.
                </div>
              )}
            </div>
          </div>
        </div>
        <CreateJobModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onJobCreated={() => {
            if (companyId) {
              loadCompanyJobs();
            }
          }}
        />
      </main>
    </div>
  );
};

export default AdminJobApplicants;
