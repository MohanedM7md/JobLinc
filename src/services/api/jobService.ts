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

export const fetchJobs = async (searchTerm = "", location = ""): Promise<Job[]> => {
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
