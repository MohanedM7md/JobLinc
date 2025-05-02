import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Job } from "../Jobs&hiring/Jobs_And_Hiring";
import { fetchSavedJobs } from "@services/api/jobService";

// interface Job {
//   id: number;
//   title: string;
//   company: string;
//   location: string;
//   posted: string;
//   remote: string;
//   activelyRecruiting: boolean;
//   easyApply: boolean;
//   logo: string;
// }

// const jobs: Job[] = [
//   {
//     id: 1,
//     title: "Senior Software Engineer",
//     company: "TechCorp Industries",
//     location: "San Francisco, CA",
//     posted: "2 days ago",
//     remote: "Remote",
//     activelyRecruiting: false,
//     easyApply: true,
//     logo: "/logos/swatx.png",
//   },
//   {
//     id: 2,
//     title: "Product Manager",
//     company: "InnovateSoft",
//     location: "New York, NY",
//     posted: "4 days ago",
//     remote: "",
//     activelyRecruiting: true,
//     easyApply: true,
//     logo: "/logos/micro1.png",
//   },
//   {
//     id: 3,
//     title: "UX Designer",
//     company: "CreativeDesigns",
//     location: "Austin, TX",
//     posted: "1 week ago",
//     remote: "remote",
//     activelyRecruiting: false,
//     easyApply: true,
//     logo: "/logos/envision.png",
//   },
//   {
//     id: 4,
//     title: "Data Scientist",
//     company: "DataDriven Solutions",
//     location: "Seattle, WA",
//     posted: "3 days ago",
//     remote: "",
//     activelyRecruiting: true,
//     easyApply: true,
//     logo: "/logos/linrco.png",
//   },
// ];

const appliedJobs: Job[] = [
    {
        "id": "681359bc657430f724b65e87",
        "title": "Financial Analyst",
        "industry": "Finance",
        "company": {
            "id": "681359bb657430f724b65e28",
            "name": "WaveTech Innovations",
            "urlSlug": "wavetech-innovations",
            "size": "200-300 employees",
            "industry": "Technology",
            "overview": "Focused on cloud computing and data analytics.",
            "logo": "https://joblinc.me/uploads/placeholders/company_logo.png",
            "followers": 450
        },
        "description": "Analyze financial data to guide decision-making.",
        "workplace": "Hybrid",
        "type": "Full-time",
        "experienceLevel": "Junior",
        "salaryRange": {
            "id": "681359bc657430f724b65e89",
            "from": 3500,
            "to": 5500,
            "currency": "USD"
        },
        "location": {
            "id": "681359bc657430f724b65e8a",
            "address": "222 Finance Dr",
            "city": "Houston",
            "country": "USA"
        },
        "skills": [
            "Excel",
            "Forecasting",
            "Budgeting"
        ],
        "accepting": true,
        "createdAt": "2025-05-01T11:23:40.028Z"
    }
];

const JobTabs = ["Saved", "Applied"];

const SavedJobs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Saved");
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const saved = await fetchSavedJobs();
        setSavedJobs(saved);
      } catch (error) {
        console.error("Failed to load saved jobs:", error);
      }
    };
    loadJobs();
  }, []);

  return (
    <div className="h-screen bg-warmWhite">
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
            className={`flex items-center justify-between font-medium border-l-4 pl-2 py-2 ${
              selectedTab === "Applied"
                ? "text-crimsonRed border-crimsonRed"
                : "text-gray-600 border-transparent"
            }`}
          >
            My Applied jobs <span className="ml-6">{appliedJobs.length}</span>
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
              {(selectedTab === "Saved" ? savedJobs : appliedJobs).map(
                (job) => (
                  <li key={job.id} className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <img
                        src={job.company?.logo || "/default-logo.png"}
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
                                {" "}
                                <i className="fa-solid fa-check"></i>{" "}
                              </span>
                              <span className="text-softRosewood flex items-center">
                                Actively recruiting
                              </span>
                            </>
                          )}
                          <span>{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Unknown date"}</span>
                          {job.easyApply && (
                            <span className="text-softRosewood">
                              LinkedIn Easy Apply
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <button className="text-gray-500 hover:text-gray-700">•••</button> */}
                  </li>
                ),
              )}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SavedJobs;
