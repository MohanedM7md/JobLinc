import { useEffect, useState } from "react";
import { Company } from "@store/comapny/interfaces";
import { useNavigate } from "react-router-dom";
import { getMyCompanies } from "@services/api/companyServices";






function AllCompanies()
{
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [companies, setCompanies] = useState<Company[]>([]);
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
            const response = await getMyCompanies();
            setCompanies(response.data);
            console.log("companies received: ", response.data)
            } catch (error) {
            console.error("Failed to fetch companies:", error);
            } finally {
            setLoading(false);
            }
        };
        
            fetchCompanies();
    }, []);



    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-crimsonRed"></div>
            </div>
          );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {companies.map((company) => (
            <div 
            key={company.id}
            className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
            {/* Card Header */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-crimsonRed/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-crimsonRed">
                    {company.name[0]}
                    </span>
                </div>
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {company.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                    {company.industry}
                    </p>
                </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="flex-1 p-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs bg-gray-100 rounded-full">
                    {company.type}
                </span>
                <span className="px-2.5 py-1 text-xs bg-gray-100 rounded-full">
                    {company.size}
                </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3 break-words">
                {company.overview}
                </p>

                <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                    <p className="text-sm font-semibold text-crimsonRed">
                    {company.followers}
                    </p>
                    <p className="text-xs text-gray-500">Followers</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-crimsonRed">
                    {company.employees}
                    </p>
                    <p className="text-xs text-gray-500">Employees</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-crimsonRed">
                    {company.size.split(' ')[0]}
                    </p>
                    <p className="text-xs text-gray-500">Size</p>
                </div>
                </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 bg-gray-50">
                <button
                onClick={() => navigate(`/company/member/${company.urlSlug}`)}
                className="w-full py-2 px-4 text-sm bg-crimsonRed text-white rounded-lg hover:bg-darkBurgundy transition-colors"
                >
                View Company
                </button>
            </div>
            </div>
        ))}
        </div>
    );


}

export default AllCompanies;