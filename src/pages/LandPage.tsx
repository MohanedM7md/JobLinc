import { Outlet, Link, useNavigate } from "react-router-dom";
import SignMain from "../components/Authentication/SignMain";
import { AuthenticationGoogleButton, AuthenticationMicrosoftButton, AuthenticationSignInButton } from "../components/Authentication/AuthenticationButtons";
import ExploreButtons, { buttonsToShow } from "../components/Helpers/ExploreButtons";
function LandPage()
{
    const navigate = useNavigate();
    return (
        <div className="flex flex-col">
            <SignMain />
            <div className="relative top-40 flex w-full justify-center p-5 gap-50">
                <div className="flex flex-col gap-4 w-130">
                    <h1 className="text-5xl mb-10">Welcome to your professional community</h1>
                    <AuthenticationGoogleButton />
                    <AuthenticationMicrosoftButton />
                    <div onClick={() => navigate("/Signin")
                    }>
                        <AuthenticationSignInButton id="navigate-to-sign-in" text="Sign in with email"/>
                    </div>

                    <div className="flex w-full flex-col items-center justify-center">
                        <div className="text-[15px] text-mutedSilver mb-3">By clicking Continue to join or sign in, you agree to the JobLinc's <span className="text-softRosewood font-semibold">User Agreement</span>, <span className="text-softRosewood font-semibold">Privacy Policy</span>, and <span className="text-softRosewood font-semibold">Cookie Policy.</span></div>
                    </div>

                    <div className="text-charcoalBlack flex justify-center text-[18px]">New to JobLinc?
                        <Link to="/Signup" className="ml-2 text-charcoalBlack font-bold hover:underline">Join now</Link>
                    </div>
                </div>

                <div className="">
                    <img src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"/>
                </div>

                {/* <Link to="/Home">Go to Home Page</Link>
                <Link to="/MyNetwork">Go to My Network Page</Link>
                <Link to="/post">Preview a Post</Link>
                <Link to="/post/create">Create a new post</Link> */}

            </div>

            <div className="bg-warmWhite w-full mt-35 grid grid-cols-2 gap-15 p-15">
                <div className="flex flex-col gap-4">
                    <h2 className="text-4xl">Explore collaborative articles</h2>
                    <p className="text-2xl">We're unlocking community knowledge in a new way. Experts add insights directly into each article, stated with the help of AI.</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                    {/* HERE WE WILL HAVE A LIST OF BUTTONS */}
                    {buttonsToShow.map((btnText) => <ExploreButtons text={btnText}/>)}
                </div>
            </div>


            <Outlet />
        </div>
    );
}
export default LandPage;