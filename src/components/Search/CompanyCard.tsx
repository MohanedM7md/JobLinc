import { CompanyInterface } from "@interfaces/companyInterfaces";
import { useNavigate } from "react-router-dom";

interface CompanyCardProps {
  company: CompanyInterface;
}

function CompanyCard({ company }: CompanyCardProps) {
  const navigate = useNavigate();

  const handleCompanyClick = () => {
    navigate(`/company/${company.urlSlug}`);
  };

  const formatFollowers = (followers: number) => {
    if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}k followers`;
    }
    return `${followers} follower${followers !== 1 ? 's' : ''}`;
  };

  return (
    <div 
      data-testid="company-card" 
      className="flex border-b border-gray-300 w-full p-3 hover:bg-gray-50"
    >
      <img
        src={company.logo || "/default-company.png"}
        alt={`${company.name} logo`}
        className="w-16 h-16 rounded-full object-cover cursor-pointer"
        onClick={handleCompanyClick}
      />
      <div className="ml-4 flex-grow mr-7">
        <div className="flex items-center gap-2 mb-1">
          <h3 
            className="text-lg font-semibold hover:underline cursor-pointer"
            onClick={handleCompanyClick}
          >
            {company.name}
          </h3>
          <span className="text-sm text-gray-500">
            {formatFollowers(company.followers)}
          </span>
        </div>
        <p className="text-gray-600 line-clamp-2 text-sm">
          {company.overview}
        </p>
      </div>
      <div className="w-1/3 flex justify-end items-center gap-2">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {company.industry}
        </span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {company.size} employees
        </span>
      </div>
    </div>
  );
}

export default CompanyCard;