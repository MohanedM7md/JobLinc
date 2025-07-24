import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-warmWhite text-charcoalBlack px-6 md:px-12 lg:px-24 py-16 lg:py-24">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-crimsonRed">404</h1>
        <h2 className="text-2xl lg:text-3xl font-bold text-darkBurgundy mt-4">
          Page Not Found
        </h2>
        <p className="mt-4 text-mutedSilver text-lg">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <p className="mt-2 text-mutedSilver text-lg">
          Please check the URL or return to the homepage.
        </p>
        <Link to={"/"}>
          <button className="mt-6 px-8 py-3 text-lg font-semibold bg-crimsonRed text-warmWhite rounded-md hover:bg-hoverSoftRed transition duration-300 focus:outline-none focus:ring-2 focus:ring-softRosewood focus:ring-opacity-50">
            Go back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
