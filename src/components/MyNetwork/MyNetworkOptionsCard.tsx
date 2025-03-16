import { useState } from "react";

function MyNetworkOptionsCard() {
    const [activeOption, setActiveOption] = useState<"grow" | "catchup" | null>(null);

    function handleGrowClick() {
        setActiveOption("grow");
    }

    function handleCatchUpClick() {
        setActiveOption("catchup");
    }

    return (
        <div className="flex flex-row items-center font-semibold justify-center md:justify-start">
            <div
                className={`${
                    activeOption === "grow"
                        ? "border-b-2 border-darkBurgundy text-darkBurgundy bg-gray-200"
                        : "hover:bg-gray-200 text-darkGray"
                } cursor-pointer p-3`}
                onClick={handleGrowClick}
            >
                Grow
            </div>
            <div
                className={`${
                    activeOption === "catchup"
                        ? "border-b-2 border-darkBurgundy text-darkBurgundy bg-gray-200"
                        : "hover:bg-gray-200 text-darkGray"
                } cursor-pointer p-3`}
                onClick={handleCatchUpClick}
            >
                Catch up
            </div>
        </div>
    );
}

export default MyNetworkOptionsCard;