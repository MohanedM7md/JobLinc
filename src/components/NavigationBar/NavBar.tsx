import { useEffect, useState } from "react";
import Searchbar from "./SearchBar";
import NavIcon from "./NavIcon";
import Logo from "./Logo";
import store from "@store/store";
import NotificationBell from "../Notifications/NotificationBell";
import NotificationPanel from "../Notifications/NotificationPanel";

function NavBar() {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth > 1280,
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>("");
  useEffect(() => {
    setLoggedInUserId(store.getState().user.userId);
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1000); // Update state based on screen width
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
            <Searchbar id="SearchBar" />
          </div>
          <div className="flex sm:block md:hidden items-center justify-center">
            <NavIcon
              Icon="fa-solid fa-magnifying-glass"
              Name="Search"
              pagePath="/"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <NavIcon Icon="fa-solid fa-house" Name="Home" pagePath="/Home" />
          <NavIcon
            Icon="fa-solid fa-user-group"
            Name={isLargeScreen ? "My Network" : "Network"}
            pagePath="/my-network"
          />
          <NavIcon Icon="fa-solid fa-briefcase" Name="Jobs" pagePath="/" />
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
            pagePath={`profile/${loggedInUserId}`}
          />
          <NavIcon
            Icon="fa-solid fa-building"
            Name="Businesses"
            Dropdown="fa-solid fa-caret-down"
            pagePath="/"
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
