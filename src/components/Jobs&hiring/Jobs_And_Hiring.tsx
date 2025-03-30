import React, { useState, FormEvent, ChangeEvent } from "react";
import JobApplicationModal from "./JobApplicationModal";

interface JobHighlight {
  [index: number]: string;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  logoUrl: string;
  postedDate: string;
  applicants: number;
  remote: boolean;
  description: string;
  highlights: string[];
}

interface FilterOptions {
  datePosted: string;
  experienceLevel: string;
  jobType: string;
  remote: boolean;
}

const sampleJobs: Job[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Industries",
    location: "San Francisco, CA",
    logoUrl: "/api/placeholder/48/48",
    postedDate: "2 days ago",
    applicants: 43,
    remote: true,
    description:
      "We are looking for a senior software engineer with 5+ years of experience in React and Node.js to join our growing team.",
    highlights: ["Competitive salary", "Flexible work schedule", "Remote work"],
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateSoft",
    location: "New York, NY",
    logoUrl: "/api/placeholder/48/48",
    postedDate: "4 days ago",
    applicants: 87,
    remote: false,
    description:
      "Join our team as a product manager to drive the development of our cutting-edge software solutions.",
    highlights: ["Healthcare benefits", "Stock options", "Career growth"],
  },
  {
    id: 3,
    title: "UX Designer",
    company: "CreativeDesigns",
    location: "Austin, TX",
    logoUrl: "/api/placeholder/48/48",
    postedDate: "1 week ago",
    applicants: 29,
    remote: true,
    description:
      "Looking for a talented UX designer to help us create amazing user experiences for our clients.",
    highlights: ["Creative environment", "Modern office", "Team events"],
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataDriven Solutions",
    location: "Seattle, WA",
    logoUrl: "/api/placeholder/48/48",
    postedDate: "3 days ago",
    applicants: 56,
    remote: false,
    description:
      "Join our data science team to analyze complex datasets and build predictive models.",
    highlights: [
      "Advanced analytics tools",
      "Research opportunities",
      "Industry-leading team",
    ],
  },
];

interface SaveApplyProps {
  jobTitle?: string;
  companyName?: string;
}

const Jobs_And_Hiring: React.FC<SaveApplyProps> = ({ jobTitle, companyName }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job>(sampleJobs[0]);

  // Function to handle the Apply Now button click
  const handleApplyClick = (): void => {
    setShowModal(true);
  };
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [filters, setFilters] = useState<FilterOptions>({
    datePosted: "any",
    experienceLevel: "any",
    jobType: "any",
    remote: false,
  });

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // In a real app, this would trigger an API call
    console.log("Search submitted:", { searchTerm, location, filters });
  };

  const handleFilterChange = (filterName: string, value: string | boolean): void => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-blue-600 font-bold text-2xl">in</div>
            <div className="ml-6 hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-black">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                My Network
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                Jobs
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                Messaging
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                Notifications
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <img
              src="/api/placeholder/32/32"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6">Find your next job</h1>

        <form onSubmit={handleSearchSubmit} className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search job titles, companies, or keywords"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
            >
              Search
            </button>
          </div>
        </form>

        <div className="bg-white p-4 rounded-md shadow-sm mb-6">
          <h2 className="font-semibold mb-2">Filters</h2>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
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
                <option value="entry">Entry level</option>
                <option value="mid">Mid-level</option>
                <option value="senior">Senior level</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Job Type
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={filters.jobType}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFilterChange("jobType", e.target.value)}
              >
                <option value="any">Any type</option>
                <option value="fulltime">Full-time</option>
                <option value="parttime">Part-time</option>
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
            <h2 className="font-semibold mb-4">Jobs for you</h2>
            <div className="bg-white rounded-md shadow-sm">
              {sampleJobs.map((job) => (
                <div
                  key={job.id}
                  className={`p-4 border-b border-gray-200 hover:bg-blue-50 cursor-pointer ${
                    selectedJob.id === job.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex">
                    <img
                      src={job.logoUrl}
                      alt={job.company}
                      className="w-12 h-12 rounded-md mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-blue-600">
                        {job.title}
                      </h3>
                      <p className="text-gray-800">{job.company}</p>
                      <p className="text-gray-600 text-sm">
                        {job.location} {job.remote && "(Remote)"}
                      </p>
                      <div className="flex text-gray-500 text-xs mt-2">
                        <span>{job.postedDate}</span>
                        <span className="mx-2">•</span>
                        <span>{job.applicants} applicants</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-3/5">
            <div className="bg-white rounded-md shadow-sm p-6">
              <div className="flex items-start">
                <img
                  src={selectedJob.logoUrl}
                  alt={selectedJob.company}
                  className="w-16 h-16 rounded-md mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold">{selectedJob.title}</h2>
                  <p className="text-gray-800">{selectedJob.company}</p>
                  <p className="text-gray-600">
                    {selectedJob.location} {selectedJob.remote && "(Remote)"}
                  </p>
                  <div className="flex text-gray-500 text-sm mt-1">
                    <span>{selectedJob.postedDate}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedJob.applicants} applicants</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full mr-2"
                  onClick={handleApplyClick}
                >
                  Apply now
                </button>
                <JobApplicationModal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  companyName={selectedJob.company}
                />
                <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full">
                  Save
                </button>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Job description</h3>
                <p className="text-gray-700">{selectedJob.description}</p>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Job highlights</h3>
                <ul className="list-disc pl-5">
                  {selectedJob.highlights.map((highlight, index) => (
                    <li key={index} className="text-gray-700">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Similar jobs</h3>
                <div className="flex flex-wrap gap-2">
                  {sampleJobs
                    .filter((job) => job.id !== selectedJob.id)
                    .slice(0, 2)
                    .map((job) => (
                      <div
                        key={job.id}
                        className="p-3 border border-gray-200 rounded-md w-full md:w-64"
                      >
                        <h4 className="font-semibold text-blue-600">
                          {job.title}
                        </h4>
                        <p className="text-gray-800">{job.company}</p>
                        <p className="text-gray-600 text-sm">{job.location}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-blue-600 font-bold">in</div>
            <div className="text-gray-500 text-sm">
              &copy; 2025 LinkedIn Clone
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Jobs_And_Hiring;