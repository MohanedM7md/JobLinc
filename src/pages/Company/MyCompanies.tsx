import { getMyCompany } from "@services/api/companyServices";
import { getMyCompanies } from "@services/api/userProfileServices";
import { useEffect, useState } from "react";
import { Company } from "@store/comapny/interfaces";
import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "@store/comapny/companyStore";
import { FaCommentsDollar } from "react-icons/fa";
import CompanyCard from "./Cards/CompanyCard";
function MyCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { company } = useCompanyStore();
  console.log("company id from store: ", company?.id);
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
    <div className="p-5 max-w-7xl mx-auto h-dvh">
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
        companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))
      )}
    </div>
  );
}

export default MyCompanies;
