
import { useSearchParams } from "react-router-dom";
import UserConnectionListCard from "../../components/Connections/UserConnectionListCard";
import { useEffect, useState } from "react";
import PeopleList from "../../components/Search/PeopleList";
import CompanyList from "./CompanyList";

function SearchResultOptions() {
    const [activeOption, setActiveOption] = useState<"People" | "Companies" | null>(null);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    function handlePeopleClick() {
        setActiveOption("People");
    }

    function handleCompaniesClick() {
        setActiveOption("Companies");
    }

    useEffect(() => {
        setActiveOption("People");
    }, []);

    return (
        <div className="flex flex-col items-center md:items-start bg-white rounded-md border-2 border-gray-200 w-full sm:w-1/2 md:w-3/4 md:m-10">
            <div className="flex flex-row w-full font-semibold justify-start">
                <div
                    className={`${
                        activeOption === "People"
                            ? "border-b-2 border-darkBurgundy text-darkBurgundy bg-gray-200"
                            : "hover:bg-gray-200 text-darkGray"
                    } cursor-pointer p-3 px-10`}
                    onClick={handlePeopleClick}
                >
                    People
                </div>
                <div
                    className={`${
                        activeOption === "Companies"
                            ? "border-b-2 border-darkBurgundy text-darkBurgundy bg-gray-200"
                            : "hover:bg-gray-200 text-darkGray"
                    } cursor-pointer p-3 px-10`}
                    onClick={handleCompaniesClick}
                >
                    Companies
                </div>
            </div>
            <div className="w-full">
                {activeOption === "People" && <PeopleList searchQuery={searchQuery}/>}
                {activeOption === "Companies" && <CompanyList searchQuery={searchQuery}/>} 
            </div>
        </div>
    );
}


export default SearchResultOptions;