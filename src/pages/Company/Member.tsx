import { useEffect, useState } from "react";
import { useCompanyStore } from "@store/comapny/companyStore";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "@pages/LoadingScreen";
import Overview from "./Cards/Overview";
import Posts from "./Cards/Posts";
import Jobs from "./Cards/Jobs";
import { Plus, UserMinus } from "lucide-react";
import CompanyFooter from "./Cards/CompanyFooter";
import { getMyCompanies } from "@services/api/userProfileServices";
import { Company } from "@store/comapny/interfaces";
import HomeTab from "./Cards/HomeTab";
import {
  sendFollowRequest,
  sendUnfollowRequest,
} from "@services/api/networkServices";
import Modal from "@components/utils/Modal";

function Member() {
  const { company, loading, error, fetchCompany, resetCompany } =
    useCompanyStore();
  const [isTheUserAdmin, setIsTheUserAdmin] = useState(false);
  const [userCompanies, setUserCompanies] = useState<Company[]>([]);
  const { slug } = useParams<string>();
  const navigate = useNavigate();

  const [err, setErrPage] = useState<string | undefined>(undefined);

  const [unfollowModal, setUnfollowModal] = useState(false);
  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          const response = await getMyCompanies();
          setUserCompanies(response.data);

          // setUserCompanies(response.data);
          // console.log(userCompanies);
          for (let i = 0; i < response.data.length; i++) {
            if (response.data.at(i)?.id === company?.id) {
              setIsTheUserAdmin(true);
              break;
            }
          }
        } catch (err: any) {
          if (err.response?.status === 401) {
            setErrPage("Unauthorized");
          } else {
            setErrPage("An error occurred");
          }
          console.error("Error occurred while fetching company data:", err);
        }
      })();
    }
  }, [company]);

  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          const isFollowing = await fetchCompany(slug);
          setIsFollowed(isFollowing);
          console.log("company aheh", company);
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
    {
      text: "Home",
      content: (
        <HomeTab
          company={company || undefined}
          setActive={setNavItemSelected}
        />
      ),
    },
    { text: "About", content: <Overview company={company || undefined} /> },
    { text: "Posts", content: <Posts company={company || undefined} /> },
    { text: "Jobs", content: <Jobs /> },
  ];
  const selectedNavItem = navItems.find(
    (item) => item.text === navItemSelected,
  );

  const [isFollowed, setIsFollowed] = useState(false);

  if (error) return <div>Error: {err}</div>;
  if (loading) return <LoadingScreen />;
  if (!company) return <div>No company data found</div>;

  async function handleFollow() {
    try {
      if (!isFollowed) {
        const response = await sendFollowRequest(company?.id || "");
        if (response.status === 200) {
          setIsFollowed(true);
        }
      } else {
        setUnfollowModal(true);
      }
    } catch (error) {
      console.error("Error following the company ", error);
    }
  }

  async function handleUnfollow() {
    try {
      const response = await sendUnfollowRequest(company?.id || "");
      if (response.status === 200) {
        setIsFollowed(false);
        setUnfollowModal(false);
      }
    } catch (error) {
      console.error("Error unfollowing the company ", error);
    }
  }

  return (
    <div className="min-h-screen w-full bg-warmWhite flex flex-col items-center">
      {/* Top Bar - Responsive Layout */}
      {isTheUserAdmin && (
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
        </div>
      )}

      <div className="w-full max-w-7xl mx-4 md:mx-8 lg:mx-auto bg-white rounded-xl shadow-sm">
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
              {company.industry} • {company.followers} followers •{" "}
              {company.employees} employees
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isFollowed
                    ? "bg-white text-crimsonRed border border-crimsonRed hover:bg-red-50"
                    : "bg-crimsonRed text-white hover:bg-darkBurgundy"
                }`}
                onClick={handleFollow}
              >
                {isFollowed ? (
                  <UserMinus className="w-3.5 h-3.5" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
                <span>{isFollowed ? "Following" : "Follow"}</span>
              </button>

              <Modal
                isOpen={unfollowModal}
                onClose={() => setUnfollowModal(false)}
              >
                <div className="flex flex-col gap-3 justify-center">
                  <h3 className="text-center font-semibold">
                    Are you sure you want to unfollow?
                  </h3>
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                    onClick={() => setUnfollowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    onClick={handleUnfollow}
                  >
                    Unfollow
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </div>

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

      <div className="w-full max-w-7xl mx-4 md:mx-8 lg:mx-auto rounded-xl">
        {selectedNavItem?.content}
      </div>

      <CompanyFooter />
    </div>
  );
}

export default Member;
