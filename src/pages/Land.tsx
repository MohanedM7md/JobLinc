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
<<<<<<< HEAD
} from "lucide-react"; // Import Heroicons
import Logo from "../components/NavigationBar/Logo"; // Update the path to the correct location
=======
} from "lucide-react";
import Logo from "../components/utils/Logo";
>>>>>>> e758714ce1fbce6afadd25890fb9ac661b6854ea

function LandPage() {
  const navigate = useNavigate();
  const [showMoreJobs, setShowMoreJobs] = useState(false); // State to manage visibility of additional buttons
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0); // State to manage current feature index
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
      <div className="relative top-40 flex w-full justify-center p-5 gap-50">
        <div className="flex flex-col gap-4 w-130">
          <h1 className="text-5xl mb-10">
            Welcome to your professional community
          </h1>
          <AuthenticationGoogleButton />
          <AuthenticationMicrosoftButton />
          <div onClick={() => navigate("/Signin")}>
            <AuthenticationSignInButton
              id="navigate-to-sign-in"
              text="Sign in with email"
            />
          </div>

          {/* Span Elements should be Link Elements, To be modified when we have their pages ready */}
          <div className="flex w-full flex-col items-center justify-center">
            <div className="text-[15px] text-mutedSilver mb-3">
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

          <div className="text-charcoalBlack flex justify-center text-[18px]">
            New to JobLinc?
            <Link
              to="/Signup"
              className="ml-2 text-charcoalBlack font-bold hover:underline"
            >
              Join now
            </Link>
          </div>
        </div>

        <div className="">
          <img src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4" />
        </div>
      </div>

      {/* Explore collaborative articles */}
      <div className="bg-warmWhite w-full mt-35 grid grid-cols-2 gap-15 p-15">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl">Explore collaborative articles</h2>
          <p className="text-2xl">
            We're unlocking community knowledge in a new way. Experts add
            insights directly into each article, stated with the help of AI.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {/* HERE WE WILL HAVE A LIST OF BUTTONS */}
          {buttonsArticles.map((btnText) => (
            <ExploreButtons key={btnText} text={btnText} />
          ))}
        </div>
      </div>

      {/* Explore jobs and internships */}
      <div className="w-full grid grid-cols-2 gap-15 p-15">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl">Find the right job or internship for you</h2>
        </div>
        <div className="flex gap-3 flex-wrap">
          {/* HERE WE WILL HAVE A LIST OF BUTTONS */}
          {buttonsJobs.map((btnText) => (
            <ExploreButtons key={btnText} text={btnText} />
          ))}
          {showMoreJobs &&
            buttonsMoreJobs.map((btnText) => (
              <ExploreButtons key={btnText} text={btnText} />
            ))}
          <button
            onClick={() => setShowMoreJobs(!showMoreJobs)}
            className="flex items-center rounded-3xl bg-warmWhite text-[18px] font-semibold outline-4 outline-softRosewood px-6 py-3 hover:cursor-pointer"
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
      <div className="bg-warmWhite w-full flex flex-col justify-center items-center gap-15 p-15">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl text-softRosewood">
            Post your job for millions of people to see
          </h2>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button className="rounded-3xl text-[18px] font-semibold outline-3 text-warmBlack outline-softRosewood px-6 py-3 hover:cursor-pointer">
            Post a job
          </button>
        </div>
      </div>

      {/* Discover the best software tools */}
      <div className="w-full grid grid-cols-2 gap-15 p-15">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl">Discover the best software tools</h2>
          <p className="text-2xl">
            Connect with buyers who have first-hand experience to find the best
            products for you.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {/* HERE WE WILL HAVE A LIST OF BUTTONS */}
          {buttonsSoftware.map((btnText) => (
            <ExploreButtons key={btnText} text={btnText} />
          ))}
        </div>
      </div>

      {/* Keep your mind sharp with games */}
      <div className="w-full grid grid-cols-2 gap-15 p-15 bg-warmWhite">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl">Keep your mind sharp with games</h2>
          <p className="text-2xl">
            Take a break and reconnect with your network through quick daily
            games.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {/* HERE WE WILL HAVE A LIST OF BUTTONS */}
          {buttonsGames.map((btnText) => (
            <ExploreButtons key={btnText} text={btnText} />
          ))}
        </div>
      </div>

      {/* Important Features (Connections, Conversations, stay up-to-date ) */}
      <div className="w-full grid grid-cols-[20%_60%_20%] justify-center items-center gap-10 p-40">
        <div className="flex items-center justify-center w-full">
          <button
            onClick={handlePrevFeature}
            className="rounded-3xl px-6 py-3 bg-warmWhite text-[18px] font-semibold outline-4 text-warmBlack outline-warmBlack hover:cursor-pointer flex items-center"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
        <div>{Features[currentFeatureIndex]}</div>
        <div className="flex justify-center w-full">
          <button
            onClick={handleNextFeature}
            className="rounded-3xl px-6 py-3 bg-warmWhite text-[18px] font-semibold outline-4 text-warmBlack outline-warmBlack hover:cursor-pointer flex items-center"
          >
            Forward
            <ChevronRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Join JobLinc */}
      <div
        className="w-full flex flex-col justify-center gap-15 p-15"
        style={{
          backgroundImage: "url(https://example.com/your-image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-15">
          <h2 className="text-warmBlack text-4xl">
            Join your colleagues, classmates, and friends on JobLinc
          </h2>
          <div>
            <button
              className={`rounded-3xl px-6 py-3 bg-warmWhite text-[18px] font-semibold outline-4 text-softRosewood outline-softRosewood hover:cursor-pointer`}
            >
              <Link to="/Signup">Get started</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Browse more */}
      <div className="w-full flex justify-center items-stretch gap-15 p-15 bg-lightGray">
        <div className="mr-50 flex-shrink-0">
          <Logo />
        </div>
        <div className="flex flex-col gap-5">
          <strong>General</strong>
          <Link className="hover:underline" to="/Signup">
            Signup
          </Link>
          <Link className="hover:underline" to="/">
            Help Center
          </Link>
          <Link className="hover:underline" to="/">
            About
          </Link>
          <Link className="hover:underline" to="/">
            Press
          </Link>
          <Link className="hover:underline" to="/">
            Blog
          </Link>
          <Link className="hover:underline" to="/">
            Careers
          </Link>
          <Link className="hover:underline" to="/">
            Developers
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <strong>Browse JobLinc</strong>
          <Link className="hover:underline" to="/">
            Learning
          </Link>
          <Link className="hover:underline" to="/">
            Jobs
          </Link>
          <Link className="hover:underline" to="/">
            Games
          </Link>
          <Link className="hover:underline" to="/">
            Salary
          </Link>
          <Link className="hover:underline" to="/">
            Mobile
          </Link>
          <Link className="hover:underline" to="/">
            Services
          </Link>
          <Link className="hover:underline" to="/">
            Products
          </Link>
          <Link className="hover:underline" to="/">
            Top Companies Hub
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <strong>Business Solutions</strong>
          <Link className="hover:underline" to="/">
            Talent
          </Link>
          <Link className="hover:underline" to="/">
            Marketing
          </Link>
          <Link className="hover:underline" to="/">
            Sales
          </Link>
          <Link className="hover:underline" to="/">
            Learning
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <strong>Directories</strong>
          <Link className="hover:underline" to="/">
            Members
          </Link>
          <Link className="hover:underline" to="/">
            Jobs
          </Link>
          <Link className="hover:underline" to="/">
            Companies
          </Link>
          <Link className="hover:underline" to="/">
            Featured
          </Link>
          <Link className="hover:underline" to="/">
            Learning
          </Link>
          <Link className="hover:underline" to="/">
            Posts
          </Link>
          <Link className="hover:underline" to="/">
            Articles
          </Link>
          <Link className="hover:underline" to="/">
            Schools
          </Link>
          <Link className="hover:underline" to="/">
            News
          </Link>
          <Link className="hover:underline" to="/">
            News Letters
          </Link>
          <Link className="hover:underline" to="/">
            Services
          </Link>
          <Link className="hover:underline" to="/">
            Products
          </Link>
          <Link className="hover:underline" to="/">
            Advice
          </Link>
          <Link className="hover:underline" to="/">
            People Search
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full p-10 flex gap-5 justify-center items-center font-semibold">
        <Logo />
        <p>&copy; {currentYear}</p>
        <Link to="/">About</Link>
        <Link to="/">Accessibility</Link>
        <Link to="/">User Agreement</Link>
        <Link to="/">Privacy Policy</Link>
        <Link to="/">Cookie Policy</Link>
        <Link to="/">Copyright Policy</Link>
        <Link to="/">Brand Policy</Link>
        <Link to="/">Guest Controls</Link>
        <Link to="/">Community Guidelines</Link>
        <Link to="/">Language</Link>
      </footer>

      <Outlet />
    </div>
  );
}

export default LandPage;
