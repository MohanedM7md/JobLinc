import { useMemo } from "react";
import { useCompanyStore } from "@store/comapny/companyStore";
const CompanyDashboard = () => {
  const { company } = useCompanyStore();
  const { completionPercentage, missingFields } = useMemo(() => {
    if (!company) return { completionPercentage: 0, missingFields: [] };

    const requiredFields = [
      { key: "name", label: "Company Name" },
      { key: "industry", label: "Industry" },
      { key: "logo", label: "Logo" },
      { key: "website", label: "Website" },
      { key: "overview", label: "Overview" },
      { key: "phone", label: "Phone Number" },
      { key: "locations", label: "Office Location", isArray: true },
    ];

    const missing = requiredFields.filter((field) => {
      if (field.isArray) {
        return !company[field.key] || company[field.key].length === 0;
      }
      return !company[field.key] || company[field.key] === "";
    });

    const completionPercentage = Math.round(
      ((requiredFields.length - missing.length) / requiredFields.length) * 100,
    );

    return { completionPercentage, missingFields: missing };
  }, [company]);

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 max-w-3xl mx-auto h-dvh">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-charcoalBlack dark:text-charcoalWhite">
            Company Profile
          </h1>
          <p className="text-mutedSilver mt-1">
            {company?.name || "Your Company"}
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center">
          <div className="mr-3">
            <span className="text-sm text-mutedSilver">Profile Completion</span>
            <div className="text-xl font-bold">
              <span
                className={
                  completionPercentage < 70
                    ? "text-crimsonRed"
                    : "text-green-600"
                }
              >
                {completionPercentage}%
              </span>
            </div>
          </div>

          <div className="w-20 h-20 relative">
            <svg
              className="w-20 h-20 transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                className="text-lightGray dark:text-gray-600"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className={
                  completionPercentage < 70
                    ? "text-crimsonRed"
                    : "text-green-600"
                }
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                strokeDasharray={`${completionPercentage * 2.51} 251`}
              />
            </svg>
          </div>
        </div>
      </div>

      {missingFields.length > 0 && (
        <div className="mb-6 bg-SoftRed dark:bg-darkBurgundy/20 rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-crimsonRed dark:text-white">
            Complete Your Profile
          </h2>
          <p className="text-sm text-mutedSilver mb-3">
            Add the following information to improve your company profile:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {missingFields.map((field) => (
              <div key={field.key} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-crimsonRed mr-2"></div>
                <span className="text-sm">{field.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {missingFields.length === 0 && (
        <div className="mb-6 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-green-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium text-green-700 dark:text-green-300">
              Your company profile is complete!
            </span>
          </div>
        </div>
      )}

      <div className="border-t border-lightGray dark:border-gray-600 pt-5">
        <h2 className="font-semibold mb-4">Company Statistics</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-lightGray dark:bg-gray-600 rounded-lg p-3">
            <div className="text-2xl font-bold">{company?.followers || 0}</div>
            <div className="text-xs text-mutedSilver mt-1">Followers</div>
          </div>
          <div className="bg-lightGray dark:bg-gray-600 rounded-lg p-3">
            <div className="text-2xl font-bold">{company?.employees || 0}</div>
            <div className="text-xs text-mutedSilver mt-1">Employees</div>
          </div>
          <div className="bg-lightGray dark:bg-gray-600 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {company?.locations?.length || 0}
            </div>
            <div className="text-xs text-mutedSilver mt-1">Locations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
