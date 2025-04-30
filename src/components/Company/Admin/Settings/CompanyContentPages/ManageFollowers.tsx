import { useCompanyStore } from "@store/comapny/companyStore";
import { useEffect, useState } from "react";
import LoadingScreen from "@pages/LoadingScreen";
import { useNavigate } from "react-router-dom";

function ManageFollowers()
{
    const { company, loading, resetCompany, fetchCompanyFollowers } = useCompanyStore();    
    const [err, setErrPage] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const companyId = company?.id;
        if (companyId) {
            (async () => {
            try {
                // Get Company Followers on Component's mount
                await fetchCompanyFollowers();
                console.log("comapny followers: ", company);
            } catch (err: any) {
                if (err.response?.status === 401) {
                setErrPage("Unauthorized");
                } else {
                setErrPage("An error occurred");
                }
                console.error("Error occurred while fetching company followers:", err);
            }
            })();
            // return () => {
            //     resetCompany();
            // };
        }
    
    }, []);




    if (err) return <div>Error: {err}</div>;
    if (loading) return <LoadingScreen />;
    if (!company) return <div>No company data found</div>;

    function formatDate(isoString: string) {
        const date = new Date(isoString);
        return date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
    }

    return (

        

        <div className="flex flex-col items-center w-full h-full p-4 md:p-6 lg:p-8 xl:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
                Manage Followers
            </h2>
            
            <div className="w-full max-w-7xl mx-auto shadow-sm rounded-xl p-4 md:p-6 lg:p-8 bg-white">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-6 pb-2 border-b border-gray-200">
                    <span className="text-crimsonRed font-semibold">
                        {company?.name}
                    </span> Community
                </h3>

                {company.myFollowers && company.myFollowers.length !== 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        {company.myFollowers.map((follower) => (
                            <div 
                                key={follower.userId}
                                className="flex items-start p-3 md:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 hover:cursor-pointer"
                                onClick={()=>{navigate(`/profile/${follower.userId}`)}}
                            >
                                <div className="mr-3 md:mr-4 flex-shrink-0">
                                    <img 
                                        src={follower.profilePicture}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-gray-100"
                                        alt={`${follower.firstname} profile`}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/default-avatar.png';
                                        }}
                                    />
                                </div>
                                
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <strong className="text-sm md:text-base font-semibold text-gray-900 truncate">
                                            {follower.firstname} {follower.lastname}
                                        </strong>
                                    </div>
                                    <span className="text-xs text-gray-400 truncate">
                                        {formatDate(follower.time)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <div className="text-3xl md:text-4xl mb-3 md:mb-4">🌟</div>
                        <p className="text-center text-gray-500 text-sm md:text-base max-w-xs md:max-w-md mx-auto">
                            <span className="font-semibold text-gray-700 block md:inline">
                                No followers yet
                            </span> 
                            <span className="hidden md:inline"> - </span>
                            Keep sharing amazing content and watch your community grow!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );



}

export default ManageFollowers;