import { useEffect, useState } from "react";
import { searchUserInterface } from "@interfaces/networkInterfaces";
import { searchUsers } from "@services/api/networkServices";
import PeopleCard from "./PeopleCard";

interface PeopleListProps {
  searchQuery?: string;
}

function PeopleList({ searchQuery }: PeopleListProps) {
  const [results, setResults] = useState<searchUserInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center p-4 border-b border-gray-200 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!results.length && !isLoading) {
    return (
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center text-gray-500">
        {searchQuery ? "No people found matching your search" : "Enter a name or keyword to search people"}
      </div>
    );
  }

  return (

    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="divide-y divide-gray-200">
        {results.map((user) => (
          <PeopleCard
            key={user.userId}
            {...user}
          />
        ))}
      </div>
    </div>
  );
}

export default PeopleList;