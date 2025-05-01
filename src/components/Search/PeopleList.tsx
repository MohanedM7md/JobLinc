import { useEffect, useState } from "react";
import { searchUserInterface } from "@interfaces/networkInterfaces";
import { searchUsers } from "@services/api/networkServices";
import PeopleCard from "./PeopleCard";

interface PeopleListProps {
  searchQuery?: string;
}

function PeopleList({ searchQuery }: PeopleListProps) {
  const [results, setResults] = useState<searchUserInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery?.trim()) {
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
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="p-4 text-center w-full">
        <div className="bg-gray-300 rounded animate-pulse w-full h-10 my-2"></div>
        <div className="bg-gray-300 rounded animate-pulse w-full h-10 my-2"></div>
        <div className="bg-gray-300 rounded animate-pulse w-full h-10 my-2"></div>
        <div className="bg-gray-300 rounded animate-pulse w-full h-10 my-2"></div>
        <div className="bg-gray-300 rounded animate-pulse w-full h-10 my-2"></div>
        <div className="bg-gray-300 rounded animate-pulse w-full h-10 my-2"></div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        {searchQuery ? "No results found" : "Start typing to search"}
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="divide-y divide-gray-200">
        {results.map((user) => (
          <div 
            key={user.userId}
            className="hover:bg-gray-50 transition-colors duration-150"
          >
            <PeopleCard {...user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PeopleList;