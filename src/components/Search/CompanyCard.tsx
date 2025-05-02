import { CompanyInterface } from "@interfaces/companyInterfaces";
import { useNavigate } from "react-router-dom";

interface CompanyCardProps {
  company: CompanyInterface;
}

function CompanyCard({ company }: CompanyCardProps) {
  const navigate = useNavigate();

  const handleCompanyClick = () => {
    navigate(`/company/member/${company.urlSlug}`);
  };

  const formatFollowers = (followers: number) => {
    if (followers >= 1000) {
      return `${(followers / 1000).toFixed(followers >= 10000 ? 0 : 1)}k followers`;
    }
    return `${followers} follower${followers !== 1 ? 's' : ''}`;
  };

  return (
    <div 
      data-testid="company-card" 
      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 border-b border-gray-300 w-full p-3 hover:bg-gray-50"
    >
      <img
        src={company.logo || "/default-company.png"}
        alt={`${company.name} logo`}
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover cursor-pointer flex-shrink-0"
        onClick={handleCompanyClick}
      />


      <div className="sm:ml-4 flex-grow min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
          <h3 
            className="text-base sm:text-lg font-semibold hover:underline cursor-pointer truncate"
            onClick={handleCompanyClick}
          >
            {company.name}
          </h3>
          <span className="text-xs sm:text-sm text-gray-500">
            {formatFollowers(company.followers)}
          </span>
        </div>
        <p className="text-gray-600 line-clamp-2 text-xs sm:text-sm">
          {company.overview}
        </p>
      </div>


      <div className="sm:w-1/3 w-full flex sm:flex-col sm:items-end gap-2 sm:gap-1">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
          {company.industry}
        </span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
          {company.type}
        </span>
      </div>
    </div>
  );
}

export default CompanyCard;