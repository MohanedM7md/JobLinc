import { CompanySidebar } from "../../components/Company/Admin/CompanySidebar ";
import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { CompanyContent } from "../../components/Company/Admin/CompanyContent";
import { useCompanyStore } from "@store/comapny/companyStore";
import LoadingScreen from "../LoadingScreen";
import { enterAdminPage } from "@services/api/companyServices";
import { useParams } from "react-router-dom";
import store from "@store/store";
import { updateAccessToken } from "@store/user/userSlice";
import { refreshToken } from "@services/api/authService";
export default function Admin() {
  const { company, loading, error, resetCompany, fetchAdminCompany } =
    useCompanyStore();
  const { companyId } = useParams<string>();
  const [activeContent, setActiveContent] = useState("Dashboard");
  const [err, setErrPage] = useState<string | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (companyId) {
      (async () => {
        try {
          await enterAdminPage(companyId);
          await fetchAdminCompany();
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
        localStorage.removeItem("companyId");
        // store.dispatch(updateAccessToken(""));
        refreshToken();
      };
    }
  }, [companyId]);

  if (err) return <div>Error: {err}</div>;
  if (loading) return <LoadingScreen />;
  if (!company) return <div>No company data found</div>;

  return (
    <div className="flex h-screen relative">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      <div
        className={`
        fixed lg:relative lg:block
        h-full
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        z-40
        w-64
        overflow-y-auto
      bg-white    
        shadow-lg     
        lg:shadow-none
      `}
      >
        <CompanySidebar
          activeContent={activeContent}
          setActiveContent={(content) => {
            setActiveContent(content);
            setIsSidebarOpen(false); // Close sidebar on mobile when selecting item
          }}
        />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <CompanyContent
          activeContent={activeContent}
          setActiveContent={setActiveContent}
        />
      </div>
    </div>
  );
}
