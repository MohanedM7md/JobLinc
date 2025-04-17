import { useEffect, useState } from "react";
import Searchbar from "./SearchBar";
import NavIcon from "./NavIcon";
import Logo from "./Logo";
function NavBar() {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth > 1280,
  );
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>("");
  useEffect(() => {
    setLoggedInUserId(
      JSON.parse(localStorage.getItem("userState") || "").userId,
    );
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
            <Searchbar />
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
          <NavIcon
            Icon="fa-solid fa-bell"
            Name="Notifications"
            pagePath="notifactions"
          />
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
            pagePath="/"
          />
        </div>
      </nav>
    </>
  );
}
export default NavBar;
