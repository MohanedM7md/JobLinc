import { useEffect, useRef, useState } from "react";
import Searchbar from "./SearchBar";
import NavIcon from "./NavIcon";
import Logo from "./Logo";
import store from "@store/store";
import NotificationBell from "../Notifications/NotificationBell";
import NotificationPanel from "../Notifications/NotificationPanel";
import SearchResultsCard from "../Search/SearchResultCard";

function NavBar() {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth > 1280,
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>("");
  const [searchQuery, setSearchQuery] = useState("");
  const SearchRef = useRef<HTMLInputElement>(null);
  

  useEffect(() => {
    setLoggedInUserId(store.getState().user.userId);
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1000);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="flex flex-row border border-gray-100 shadow-lg rounded overflow-hidden w-full">
        <div className="flex flex-row items-center lg:w-7/20 sm:w-auto overflow-hidden flex-shrink-0 sm:ml-0 md:ml-[5%] mr-3">
          <Logo id="lincbuttonid" />
          <div className="hidden md:flex flex-grow">
            <Searchbar 
              value={searchQuery}
              Searchref={SearchRef}
              onChange={setSearchQuery}
              id="SearchBar" 
            />
            {searchQuery && (
              <div className="absolute top-10 left-43 w-full z-50 mt-1">
                <SearchResultsCard 
                searchQuery={searchQuery}
                onClose={() => setSearchQuery('')}
                Searchref={SearchRef}
                />              
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <NavIcon Icon="fa-solid fa-house" Name="Home" pagePath="/Home" />
          <NavIcon
            Icon="fa-solid fa-user-group"
            Name={isLargeScreen ? "My Network" : "Network"}
            pagePath="/my-network"
          />
          <NavIcon Icon="fa-solid fa-briefcase" Name="Jobs" pagePath="/jobs-and-hiring" />
          <NavIcon
            Icon="fa-solid fa-message"
            Name="Messaging"
            pagePath="/messaging"
          />
          <NotificationBell onClick={() => setShowNotifications(true)} />
          <NavIcon
            Icon="fa-solid fa-user"
            Name="Me"
            Dropdown="fa-solid fa-caret-down"
            rightBorder="border-r border-gray-200"
          />
          <NavIcon
            Icon="fa-solid fa-building"
            Name="Businesses"
            Dropdown="fa-solid fa-caret-down"
          />
        </div>
      </nav>
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
}

export default NavBar;
