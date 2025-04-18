import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  posted: string;
  remote: string;
  activelyRecruiting: boolean;
  easyApply: boolean;
  logo: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'Junior .NET Software Developer',
    company: 'SWATX',
    location: 'Cairo (Remote)',
    posted: 'Posted 3mo ago',
    remote: 'Remote',
    activelyRecruiting: false,
    easyApply: true,
    logo: '/logos/swatx.png',
  },
  {
    id: 2,
    title: 'Software Engineer - Web Developer',
    company: 'micro1',
    location: 'EMEA (Remote)',
    posted: 'Posted 2h ago',
    remote: 'Remote',
    activelyRecruiting: true,
    easyApply: false,
    logo: '/logos/micro1.png',
  },
  {
    id: 3,
    title: 'ServiceNow Developer',
    company: 'Envision Employment Solutions',
    location: 'New Cairo (Hybrid)',
    posted: 'Posted 1w ago',
    remote: 'Hybrid',
    activelyRecruiting: false,
    easyApply: false,
    logo: '/logos/envision.png',
  },
  {
    id: 4,
    title: 'SAP business one developer',
    company: 'LINRCO-Egypt',
    location: 'Qesm 1st Nasser City (On-site)',
    posted: 'Posted 4h ago',
    remote: 'On-site',
    activelyRecruiting: true,
    easyApply: true,
    logo: '/logos/linrco.png',
  },
  {
    id: 5,
    title: 'Mohaned business',
    company: 'Egypt',
    location: 'Qesm 1st Nasser City (On-site)',
    posted: 'Posted 4h ago',
    remote: 'On-site',
    activelyRecruiting: true,
    easyApply: true,
    logo: '/logos/linrco.png',
  },
  {
    id: 5,
    title: 'Mohaned business',
    company: 'Egypt',
    location: 'Qesm 1st Nasser City (On-site)',
    posted: 'Posted 4h ago',
    remote: 'On-site',
    activelyRecruiting: true,
    easyApply: true,
    logo: '/logos/linrco.png',
  },
];

const JobTabs = ['Saved', 'In Progress', 'Applied', 'Archived'];

const SavedJobs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('Saved');

  return (
    <div className='h-screen bg-warmWhite'>
      <div className="flex items-start p-6">
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
            className="flex items-center justify-between text-blue-600 font-medium border-l-4 border-blue-600 pl-2 py-2"
          >
            My jobs <span>{jobs.length}</span>
          </Link>
        </aside>


        <main className="ml-6 w-1/2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-semibold mb-4">My Jobs</h1>

            <div className="flex space-x-3 mb-6">
              {JobTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-1 rounded-full border ${selectedTab === tab ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <ul className="space-y-6">
              {jobs.map(job => (
                <li key={job.id} className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <img src={job.logo} alt={job.company} className="h-12 w-12 rounded" />
                    <div>
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-gray-700">{job.company}</p>
                      <p className="text-sm text-gray-500">{job.location}</p>
                      <div className="flex flex-wrap text-sm text-gray-500 gap-2 mt-1">
                        {job.activelyRecruiting && (
                          <span className="text-green-600 flex items-center">✔ Actively recruiting</span>
                        )}
                        <span>{job.posted}</span>
                        {job.easyApply && (
                          <span className="text-blue-600">LinkedIn Easy Apply</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700">•••</button>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SavedJobs;
