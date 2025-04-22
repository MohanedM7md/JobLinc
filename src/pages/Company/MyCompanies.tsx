import { getMyCompanies, getMyCompany } from "@services/api/companyServices";
import { useEffect, useState } from "react";
import { Company } from "@store/comapny/interfaces";
import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "@store/comapny/companyStore";
import { FaCommentsDollar } from "react-icons/fa";

function MyCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { company } = useCompanyStore();
  console.log("company id from store: ", company?._id);
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getMyCompanies();
        // response.data.map((isMyCompany: Company) => {
        //   if (isMyCompany._id === company?._id) {
        //     console.log("comapny id: ", company?.id);
        //     setCompanies([
        //       ...companies,
        //       isMyCompany
        //     ]);
        //   }
        // })
        setCompanies(response.data);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-crimsonRed"></div>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-charcoalBlack dark:text-charcoalWhite mb-2">
          My Companies
        </h2>
        <p className="text-mutedSilver max-w-2xl mx-auto">
          Manage all your company profiles in one place
        </p>
      </div>

      {companies.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-SoftRed rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-crimsonRed"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
          </div>
          <p className="text-lg text-mutedSilver mb-6">
            You don't have any companies yet.
          </p>
          <button
            className="px-8 py-3 bg-crimsonRed text-white rounded-lg hover:bg-darkBurgundy transition-colors shadow-md hover:shadow-lg"
            onClick={() => navigate("/company/setup/new")}
          >
            Create Your First Company
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-warmWhite dark:bg-darkGray rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-crimsonRed/20 cursor-pointer"
              onClick={() => navigate(`/company/admin/${company.id}`)}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-14 h-14 rounded-lg object-cover border-2 border-white dark:border-gray-600 shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-crimsonRed/10 flex items-center justify-center text-crimsonRed">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        ></path>
                      </svg>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-charcoalBlack dark:text-charcoalWhite line-clamp-1">
                      {company.name}
                    </h3>
                    {company.industry && (
                      <span className="text-xs px-2 py-1 bg-crimsonRed/10 text-crimsonRed rounded-full">
                        {company.industry}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-3 text-sm">
                    <svg
                      className="w-4 h-4 text-mutedSilver"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                    <span className="text-charcoalBlack dark:text-charcoalWhite/80">
                      {company.employees || "0"} employees
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCompanies;
