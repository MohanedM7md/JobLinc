import SignUpInformation from "../components/Authentication/SignUpInformation";
import { AuthenticationGoogleButton, AuthenticationMicrosoftButton } from "../components/Authentication/AuthenticationButtons";
import SignHeader from "../components/Authentication/SignHeader";
import { Outlet, Link } from "react-router-dom";


function SignUpPage()
{
    return (
        <div className="flex flex-col gap-7 w-full h-screen items-center justify-center bg-[#FAFAFA] m-0">
            <SignHeader />
            <h1 className="font-bold text-[18px] text-[#222222] sm:text-[25px]">Start your journey and join 1B professionals!</h1>
            <div className="flex flex-col gap-3 bg-[#F4F4F4] p-5 rounded-xl">
                <SignUpInformation />
                
                <div className="relative flex items-center justify-center w-full border-b-1 mb-3">
                        <span className="absolute px-2 bg-[#F4F4F4]">or</span>
                </div>
                <div className="flex flex-col justify-center">
                    <AuthenticationGoogleButton />
                    <AuthenticationMicrosoftButton />
                </div>

                <div className="text-[#222222] flex justify-center">Already on Job Linc
                    <Link to="/Signin" className="ml-2 text-[#222222] font-bold hover:underline">Sign in</Link>
                    <Outlet />
                </div>
            </div>
                
        </div>
            
    );
}

export default SignUpPage;