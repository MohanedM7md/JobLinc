import { Company } from "@store/comapny/interfaces";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { PostInterface } from "@interfaces/postInterfaces";
import { getUserPosts } from "@services/api/userProfileServices";
import PostCard from "@components/Posts/PostCard";
import { Frown } from "lucide-react";

const PostSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-4/6" />
      </div>
      <div className="flex gap-4 pt-3">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
);

type HomeTabProps = {
  company?: Company;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

function HomeTab(props: HomeTabProps) {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyPosts = async () => {
      try {
        setIsLoading(true);
        const response = await getUserPosts(props.company?.id || "");
        setPosts(response);
      } catch (error) {
        console.error("Cannot fetch companies' posts ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyPosts();
  }, []);

  return (
    <div className="flex flex-col gap-6 lg:gap-8 mt-10">
      {/* Overview Section */}
      <div className="w-full max-w-7xl mx-4 md:mx-8 lg:mx-auto bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Company Overview</h2>
        <p className="mb-4">{props.company?.overview}</p>
        <div
          className="border-t border-gray-200 pt-6 hover:cursor-pointer"
          onClick={() => props.setActive("About")}
        >
          <button className="flex items-center gap-2 group hover:cursor-pointer">
            <span className="text-gray-900 font-medium group-hover:text-crimsonRed transition-colors">
              Full Company Profile
            </span>
            <ChevronRightIcon className="w-5 h-5 text-gray-500 group-hover:text-crimsonRed group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>

        {/* Posts Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Posts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading &&
            [...Array(3)].map((_, index) => (
                <PostSkeleton key={index} />
            ))}

            {!isLoading && posts.length === 0 && (
            <div className="col-span-full bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="max-w-md mx-auto">
                <Frown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Posts Found
                </h3>
                <p className="text-gray-600 mb-6">
                    {props.company?.name} hasn't shared any updates yet.
                </p>
                </div>
            </div>
            )}

            {!isLoading &&
            posts.slice(0, 3).map((post) => (
                <div className="shadow-sm p-5 rounded-xl" key={post.postId}>
                    <PostCard key={post.postId} post={post} isRepost={false} compact={true} />
                </div>
            ))}
        </div>

        {posts.length > 0 && (
            <div
            className="border-t border-gray-200 pt-6 mt-6 hover:cursor-pointer"
            onClick={() => props.setActive("Posts")}
            >
            <button className="flex items-center gap-2 group hover:cursor-pointer">
                <span className="text-gray-900 font-medium group-hover:text-crimsonRed transition-colors">
                Check out more posts of the company
                </span>
                <ChevronRightIcon className="w-5 h-5 text-gray-500 group-hover:text-crimsonRed group-hover:translate-x-1 transition-all" />
            </button>
            </div>
        )}
        </div>

    </div>
  );
}

export default HomeTab;
