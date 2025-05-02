import { useEffect, useState } from "react";
import { CompanyInterface } from "@interfaces/companyInterfaces";
import { searchCompanies } from "@services/api/companyServices";
import CompanyCard from "./CompanyCard";

interface CompanyListProps {
  searchQuery?: string;
}

function CompanyList({ searchQuery }: CompanyListProps) {
  const [results, setResults] = useState<CompanyInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery?.trim()) {
        try {
          setIsLoading(true);
          const response = await searchCompanies(searchQuery);
          
          const parsedResults = Array.isArray(response)
            ? response.map((company) => ({
                id: company.id,
                name: company.name,
                urlSlug: company.urlSlug,
                type: company.type || "",
                size: company.size || "",
                industry: company.industry || "",
                overview: company.overview || "",
                followers: company.followers || 0,
                employees: company.employees || 0,
                createdAt: company.createdAt,
                logo: company.logo || "/default-company.png"
              }))
            : [];
          
          setResults(parsedResults);
        } catch (error) {
          console.error("Company search failed:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="p-4 w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center p-4 border-b border-gray-200 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="ml-4 flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="flex gap-2">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!results.length && !isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        {searchQuery ? "No companies found" : "Start typing to search companies"}
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="divide-y divide-gray-200">
        {results.map((company) => (
          <CompanyCard
            key={company.id}
            company={company} 
          />
        ))}
      </div>
    </div>
  );
}

export default CompanyList;