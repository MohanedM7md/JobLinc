import FollowerList from "./FollowerList";
import FollowingList from "./FollowingList";
import { useEffect, useState } from "react";

function FollowersFollowingCard() {
    const [activeOption, setActiveOption] = useState<"following" | "followers" | null>(null);

    function handleFollowingClick() {
        setActiveOption("following");
    }

    function handleFollowersClick() {
        setActiveOption("followers");
    }

    useEffect(() => {
        setActiveOption("following");
    }, []);

    return (
        <div className="flex flex-col items-center md:items-start bg-white rounded-md border-2 border-gray-200 w-full sm:w-1/2 md:w-3/4 md:m-10">
            <div className="flex flex-row w-full font-semibold justify-start">
                <div
                    className={`${
                        activeOption === "following"
                            ? "border-b-2 border-darkBurgundy text-darkBurgundy bg-gray-200"
                            : "hover:bg-gray-200 text-darkGray"
                    } cursor-pointer p-3 px-10`}
                    onClick={handleFollowingClick}
                >
                    Following
                </div>
                <div
                    className={`${
                        activeOption === "followers"
                            ? "border-b-2 border-darkBurgundy text-darkBurgundy bg-gray-200"
                            : "hover:bg-gray-200 text-darkGray"
                    } cursor-pointer p-3 px-10`}
                    onClick={handleFollowersClick}
                >
                    Followers
                </div>
            </div>
            <div className="w-full">
                {activeOption === "following" && <FollowingList />}
                {activeOption === "followers" && <FollowerList />}
            </div>
        </div>
    );
}


export default FollowersFollowingCard;