import { useState } from "react";
import { Link } from "react-router-dom";
import MeCard from "./MeCard";
import { BusinessOptionsCard } from "./BusinessOptionsCard";

interface NavIconProps {
  rightBorder?: string;
  Icon: string;
  Name: string;
  Dropdown?: string;
  pagePath?: string;
}

function NavIcon({
  rightBorder,
  Icon,
  Name,
  Dropdown,
  pagePath,
}: NavIconProps) {
  const [showPopup, setShowPopup] = useState(false);
  const showCard = () => (Name === "Me" ? <MeCard /> : <BusinessOptionsCard />);
  return (
    <Link
      to={pagePath!}
      className={`group flex flex-col items-center justify-center w-[calc(100%/7)] sm:w-1/2 cursor-pointer ${rightBorder}`}
      onClick={() => {
        if (Name === "Me" || Name === "Businesses") {
          setShowPopup(!showPopup);
        }
      }}
    >
      <i className={`${Icon} group-hover:text-black text-gray-600 text-lg`}></i>
      <span className="items-center text-xs group-hover:text-black text-gray-600 ml-1 hidden sm:flex">
        {Name}
        {Dropdown && <i className={`ml-1 ${Dropdown}`}></i>}
      </span>
      {showPopup ? <div className="absolute top-13">{showCard()}</div> : null}
    </Link>
  );
}

export default NavIcon;
