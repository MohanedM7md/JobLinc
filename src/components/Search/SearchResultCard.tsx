import React, { useEffect, useState, useRef } from "react";
import UserCard from "./UserCard";
import CompanySearchCard from "./CompanySearchCard";
import { searchUserInterface } from "@interfaces/networkInterfaces";
import { CompanyInterface } from "@interfaces/companyInterfaces";
import { searchUsers } from "@services/api/networkServices";
import { searchCompanies } from "@services/api/companyServices";
import { useNavigate } from "react-router-dom";

type SearchResultType = 
  | (searchUserInterface & { account: 'user' })
  | (CompanyInterface & { account: 'company' });

interface SearchResultsCardProps {
  searchQuery: string;
  onClose: () => void;
  Searchref: React.RefObject<HTMLInputElement | null>;
}

function SearchResultsCard({ searchQuery, onClose, Searchref }: SearchResultsCardProps) {
  const [results, setResults] = useState<SearchResultType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && 
          !wrapperRef.current.contains(event.target as Node) && 
          !Searchref.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        try {
          setIsLoading(true);
          const [usersResponse, companiesResponse] = await Promise.all([
            searchUsers(searchQuery),
            searchCompanies(searchQuery)
          ]);
          console.log(usersResponse)
          const parsedUsers = Array.isArray(usersResponse)
            ? usersResponse.slice(0, 3).map((user) => ({
                ...user,
                account: 'user' as const,
                country: user.country || "",
                city: user.city || "",
                connectionStatus: user.connectionStatus || "Not Connected",
                isFollowing: user.isFollowing || false,
                numberOfConnections: user.numberOfConnections || 0,
                mutualConnections: user.mutualConnections || 0,
                skills: user.skills || [],
                experiences: user.experiences || [],
                certificates: user.certificates || []
              }))
            : [];
            console.log(companiesResponse)
            const parsedCompanies = Array.isArray(companiesResponse)
            ? companiesResponse.slice(0, 3).map((company) => ({
                id: company.id,
                name: company.name,
                urlSlug: company.urlSlug,
                type: company.type || '',
                logo: company.logo || 'src/assets/default-company.png',
                size: company.size || '',
                industry: company.industry || '',
                overview: company.overview || '',
                followers: company.followers || 0,
                employees: company.employees || 0,
                createdAt: company.createdAt || new Date().toISOString()
              }))
            : [];

          setResults([...parsedUsers, ...parsedCompanies]);
        } catch (error) {
          console.error("Search failed:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleResultClick = (result: SearchResultType) => {  
    if (result.account === 'user') {
      navigate(`/profile/${result.userId}`);
    } else {
      navigate(`/company/member/${result.urlSlug}`);
    }
    onClose();
  };

  return (
    <div ref={wrapperRef} className="bg-white rounded-lg shadow-sm border border-gray-100 mt-2 w-full max-w-[300px]">
      {isLoading ? (
        <div className="p-4 text-center w-full">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-300 rounded animate-pulse w-full h-7 my-2"></div>
          ))}
        </div>
      ) : (
        <>
          {results.length > 0 && (
            <>
              <ul className="py-2">
                {results.map(result => (
                  <li 
                    key={result.account === 'user' ? result.userId : result.id}
                    className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-0 cursor-pointer"
                    onClick={() => handleResultClick(result)}
                  >
                    {result.account === 'user' ? (
                      <UserCard user={result} />
                    ) : (
                      <CompanySearchCard company={result} />
                    )}
                  </li>
                ))}
              </ul>
              <button
                className="w-full p-2 text-sm font-medium text-red-600 hover:bg-gray-50 
                         transition-colors duration-150 border-t border-gray-100
                         focus:outline-none focus:ring-1 focus:ring-red-600/30"
                onClick={() => {
                  onClose();
                  navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
                }}
              >
                Show All Results
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SearchResultsCard;