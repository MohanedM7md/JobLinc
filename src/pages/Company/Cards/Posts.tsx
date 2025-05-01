import { Company } from "@store/comapny/interfaces";
import { useState } from "react";
import { Frown, ChevronDown } from "lucide-react";

type PostsProps = {
    company?: Company;
};

function Posts(props: PostsProps) {
    const [choiceOfSort, setChoiceOfSort] = useState("Top");
    const [dropDownSort, setDropDownSort] = useState(false);
    const [filterChoice, setFilterChoice] = useState("All");
    
    const filters = ["All", "Images", "Videos", "Articles", "Documents"];

    return (
        <div className="flex flex-col md:flex-row gap-5 max-w-7xl mx-auto px-4 w-full">
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

                    {/* Sort Dropdown - moves below filters on mobile */}
                    <div className="md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2">
                        <button 
                            onClick={() => setDropDownSort(!dropDownSort)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 group w-full md:w-auto justify-center md:justify-start"
                        >
                            <span className="text-xs md:text-sm font-medium">Sort: {choiceOfSort}</span>
                            <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${dropDownSort ? "rotate-180" : ""}`} />
                        </button>

                        {dropDownSort && (
                            <div className="md:absolute right-0 top-8 bg-white rounded-lg shadow-lg py-2 w-full md:w-40 z-10 border border-gray-100 mt-2 md:mt-0">
                                {["Top", "Recent"].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            setChoiceOfSort(option);
                                            setDropDownSort(false);
                                        }}
                                        className={`w-full px-4 py-2 text-xs md:text-sm text-left hover:bg-gray-50 
                                            ${choiceOfSort === option ? "text-red-600 font-medium" : "text-gray-700"}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Empty State */}
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px]">
                    <div className="max-w-xs text-center">
                        <Frown className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-3 md:mb-4" />
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">
                            No posts available yet
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm">
                            Check back later for updates from {props.company?.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;