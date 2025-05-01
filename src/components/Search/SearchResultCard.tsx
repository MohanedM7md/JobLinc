import React, { useEffect, useState, useRef } from "react";
import UserCard from "./UserCard";
import { searchUserInterface } from "@interfaces/networkInterfaces";
import { searchUsers } from "@services/api/networkServices";
import { useNavigate } from "react-router-dom";
import CompanySearchCard from "./CompanySearchCard";

interface SearchResultsCardProps {
  searchQuery: string;
  onClose: () => void;
  Searchref: React.RefObject<HTMLInputElement | null>;
}

function SearchResultsCard({ searchQuery, onClose, Searchref }: SearchResultsCardProps) {
  const [results, setResults] = useState<searchUserInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && 
          !wrapperRef.current.contains(event.target as Node) && !Searchref.current?.contains(event.target as Node) ) {
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
          const response = await searchUsers(searchQuery);
          
          const parsedResults = Array.isArray(response)
            ? response.map((user) => ({
                userId: user.userId,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                profilePicture: user.profilePicture,
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
          
          setResults(parsedResults);
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

  const handleUserClick = (userId: string) => {  
    navigate(`/profile/${userId}`);
    onClose();
  };

  return (
    <div ref={wrapperRef} className="bg-white rounded-lg shadow-sm border border-gray-100 mt-2 w-full max-w-[300px]">
      {isLoading ? (
        <div className="p-4 text-center w-full">
          <div className="bg-gray-300 rounded animate-pulse w-full h-7 my-2"></div>
          <div className="bg-gray-300 rounded animate-pulse w-full h-7 my-2"></div>
          <div className="bg-gray-300 rounded animate-pulse w-full h-7 my-2"></div>
        </div>
      ) : (
        <>
          {results.length > 0 && (
            <>
              <ul className="py-2">
                {results.map(user => (
                  <li 
                    key={user.userId}
                    className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-0 cursor-pointer"
                    onClick={() => handleUserClick(user.userId)}
                  >
                    <UserCard user={user} />
                    
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