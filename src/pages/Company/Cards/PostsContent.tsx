import PostCreate from "@components/Posts/PostCreate";
import Modal from "@components/utils/Modal";
import { useState, useEffect } from "react";
import { Edit, Plus } from "lucide-react";
import { getMyPosts } from "@services/api/userProfileServices";
import { PostInterface } from "@interfaces/postInterfaces";
import { useNavigate } from "react-router-dom";
import PostCard from "@components/Posts/PostCard";

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

function PostsContent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState<PostInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    // Filter posts to only those with companyId
    const companyPosts = posts.filter(post => post.companyId);

    useEffect(() => {
        const getUserPosts = async function () {
            try {
                setIsLoading(true);
                const response = await getMyPosts();
                setPosts(response);
            }
            catch (error) {
                console.error("Cannot fetch companies' posts ", error);
            } finally {
                setIsLoading(false);
            }
        }
        getUserPosts();
    }, []);

    
      

    return (
        <div className="w-full h-dvh p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Company Posts</h1>
                    <p className="text-gray-600 mt-1">Manage and create content for your audience</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-crimsonRed text-white px-5 py-2.5 rounded-lg hover:bg-darkBurgundy transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Create Post
                </button>
            </div>
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, index) => (
                        <PostSkeleton key={index} />
                    ))}
                </div>
            ) :

            (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Filtered Company Posts */}
                {companyPosts.length > 0 ? (
                    companyPosts.map(post => (
                        <div className="bg-white p-5 rounded-xl">
                            <PostCard post={post} isRepost={false} compact={true}/>
                        </div>
                    ))
                ) : (
                    /* Empty State */
                    <div className="col-span-full bg-white rounded-xl shadow-sm p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <Edit className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No Company Posts Found
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Create your first company post to engage with your audience.
                            </p>
                        </div>
                    </div>
                )}
            </div>)}

            {/* Create Post Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <PostCreate onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}

export default PostsContent;