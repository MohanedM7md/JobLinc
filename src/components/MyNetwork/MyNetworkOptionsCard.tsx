import { useEffect, useState } from "react";

function MyNetworkOptionsCard() {
    const [activeOption, setActiveOption] = useState<"grow" | "catchup" | null>(null);

    function handleGrowClick() {
        setActiveOption("grow");
    }

    function handleCatchUpClick() {
        setActiveOption("catchup");
    }
    useEffect(() => {
        setActiveOption("grow");
    }, []);
    return (
        <div className="flex flex-row items-center font-semibold justify-center md:justify-start bg-white rounded-md border-2 border-gray-200 mt-5">
            <div
                className={`${
                    activeOption === "grow"
                        ? "border-b-2 border-darkBurgundy text-darkBurgundy bg-gray-200"
                        : "hover:bg-gray-200 text-darkGray"
                } cursor-pointer p-3 px-10 ml-6`}
                onClick={handleGrowClick}
            >
                Grow
            </div>
            <div
                className={`${
                    activeOption === "catchup"
                        ? "border-b-2 border-darkBurgundy text-darkBurgundy bg-gray-200"
                        : "hover:bg-gray-200 text-darkGray"
                } cursor-pointer p-3 px-10`}
                onClick={handleCatchUpClick}
            >
                Catch up
            </div>
        </div>
    );
}

export default MyNetworkOptionsCard;