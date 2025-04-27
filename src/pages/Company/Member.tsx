import { useEffect, useState } from "react";
import { useCompanyStore } from "@store/comapny/companyStore";
import { useNavigate, useParams } from "react-router-dom";
import { getCompanyBySlug } from "@services/api/companyServices";
import LoadingScreen from "@pages/LoadingScreen";
import NavBar from "../../components/NavigationBar/NavBar";
import Overview from "./Cards/Overview";
import Posts from "./Cards/Posts";
import Jobs from "./Cards/Jobs";
import { Plus } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { EllipsisVertical } from "lucide-react";

function Member() {
  const { company, loading, error, fetchCompany, resetCompany } = useCompanyStore();
  const { slug } = useParams<string>();
  const navigate = useNavigate();

  const [err, setErrPage] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          // await getCompanyBySlug(slug);
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


  useEffect(() => {

  }, [])
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
    <div className="bg-warmWhite min-h-screen w-full flex flex-col items-center">
      <NavBar />

      {/* Top bar (fixed)*/}
      <div className="bg-crimsonRed flex flex-row justify-evenly items-center h-[100px] w-full top-0 mb-10">
        <div>
          <p className="text-white">You are viewing this page as a member</p>
        </div>
        <div>
          <button
            className="text-white rounded-xl outline-1 px-4 py-1 hover:outline-2"
              onClick={() => {
              navigate(`/company/admin/${company.id}`);
            }}
          >
            View as admin
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-white flex flex-col top-[150px] w-[800px]">
        <div className="border-b-1 border-b-gray-600 p-5">
          <div className="img-container flex items-center justify-center">
            <img className="h-[300px] " src={company.coverPhoto} />
          </div>
          <div className="info-container flex flex-col gap-5">
            <h2 className="font-bold text-[32px]">{company.name}</h2>
            <p className="text-[18px] text-gray-500">
              {company.industry} . {company.followers} followers .{" "}
              {company.employees} employees
            </p>
            <div className="flex gap-8">
              <button className="bg-crimsonRed text-white px-5 py-2 rounded-2xl hover:cursor-pointer hover:bg-darkBurgundy flex gap-2 font-semibold" onClick={handleFollow}>
                {" "}
                <Plus /> Follow
              </button>
              {/* <button className="px-5 py-2 rounded-2xl hover:cursor-pointer outline-1 outline-crimsonRed hover:outline-2 flex gap-2 font-semibold">
                {" "}
                <MessageCircle /> Message
              </button> */}
              {/* <button className="outline-1 w-[40px] font-bold px-2 py-2 rounded-4xl hover:outline-2 hover:cursor-pointer flex justify-center items-center">
                {" "}
                <EllipsisVertical />{" "}
              </button> */}
            </div>
          </div>
        </div>
        <div className="nav-container flex items-center gap-7">
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`${navItemSelected === item.text && "border-b-3 border-b-crimsonRed"} hover:cursor-pointer p-5`}
              onClick={() => {
                setNavItemSelected(item.text);
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>

      <div className="item-content mt-5 w-[800px] mb-5">
        {selectedNavItem?.content}
      </div>
    </div>
  );
}

export default Member;

