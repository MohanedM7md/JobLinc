import { getMyCompanies } from "@services/api/companyServices";
import React, { useEffect, useState } from "react";
import { Company } from "@store/comapny/interfaces";
import { useNavigate } from "react-router-dom";
function MyCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getMyCompanies();
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
      <h2 className="text-3xl font-bold text-center text-charcoalBlack dark:text-charcoalWhite mb-8">
        My Companies
      </h2>

      {companies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-mutedSilver text-lg">
            You don't have any companies yet.
          </p>
          <button className="mt-4 px-6 py-2 bg-crimsonRed text-white rounded-md hover:bg-darkBurgundy transition-colors">
            Create Company
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-warmWhite dark:bg-darkGray rounded-lg shadow-md overflow-hidden border border-softRosewood/20 hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/company/admin/${company.id}`)}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {company.logo && (
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-12 h-12 rounded-md object-cover border border-mutedSilver/20"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-charcoalBlack dark:text-charcoalWhite">
                    {company.name}
                  </h3>
                </div>

                <div className="space-y-2 text-sm text-charcoalBlack dark:text-charcoalWhite/80">
                  <div className="flex gap-2">
                    <span className="font-medium">Industry:</span>
                    <span>{company.industry || "Not specified"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium">Employees:</span>
                    <span>{company.employees || "Not specified"}</span>
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
