import { CompanySidebar } from "../../components/Company/Admin/CompanySidebar ";
import { CompanyContent } from "../../components/Company/Admin/CompanyContent";
import { useCompanyStore } from "@store/comapny/companyStore";
import LoadinScreen from "../LoadingScreen";
import { useEffect, useState } from "react";
import { enterAdminPage } from "@services/api/companyServices";
import { useParams } from "react-router-dom";
export default function Admin() {
  const { company, loading, error, fetchCompany } = useCompanyStore();
  const { companyId } = useParams<string>();
  const [activeContent, setActiveContent] = useState("Dashboard");
  useEffect(() => {
    if (companyId) {
      (async () => {
        await enterAdminPage(companyId);
        await fetchCompany();
      })();
    }
  }, []);

  if (loading) return <LoadinScreen />;
  if (error) return <div>Error: {error}</div>;
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
