import { CompanyInterface } from "@interfaces/companyInterfaces";

interface CompanyCardProps {
  company: CompanyInterface;
}

function CompanySearchCard({ company }: CompanyCardProps) {
  const companyInfo = `${company.industry} • ${company.followers || '0'} Followers`;

  return (
    <div className="flex p-1.5 w-full max-w-[300px] bg-white hover:bg-gray-50 rounded-md transition-colors duration-150 cursor-pointer">
      <div className="flex justify-between items-center w-full gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h2 className="text-sm font-medium text-gray-800 truncate">
              {company.name}
            </h2>
            <span className="text-red-600 text-xs">•</span>
            <p className="text-xs text-gray-600 truncate flex-1">
              {companyInfo}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0">
          <img
            src={company.logo || 'src/assets/default-company.png'}
            alt={`${company.name} logo`}
            className="w-9 h-9 rounded-full border-[0.5px] border-red-600/10 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanySearchCard;