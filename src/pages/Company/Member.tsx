import { useEffect, useState } from "react";
import { useCompanyStore } from "@store/comapny/companyStore";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "@pages/LoadingScreen";
import NavBar from "../../components/NavigationBar/NavBar";
import Overview from "./Cards/Overview";
import Posts from "./Cards/Posts";
import Jobs from "./Cards/Jobs";
import { Plus } from "lucide-react";
import CompanyFooter from "./Cards/CompanyFooter";

interface MemberProps {
  isAdmin: boolean;
}

function Member(props: MemberProps) {
  const { company, loading, error, fetchCompany, resetCompany } = useCompanyStore();
  const { slug } = useParams<string>();
  const navigate = useNavigate();

  const [err, setErrPage] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          await fetchCompany(slug);
        } catch (err: any) {
          if (err.response?.status === 401) {
            setErrPage("Unauthorized");
          } else {
            setErrPage("An error occurred");
          }
          console.error("Error occurred while fetching company data:", err);
        }
      })();
      return () => {
        resetCompany();
      };
    }
  }, []);

  const [navItemSelected, setNavItemSelected] = useState<string>("Home");

  const navItems = [
    { text: "Home", content: <div>Home</div> },
    { text: "About", content: <Overview company={company || undefined} /> },
    { text: "Posts", content: <Posts company={company || undefined} /> },
    { text: "Jobs", content: <Jobs /> },
    { text: "People", content: <div>People</div> },
  ];
  const selectedNavItem = navItems.find(
    (item) => item.text === navItemSelected,
  );

  const [isFollowed, setIsFollowed] = useState(false);

  if (error) return <div>Error: {err}</div>;
  if (loading) return <LoadingScreen />;
  if (!company) return <div>No company data found</div>;

  function handleFollow()
  {

  }

  return (
    <div className="min-h-screen w-full bg-warmWhite flex flex-col items-center">
      <NavBar />

      {/* Top Bar - Responsive Layout */}
      {props.isAdmin && 
      <div className="w-full bg-crimsonRed flex flex-col md:flex-row justify-between items-center px-4 py-3 md:px-8 md:py-4 mb-4 md:mb-8">
        <p className="text-white text-sm sm:text-base md:text-lg text-center md:text-left mb-2 md:mb-0">
          You are viewing this page as a member
        </p>
        <button
          className="text-white text-sm sm:text-base bg-transparent border border-white/30 rounded-lg px-3 py-1 md:px-4 md:py-2 hover:bg-white/10 transition-colors"
          onClick={() => navigate(`/company/admin/${company.id}`)}
        >
          View as admin
        </button>
      </div>}

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-4 md:mx-8 lg:mx-auto bg-white rounded-xl shadow-sm">
        {/* Cover Section */}
        <div className="border-b border-gray-200 p-4 md:p-6 lg:p-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-cover"
              src={company.coverPhoto}
              alt="Company cover"
            />
          </div>

          <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              {company.name}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {company.industry} • {company.followers} followers • {company.employees} employees
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                className="flex items-center gap-2 bg-crimsonRed hover:bg-darkBurgundy text-white text-sm sm:text-base px-4 py-2 rounded-lg md:rounded-xl transition-colors"
                onClick={handleFollow}
              >
                <Plus className="w-4 h-4 md:w-5 md:h-5" />
                Follow
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="overflow-x-auto border-b border-gray-200">
          <div className="flex min-w-max px-4 md:px-6">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`px-4 py-3 text-sm sm:text-base ${
                  navItemSelected === item.text
                    ? "border-b-2 border-crimsonRed font-semibold text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setNavItemSelected(item.text)}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>

        
      </div>
      {/* Content Section */}
      <div className="w-full max-w-7xl mx-4 md:mx-8 lg:mx-auto rounded-xl p-4 md:p-6 lg:p-8">
        {selectedNavItem?.content}
      </div>

      <CompanyFooter />
    </div>
  );
}

export default Member;

