import { CompanySidebar } from "../../components/Company/Admin/CompanySidebar ";
import { CompanyContent } from "../../components/Company/Admin/CompanyContent";
import { useCompanyStore } from "@store/comapny/companyStore";
import LoadingScreen from "../LoadingScreen";
import { useEffect, useState } from "react";
import { enterAdminPage } from "@services/api/companyServices";
import { useParams } from "react-router-dom";
export default function Admin() {
  const { company, loading, error, resetCompany, fetchAdminCompany } =
    useCompanyStore();
  const { companyId } = useParams<string>();
  const [activeContent, setActiveContent] = useState("Dashboard");
  const [err, setErrPage] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (companyId) {
      (async () => {
        try {
          await enterAdminPage(companyId);
          fetchAdminCompany();
        } catch (err) {
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

  if (err) return <div>Error: {err}</div>;
  if (loading) return <LoadingScreen />;
  if (!company) return <div>No company data found</div>;

  return (
    <>
      <div className="flex h-screen">
        <CompanySidebar
          activeContent={activeContent}
          setActiveContent={setActiveContent}
        />
        <CompanyContent
          activeContent={activeContent}
          setActiveContent={setActiveContent}
        />
      </div>
    </>
  );
}
