import { Link } from "react-router-dom";

interface ExploreButtonsProps {
    text?: string;
    link?: string; // Add link prop
}

function ExploreButtons(props: ExploreButtonsProps) {
    const { text, link } = props;

    // Determine the link based on the text
    const buttonLink = text === "Simon Says" ? "https://1zatona1.github.io/Simon-Game/" : link ?? "#";

    return (
        <Link to={buttonLink} className="no-underline" target={text === "Simon Says" ? "_blank" : "_self"}>
            <button data-testid={text ? text.toLowerCase().trim().replace(/\s+/g, "") : "default"} className={`rounded-3xl bg-warmWhite text-[18px] font-semibold outline-3 text-warmBlack outline-black px-6 py-3 hover:cursor-pointer ${text === "Show all" ? "outline-4 text-softRosewood outline-softRosewood" : ""}`}>
                {text ?? "Default"}
            </button>
        </Link>
    );
}

export const buttonsArticles = ["Marketing", "Public Administration", "Healthcare", "Engineering", "IT Services", "Sustainability", "Business Administration", "Telecommunications", "HR Management", "Show all"];
export const buttonsJobs = ["Engineering", "Business Development", "Finance", "Administrative Assistant", "Retail Associate", "Customer Service", "Operations", "Information Technology", "Marketing", "Human Resources"];
export const buttonsMoreJobs = ["Healthcare Service", "Sales", "Program and Project Management", "Accountring", "Arts and Design", "Community and Social Services", "Consulting", "Education", "Entrepreneurship",
                                "Legal", "Media and Communication", "Military and Protective Services", "Product Management", "Purchasing", "Quality Assurance", "Real Estate", "Research", "Support", "Administrative"];

export const buttonsSoftware = ["E-Commerce Platforms", "CRM Software", "Human Resources Management Systems", "Recruiting Software", "Sales Intelligence Software", "Project Management Software", "Help Desk Software", 
                                "Social Networking Software", "Desktop Publishing Software", "Show all"];

export const buttonsGames = ["Simon Says", "Queens", "Crossclimb", "Tango", "Zip"];
export default ExploreButtons;
