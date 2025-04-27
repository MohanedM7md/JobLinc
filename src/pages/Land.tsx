import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import SignMain from "../components/Authentication/Headers/SignMain";
import {
  AuthenticationGoogleButton,
  AuthenticationMicrosoftButton,
  AuthenticationSignInButton,
} from "../components/Authentication/AuthenticationButtons";
import ExploreButtons, {
  buttonsArticles,
  buttonsJobs,
  buttonsMoreJobs,
  buttonsSoftware,
  buttonsGames,
} from "../components/utils/ExploreButtons";
import Features from "../components/utils/ImportantFeatures";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Logo from "../components/utils/Logo";

function LandPage() {
  const navigate = useNavigate();
  const [showMoreJobs, setShowMoreJobs] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const currentYear = new Date().getFullYear();

  const handlePrevFeature = () => {
    setCurrentFeatureIndex((prevIndex) =>
      prevIndex === 0 ? Features.length - 1 : prevIndex - 1,
    );
  };

  const handleNextFeature = () => {
    setCurrentFeatureIndex((prevIndex) =>
      prevIndex === Features.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="flex flex-col">
      <SignMain />
      {/* Welcome Section */}
      <div className="relative top-20 md:top-40 flex w-full justify-center p-4 md:p-5 lg:gap-12 xl:gap-20 flex-col md:flex-row">
        <div className="flex flex-col gap-4 w-full max-w-xl mx-auto md:mx-0 md:w-auto px-4 md:px-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-10 text-center md:text-left">
            Welcome to your professional community
          </h1>
          <div className="w-full flex flex-col gap-4">
            <AuthenticationGoogleButton />
            <div onClick={() => navigate("/Signin")}>
              <AuthenticationSignInButton
                id="navigate-to-sign-in"
                text="Sign in with email"
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center">
            <div className="text-xs sm:text-sm md:text-[15px] text-mutedSilver mb-3 text-center">
              By clicking Continue to join or sign in, you agree to the
              JobLinc's{" "}
              <span className="text-softRosewood font-semibold hover:underline hover:cursor-pointer">
                User Agreement
              </span>
              ,{" "}
              <span className="text-softRosewood font-semibold hover:underline hover:cursor-pointer">
                Privacy Policy
              </span>
              ,{" "}
              <span className="text-softRosewood font-semibold hover:underline hover:cursor-pointer">
                Cookie Policy.
              </span>
            </div>
          </div>

          <div className="text-charcoalBlack flex justify-center text-sm sm:text-base md:text-[18px]">
            New to JobLinc?
            <Link
              to="/Signup"
              className="ml-2 text-charcoalBlack font-bold hover:underline"
            >
              Join now
            </Link>
          </div>
        </div>

        <div className="mt-8 md:mt-0 max-w-xl md:max-w-2xl mx-auto md:mx-0">
          <img 
            src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4" 
            className="w-full h-auto object-contain"
            alt="Professional community"
          />
        </div>
      </div>

      {/* Explore collaborative articles */}
      <div className="bg-warmWhite w-full mt-20 md:mt-35 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-15 p-6 md:p-15">
        <div className="flex flex-col gap-4 mb-6 md:mb-0">
          <h2 className="text-2xl md:text-4xl">Explore collaborative articles</h2>
          <p className="text-lg md:text-2xl">
            We're unlocking community knowledge in a new way. Experts add
            insights directly into each article, stated with the help of AI.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center md:justify-start">
          {buttonsArticles.map((btnText) => (
            <ExploreButtons key={btnText} text={btnText} />
          ))}
        </div>
      </div>

      {/* Explore jobs and internships */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-15 p-6 md:p-15">
        <div className="flex flex-col gap-4 mb-6 md:mb-0">
          <h2 className="text-2xl md:text-4xl">Find the right job or internship for you</h2>
        </div>
        <div className="flex gap-3 flex-wrap justify-center md:justify-start">
          {buttonsJobs.map((btnText) => (
            <ExploreButtons key={btnText} text={btnText} />
          ))}
          {showMoreJobs &&
            buttonsMoreJobs.map((btnText) => (
              <ExploreButtons key={btnText} text={btnText} />
            ))}
          <button
            onClick={() => setShowMoreJobs(!showMoreJobs)}
            className="flex items-center rounded-3xl bg-warmWhite text-base md:text-[18px] font-semibold outline-4 outline-softRosewood px-4 md:px-6 py-2 md:py-3 hover:cursor-pointer w-full md:w-auto justify-center"
          >
            {showMoreJobs ? (
              <>
                Show less <ChevronUpIcon className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Show more <ChevronDownIcon className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Post a job */}
      <div className="bg-warmWhite w-full flex flex-col justify-center items-center gap-8 md:gap-15 p-6 md:p-15">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-2xl md:text-4xl text-softRosewood">
            Post your job for millions of people to see
          </h2>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          <button className="rounded-3xl text-base md:text-[18px] font-semibold outline-3 text-warmBlack outline-softRosewood px-6 py-3 hover:cursor-pointer">
            Post a job
          </button>
        </div>
      </div>

      {/* Discover the best software tools */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-15 p-6 md:p-15">
        <div className="flex flex-col gap-4 mb-6 md:mb-0">
          <h2 className="text-2xl md:text-4xl">Discover the best software tools</h2>
          <p className="text-lg md:text-2xl">
            Connect with buyers who have first-hand experience to find the best
            products for you.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center md:justify-start">
          {buttonsSoftware.map((btnText) => (
            <ExploreButtons key={btnText} text={btnText} />
          ))}
        </div>
      </div>

      {/* Keep your mind sharp with games */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-15 p-6 md:p-15 bg-warmWhite">
        <div className="flex flex-col gap-4 mb-6 md:mb-0">
          <h2 className="text-2xl md:text-4xl">Keep your mind sharp with games</h2>
          <p className="text-lg md:text-2xl">
            Take a break and reconnect with your network through quick daily
            games.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center md:justify-start">
          {buttonsGames.map((btnText) => (
            <ExploreButtons key={btnText} text={btnText} />
          ))}
        </div>
      </div>

      {/* Important Features */}
      <div className="w-full grid grid-cols-1 md:grid-cols-[20%_60%_20%] justify-center items-center gap-6 md:gap-10 p-6 md:p-40">
        <div className="flex items-center justify-center order-2 md:order-1">
          <button
            onClick={handlePrevFeature}
            className="rounded-3xl px-4 md:px-6 py-2 md:py-3 bg-warmWhite text-base md:text-[18px] font-semibold outline-4 text-warmBlack outline-warmBlack hover:cursor-pointer flex items-center w-full md:w-auto justify-center"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
        <div className="order-1 md:order-2 text-center">{Features[currentFeatureIndex]}</div>
        <div className="flex justify-center order-3">
          <button
            onClick={handleNextFeature}
            className="rounded-3xl px-4 md:px-6 py-2 md:py-3 bg-warmWhite text-base md:text-[18px] font-semibold outline-4 text-warmBlack outline-warmBlack hover:cursor-pointer flex items-center w-full md:w-auto justify-center"
          >
            Forward
            <ChevronRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Join JobLinc */}
      <div className="w-full flex flex-col justify-center gap-8 md:gap-15 p-6 md:p-15 bg-gray-100">
        <div className="flex flex-col gap-8 md:gap-15 text-center">
          <h2 className="text-warmBlack text-2xl md:text-4xl">
            Join your colleagues, classmates, and friends on JobLinc
          </h2>
          <div>
            <button className="rounded-3xl px-6 py-3 bg-warmWhite text-base md:text-[18px] font-semibold outline-4 text-softRosewood outline-softRosewood hover:cursor-pointer">
              <Link to="/Signup">Get started</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Browse more */}
      <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-15 p-6 md:p-15 bg-lightGray">
        <div className="md:mr-8 lg:mr-50 flex-shrink-0 mb-8 md:mb-0 text-center md:text-left">
          <Logo />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 w-full">
          <div className="flex flex-col gap-3">
            <strong>General</strong>
            {["Signup", "Help Center", "About", "Press", "Blog", "Careers", "Developers"].map((link) => (
              <Link key={link} className="hover:underline text-sm md:text-base" to="/">
                {link}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <strong>Browse JobLinc</strong>
            {["Learning", "Jobs", "Games", "Salary", "Mobile", "Services", "Products", "Top Companies Hub"].map((link) => (
              <Link key={link} className="hover:underline text-sm md:text-base" to="/">
                {link}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <strong>Business Solutions</strong>
            {["Talent", "Marketing", "Sales", "Learning"].map((link) => (
              <Link key={link} className="hover:underline text-sm md:text-base" to="/">
                {link}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <strong>Directories</strong>
            {["Members", "Jobs", "Companies", "Featured", "Learning", "Posts", "Articles", "Schools", "News", "News Letters", "Services", "Products", "Advice", "People Search"].map((link) => (
              <Link key={link} className="hover:underline text-sm md:text-base" to="/">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full p-6 md:p-10 flex flex-wrap gap-3 md:gap-5 justify-center items-center font-semibold text-sm md:text-base">
        <Logo />
        <p>&copy; {currentYear}</p>
        {["About", "Accessibility", "User Agreement", "Privacy Policy", "Cookie Policy", "Copyright Policy", "Brand Policy", "Guest Controls", "Community Guidelines", "Language"].map((link) => (
          <Link key={link} to="/" className="hover:underline px-2">
            {link}
          </Link>
        ))}
      </footer>

      <Outlet />
    </div>
  );
}

export default LandPage;