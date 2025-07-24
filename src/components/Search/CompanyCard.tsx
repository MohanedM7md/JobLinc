import { CompanyInterface } from "@interfaces/companyInterfaces";
import { sendFollowRequest, sendUnfollowRequest } from "@services/api/networkServices";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface CompanyCardProps {
  company: CompanyInterface;
}

function CompanyCard({ company }: CompanyCardProps) {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(company.isFollowing || false);

  const handleCompanyClick = () => {
    navigate(`/company/member/${company.urlSlug}`);
  };

  const formatFollowers = (followers: number) => {
    if (followers >= 1000) {
      return `${(followers / 1000).toFixed(followers >= 10000 ? 0 : 1)}k followers`;
    }
    return `${followers} follower${followers !== 1 ? 's' : ''}`;
  };

  const handleFollow = async () => {
    const followPromise = sendFollowRequest(company.id!);
    toast.promise(followPromise, {
      loading: "Sending follow request...",
      success: `${company.name} followed successfully!`,
      error: `Failed to follow ${company.name}. Please try again.`,
    });

    try {
      const response = await followPromise;
      if (response.status === 200) {
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("Failed to send follow request:", err);
    }
  };

  const handleUnfollow = async () => {
    const unfollowPromise = sendUnfollowRequest(company.id!);
    toast.promise(unfollowPromise, {
      loading: "Sending unfollow request...",
      success: `${company.name} unfollowed successfully!`,
      error: `Failed to unfollow ${company.name}. Please try again.`,
    });

    try {
      const response = await unfollowPromise;
      if (response.status === 200) {
        setIsFollowing(false);
      }
    } catch (err) {
      console.error("Failed to send unfollow request:", err);
    }
  };

  return (
    <div 
      data-testid="company-card" 
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-200 w-full p-4 hover:bg-gray-50 transition-colors"
    >
      <img
        src={company.logo || "/default-company.png"}
        alt={`${company.name} logo`}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover cursor-pointer flex-shrink-0"
        onClick={handleCompanyClick}
      />

      <div className="flex-grow min-w-0 sm:ml-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
          <h3 
            className="text-lg font-semibold hover:underline cursor-pointer truncate"
            onClick={handleCompanyClick}
          >
            {company.name}
          </h3>
          <span className="text-sm text-gray-500">
            {formatFollowers(company.followers)}
          </span>
        </div>

        <p className="text-gray-600 line-clamp-2 text-sm mb-3">
          {company.overview}
        </p>

        <div className="flex items-center gap-3">
          {isFollowing ? (
            <button
              onClick={handleUnfollow}
              className="bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
              data-testid="unfollow-button"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="bg-white border border-red-600 text-red-600 text-sm font-medium px-4 py-2 rounded-full hover:bg-red-50 transition-colors flex items-center gap-2"
              data-testid="follow-button"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Follow</span>
            </button>
          )}
        </div>
      </div>

      <div className="sm:w-auto w-full flex sm:flex-col gap-2 mt-2 sm:mt-0">
        <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
          {company.industry}
        </span>
        <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
          {company.type}
        </span>
      </div>
    </div>
  );
}

export default CompanyCard;