import { useEffect, useRef, useState } from "react";
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

function NavIcon({ rightBorder, Icon, Name, Dropdown, pagePath }: NavIconProps) {
  const [showPopup, setShowPopup] = useState(false);
  const iconRef = useRef<HTMLAnchorElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const showCard = () => (Name === "Me" ? <MeCard /> : <div className="relative right-10"><BusinessOptionsCard /></div>);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Link
      to={pagePath || "#"}
      className={`group flex flex-col items-center justify-center w-[calc(100%/7)] sm:w-1/2 cursor-pointer ${rightBorder}`}
      ref = {iconRef}
      onClick={() => {
        if (Name === "Me" || Name === "Businesses") {
          setShowPopup((prev) => !prev);
        }
      }}
    >
      <i className={`${Icon} group-hover:text-black text-gray-600 text-lg`}></i>
      <span className="items-center text-xs group-hover:text-black text-gray-600 ml-1 hidden sm:flex">
        {Name}
        {Dropdown && <i className={`ml-1 ${Dropdown}`}></i>}
      </span>
      {showPopup && (
        <div className="absolute top-13 z-900" ref={popupRef}>
          {showCard()}
        </div>
      )}
    </Link>
  );
}

export default NavIcon;