import { api } from "./api";
import { Job } from "../../components/Jobs&hiring/Jobs_And_Hiring";

// export interface Job {
//   id: string;
//   title: string;
//   company?: {
//     name: string;
//     logo?: string;
//   };
//   location?: {
//     city: string;
//     country: string;
//   };
//   description?: string;
//   remote?: boolean;
//   type?: string;
//   experienceLevel?: string;
//   salaryRange?: {
//     from: number;
//     to: number;
//     currency: string;
//   };
//   highlights?: string[];
//   applicants?: number;
//   applicationStatus?: "Pending" | "Viewed" | "Rejected" | "Accepted" | null;
//   postedDate?: string;
// }

// Jobs
export const fetchJobs = async (
  searchTerm = "",
  location = "",
): Promise<Job[]> => {
  try {
    const params: any = {};
    if (searchTerm) params.search = searchTerm;
    if (location) params.search_location = location;

    const response = await api.get("/jobs", { params });
    console.log("Jobs response:", response.data);

    return response.data.map((job: any) => ({
      ...job,
      postedDate: job.createdAt?.split("T")[0],
      highlights: job.skills || [],
      remote: job.workplace === "Remote",
    }));
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
};

// Upload resume
export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/user/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // includes resume.id, name, file, etc.
};

// Apply to job
export const applyToJob = async (
  jobId: string,
  phone: string,
  resumeId: string,
) => {
  const response = await api.post(`/jobs/${jobId}/apply`, {
    phone,
    resumeId,
  });

  return response.data;
};

// Save a job
export const saveJob = async (jobId: string): Promise<string[]> => {
  const response = await api.post("/user/saved-jobs/", { jobId });
  return response.data;
};

// Unsave a job
export const unsaveJob = async (jobId: string): Promise<string[]> => {
  const response = await api.delete(`/user/saved-jobs/${jobId}`);
  return response.data;
};

// Fetch saved jobs
export const fetchSavedJobs = async (): Promise<Job[]> => {
  const response = await api.get("/user/saved-jobs");

  return response.data.map((job: any) => ({
    ...job,
    highlights: job.skills || [],
    postedDate: job.createdAt?.split("T")[0],
    remote: job.workplace === "Remote",
  }));
};

// Fetch My Applications
export const fetchMyApplications = async () => {
  const response = await api.get("/jobs/my-job-applications");
  return response.data; 
};

// Fetch Create job 
export const createJob = async (jobData: any) => {
  const response = await api.post("/jobs", jobData);
  return response.data;
};

// Fetch job applicants
export const fetchJobApplications = async (jobId: string) => {
  const response = await api.get(`/jobs/${jobId}/job-applications`);
  return response.data;
};

// Fetch status update
export const updateJobApplicationStatus = async (
  jobId: string,
  applicationId: string,
  status: "Pending" | "Viewed" | "Rejected" | "Accepted"
) => {
  const response = await api.patch(
    `/jobs/${jobId}/job-applications/${applicationId}`,
    { status }
  );
  return response.data;
};

// Company 
// Company Jobs
export const fetchCompanyJobs = async (companyId: string) => {
  const [fetchedJobs, myApplications, saved] = await Promise.all([
    fetchJobs(),
    fetchMyApplications(),
    fetchSavedJobs(),
  ]);

  const appMap: Record<string, any> = {};
  const allowedStatuses = ["Pending", "Viewed", "Rejected", "Accepted"];

  myApplications.forEach((app: any) => {
    if (allowedStatuses.includes(app.status)) {
      appMap[app.job.id] = app;
    }
  });

  const enrichedJobs = fetchedJobs.map((job) => ({
    ...job,
    applicationStatus: appMap[job.id]?.status ?? null,
  }));

  const companyJobs = enrichedJobs.filter(
    (job) => job.company?.id === companyId
  );

  return {
    jobs: companyJobs,
    savedJobs: saved,
    appliedJobsMap: appMap,
  };
};