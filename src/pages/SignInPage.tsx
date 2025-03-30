import SignInInformation from "../components/Authentication/SignInInformation";
import {
  AuthenticationGoogleButton,
  AuthenticationAppleButton,
} from "../components/Authentication/AuthenticationButtons";
import SignHeader from "../components/Authentication/SignHeader";
import { Outlet, Link } from "react-router-dom";

function SignInPage() {
  return (
    <div className="flex flex-col gap-7 w-full h-screen items-center justify-center bg-charcoalWhite m-0">
      <SignHeader />
      <div className="flex flex-col gap-6 bg-lightGray p-5 rounded-xl">
        <h1 className="font-bold text-[30px] text-warmBlack">Sign in</h1>
        <div className="flex flex-col justify-center">
          <AuthenticationGoogleButton />
          <AuthenticationAppleButton />
          <div className="relative flex items-center justify-center w-full border-b-1 my-2">
            <span className="absolute px-2 bg-lightGray">or</span>
          </div>
        </div>

        <SignInInformation />
      </div>
      <div className="text-warmBlack">
        New to JobLinc?
        <Link to="/Signup" className="ml-2 font-bold hover:underline">
          Join now
        </Link>
        <Outlet />
      </div>
    </div>
  );
}

export default SignInPage;
