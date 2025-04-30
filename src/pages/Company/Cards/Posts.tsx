import { Company } from "@store/comapny/interfaces";
import { useState } from "react";
import { Frown, ChevronDown } from "lucide-react";
import { combine } from "zustand/middleware";

type PostsProps = {
    company? : Company;
}

function Posts(props : PostsProps)
{
    const [choiceOfSort, setChoiceOfSort] = useState("Top");
    const [dropDownSort, setDropDownSort] = useState(false);
    const [filterChoice, setFilterChoice] = useState("All");
    
    function handleSortClick()
    {
        setDropDownSort(!dropDownSort);
    }
    
    return (
    <div className="flex gap-5">
        <div className="flex flex-col gap-5 p-3">
            <div className="bg-white rounded-xl flex flex-col p-5">
                <img src={props.company?.logo}/>
                <p>{props.company?.name}</p>
            </div>
            <div className="bg-white p-3 rounded-xl">
                <p>See a collection of active or past ads by {props.company?.name}</p>
                <p className="text-crimsonRed hover:underline hover:cursor-pointer">View ad library</p>
            </div>
        </div>
        <div className="flex flex-col gap-10">
            <div className="border-b-1 border-gray-600 relative flex gap-4 p-4">
                <button className={`px-3 py-1 outline-1 outline-crimsonRed hover:outline-2 hover:cursor-pointer rounded-2xl ${filterChoice === "All" && "bg-crimsonRed text-white"}`}
                onClick={() => {setFilterChoice("All")}}>All</button>
                
                <button className={`px-3 py-1 outline-1 outline-crimsonRed hover:outline-2 hover:cursor-pointer rounded-2xl ${filterChoice === "Images" && "bg-crimsonRed text-white"}`}
                onClick={() => {setFilterChoice("Images")}}>Images</button>
                
                <button className={`px-3 py-1 outline-1 outline-crimsonRed hover:outline-2 hover:cursor-pointer rounded-2xl ${filterChoice === "Videos" && "bg-crimsonRed text-white"}`}
                onClick={() => {setFilterChoice("Videos")}}>Videos</button>
                
                <button className={`px-3 py-1 outline-1 outline-crimsonRed hover:outline-2 hover:cursor-pointer rounded-2xl ${filterChoice === "Articles" && "bg-crimsonRed text-white"}`}
                onClick={() => {setFilterChoice("Articles")}}>Articles</button>
                
                <button className={`px-3 py-1 outline-1 outline-crimsonRed hover:outline-2 hover:cursor-pointer rounded-2xl ${filterChoice === "Documents" && "bg-crimsonRed text-white"}`}
                onClick={() => {setFilterChoice("Documents")}}>Documents</button>
                
                <div className="flex absolute top-13 bg-warmWhite left-90 w-[150px] px-2 hover:cursor-pointer" onClick={handleSortClick}>
                    Sort by: {choiceOfSort} <ChevronDown />
                    {dropDownSort && 
                    <div className="absolute bg-white rounded-xl left-16 top-8 gap-2">
                        <p className={`${choiceOfSort === "Top" && "font-semibold text-crimsonRed"} p-4 text-center`} onClick={() => {setChoiceOfSort("Top")}}>Top</p>
                        <p className={`${choiceOfSort === "Recent" && "font-semibold text-crimsonRed"} p-4 text-center`} onClick={() => {setChoiceOfSort("Recent")}}>Recent</p>
                    </div>}
                </div>
            </div>
            <div className="bg-white rounded-xl">
                {props.company?._id && 
                    <div className="flex flex-col gap-5 items-center justify-start p-5">
                        <img src="\src\assets\7440635.webp" alt="why" />
                        <h2 className="text-[24px] font-bold">No posts yet</h2>   
                        <p className="">Check back later for posts!</p>
                    </div>
                }
            </div>
        </div>
    </div>);
}

export default Posts;