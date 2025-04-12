import NavIcon from "../../NavIcon";
import Logo from "../../utils/Logo";

function SignMain() {
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
          <Logo />
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <NavIcon
            Icon="fa-solid fa-newspaper"
            Name="Articles"
            pagePath="/Home"
          />
          <NavIcon
            Icon="fa-solid fa-user-group"
            Name="People"
            pagePath="/Home"
          />
          <NavIcon
            Icon="fa-solid fa-book-open"
            Name="Learning"
            pagePath="/Home"
          />
          <NavIcon Icon="fa-solid fa-briefcase" Name="Jobs" pagePath="/Home" />
          <NavIcon Icon="fa-solid fa-gamepad" Name="Games" pagePath="/Home" />
          <NavIcon
            Icon="fa-solid fa-mobile-alt"
            Name="Get the app"
            pagePath="/Home"
          />
          <NavIcon
            Icon="fa-solid fa-building"
            Name="Businesses"
            Dropdown="fa-solid fa-caret-down"
            pagePath="/Home"
          />
        </div>
      </nav>
    </header>
  );
}

export default SignMain;
