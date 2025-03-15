
import { Link } from "react-router-dom";

function SignMain()
{
    return (
        <header className="absolute top-0 w-full flex justify-between">
            <div className="pl-4">
                <img alt="JobLinc Logo" src="\src\assets\JobLinc.png"
                 className="w-[90px]"   />
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

            </div>
            
        </header>
    );
}

export default SignMain;