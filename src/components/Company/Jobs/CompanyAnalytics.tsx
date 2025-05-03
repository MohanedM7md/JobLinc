import React, { useEffect, useState } from "react";
import { fetchCompanyStats } from "@services/api/jobService";
import { Briefcase, Users, CheckCircle, XCircle } from "lucide-react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CompanyAnalytics: React.FC = () => {
  const [stats, setStats] = useState<{
    totalJobsCount: number;
    totalApplicantsCount: number;
    acceptedApplicantsCount: number;
    rejectedApplicantsCount: number;
  } | null>(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchCompanyStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch company stats", error);
      }
    };
    getStats();
  }, []);

  if (!stats) {
    return (
      <p className="text-center text-gray-500 mt-8">
        Loading company analytics...
      </p>
    );
  }

  const statsCards = [
    {
      title: "Job Postings",
      value: stats.totalJobsCount,
      icon: <Briefcase className="h-6 w-6 text-indigo-600" />,
      bg: "bg-indigo-50",
    },
    {
      title: "Total Applicants",
      value: stats.totalApplicantsCount,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Accepted",
      value: stats.acceptedApplicantsCount,
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      title: "Rejected",
      value: stats.rejectedApplicantsCount,
      icon: <XCircle className="h-6 w-6 text-red-600" />,
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="bg-warmWhite w-full">
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-8 bg-warmWhite">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Company Analytics
          </h2>
          <p className="text-gray-500 text-sm">
            Track performance of job postings and applicant decisions.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {statsCards.map((card) => (
            <div
              key={card.title}
              className={`${card.bg} rounded-lg p-5 shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {card.value}
                  </p>
                </div>
                <div className="p-2 bg-white rounded-full shadow">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Application Status Overview
          </h3>
          <Bar
            data={{
              labels: ["Total Applicants", "Accepted", "Rejected"],
              datasets: [
                {
                  label: "Applicants",
                  data: [
                    stats.totalApplicantsCount,
                    stats.acceptedApplicantsCount,
                    stats.rejectedApplicantsCount,
                  ],
                  backgroundColor: ["#3B82F6", "#10B981", "#EF4444"],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    precision: 0,
                  },
                },
              },
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default CompanyAnalytics;
