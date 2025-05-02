import { Company } from "@store/comapny/interfaces";
import { useState, useEffect } from "react";
import { Frown, ChevronDown } from "lucide-react";
import { PostInterface } from "@interfaces/postInterfaces";
import { getMyPosts, getUserPosts } from "@services/api/userProfileServices";
import { useNavigate } from "react-router-dom";
import { MediaTypes } from "../../../interfaces/postInterfaces";
import { useCompanyStore } from "@store/comapny/companyStore";

import PostCard from "@components/Posts/PostCard";

type PostsProps = {
    company?: Company;
};

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



function Posts(props: PostsProps) {
    const [filterChoice, setFilterChoice] = useState("All");
    
    const [posts, setPosts] = useState<PostInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const filters = ["All", "Images", "Videos", "Audios", "Documents"];

    const navigate = useNavigate();

    const companyPosts = posts.filter(post => post.companyId === props.company?.id);
    const mapFilterToMediaType = (filter: string): MediaTypes | undefined => {
    switch(filter) {
        case 'Images': return MediaTypes.Image;
        case 'Videos': return MediaTypes.Video;
        case 'Audios': return MediaTypes.Audio;
        case 'Documents': return MediaTypes.Document;
        default: return undefined;
    }
    };
      
    const filteredPosts = companyPosts.filter(post => {
    if (filterChoice === 'All') return true;
    const targetType = mapFilterToMediaType(filterChoice);
    return post.media?.some(media => media.type === targetType);
    });

    



    useEffect(() => {
        const fetchCompanyPosts = async function ()
        {
            try {
                setIsLoading(true);
                const response = await getUserPosts(props.company?.id || "");
                setPosts(response);
            }
            catch (error) {
                console.error("Cannot fetch companies' posts ", error);
            } finally {
                setIsLoading(false);
            }
        }


        fetchCompanyPosts();
    }, []);
    

    return (
        <div className="flex flex-col md:flex-row gap-5 max-w-7xl mx-auto px-4 w-full mt-10">
            {/* Left Sidebar - becomes top section on mobile */}
            <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-5">
                <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 text-center">
                    <img 
                        src={props.company?.logo} 
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-3 md:mb-4 object-cover"
                        alt={`${props.company?.name} logo`}
                    />
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                        {props.company?.name}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600 font-medium">
                        {props.company?.followers.toLocaleString()} followers
                    </p>
                </div>
                
                <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm">
                    <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">
                        Explore {props.company?.name}'s advertising history
                    </p>
                    <button className="text-red-600 hover:text-red-700 font-medium text-xs md:text-sm transition-colors flex items-center gap-1 justify-center">
                        View ad library
                        <span className="text-xs hidden md:inline">→</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-4 md:gap-6">
                {/* Filter/Sort Bar */}
                <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border-b border-gray-100 relative">
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setFilterChoice(filter)}
                                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all
                                    ${filterChoice === filter 
                                        ? "bg-red-600 text-white" 
                                        : "text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    // Loading Skeletons
                    [...Array(3)].map((_, index) => <PostSkeleton key={index} />)
                ) : filteredPosts.length > 0 ? (
                    // Actual Posts
                    filteredPosts.map((post) => (
                        <div className="bg-white p-5 rounded-xl" onClick={() => navigate(`/post/${post.postId}`)}>
                            <PostCard post={post} isRepost={false} compact={true}/>
                        </div>
                    ))
                ) : (
                    // Empty State
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
                </div>
            </div>
        </div>
    );
}

export default Posts;