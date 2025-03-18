interface ExploreButtonsProps {
    text: string,
}

function ExploreButtons(props: ExploreButtonsProps)
{
    return (
        <button className={`rounded-3xl bg-warmWhite text-[18px] font-semibold outline-3 text-warmBlack outline-black px-6 py-3 hover:cursor-pointer ${props.text === "Show all" ? "outline-4 text-softRosewood outline-softRosewood" : ""}`}>{props.text}</button>
    );
}

export const buttonsToShow = ["Marketing", "Public Adminstration", "Healthcare", "Engineering", "IT Services", "Sustainability", "Business Administration", "Telecommunications", "HR Management", "Show all"]

export default ExploreButtons;