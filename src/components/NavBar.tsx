import { useEffect, useState } from 'react';
import Searchbar from '../components/SearchBar';
import NavIcon from '../components/NavIcon';
import Logo from '../components/Logo';
function NavBar(){
        const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth > 1280); // Typed as boolean

        useEffect(() => {
          const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1000); // Update state based on screen width
          };
          window.addEventListener('resize', handleResize);
          handleResize();
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);
      
        return (
          <nav className="flex flex-row border border-gray-100 shadow-lg rounded overflow-hidden w-full">
            <div className="flex flex-row items-center lg:w-7/20 sm:w-auto overflow-hidden flex-shrink-0 sm:ml-0 md:ml-[5%] mr-3">
              <Logo /> 
              <div className="hidden md:flex flex-grow">
                <Searchbar /> 
              </div>
              <div className="flex sm:block md:hidden items-center justify-center">
                <NavIcon Icon="fa-solid fa-magnifying-glass" Name="Search" />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <NavIcon Icon="fa-solid fa-house" Name="Home" />
              <NavIcon Icon="fa-solid fa-user-group" Name={isLargeScreen ? 'My Network' : 'Network'} />
              <NavIcon Icon="fa-solid fa-briefcase" Name="Jobs" />
              <NavIcon Icon="fa-solid fa-message" Name="Messaging" />
              <NavIcon Icon="fa-solid fa-bell" Name="Notifications" />
              <NavIcon
                Icon="fa-solid fa-user"
                Name="Me"
                Dropdown="fa-solid fa-caret-down"
                rightBorder="border-r border-gray-200"
              />
              <NavIcon Icon="fa-solid fa-building" Name="Businesses" Dropdown="fa-solid fa-caret-down" />
            </div>
          </nav>
        );
}
export default NavBar