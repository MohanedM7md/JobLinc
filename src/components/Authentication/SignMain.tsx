
import { Link } from "react-router-dom";
import NavIcon from '../../components/NavigationBar/NavIcon';
import Logo from '../../components/NavigationBar/Logo';


function SignMain()
{
    return (
        <header className="absolute top-0 w-full flex justify-between">
            {/* <div className="pl-4">
                <img alt="JobLinc Logo" src="\src\assets\LogoLight.png"
                 className="w-[140px]"   />
            </div>
            <div className="flex justify-center gap-5 items-center pr-4">
                <div>
                    Home
                </div>
                <div>
                    About Us
                </div>
                <div>
                    Why Us
                </div>
                <Link to="/Signup">Join now</Link>
                <Link to="/Signin">Sign in</Link>

            </div> */}

            <nav className="flex flex-row border border-gray-100 shadow-lg rounded overflow-hidden w-full">
                <div className="flex flex-row items-center lg:w-7/20 sm:w-auto overflow-hidden flex-shrink-0 sm:ml-0 md:ml-[5%] mr-3">
                    <Logo id="signmainlogoIcon" /> 
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <NavIcon id="articlesIcon" Icon="fa-solid fa-newspaper" Name="Articles" Link="/Home"/>
                    <NavIcon id="peopleIcon" Icon="fa-solid fa-user-group" Name="People" Link = "/Home"/>
                    <NavIcon id="learningIcon" Icon="fa-solid fa-book-open" Name="Learning" Link="/Home"/>
                    <NavIcon id="jobsIcon" Icon="fa-solid fa-briefcase" Name="Jobs" Link="/Home"/>
                    <NavIcon id="gamesIcon" Icon="fa-solid fa-gamepad" Name="Games" Link="/Home"/>
                    <NavIcon id="gettheappIcon" Icon="fa-solid fa-mobile-alt" Name="Get the app" Link="/Home"/>
                    <NavIcon id="businnessesIcon" Icon="fa-solid fa-building" Name="Businesses" Dropdown="fa-solid fa-caret-down" Link="/Home"/>
                </div>
          </nav>
            
        </header>
    );
}

export default SignMain;