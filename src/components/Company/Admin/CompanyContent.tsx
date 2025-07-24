import { CompanyEditModal } from "./Edit modal/CompanyEditModal";
import SettingsContent from "./Settings/SettingsContent";
import ManageFollowers from "./CompanyContentPages/ManageFollowers";
import PostsContent from "@pages/Company/Cards/PostsContent";
import CompanyDashboard from "./CompanyContentPages/Dashboard/Dashboard";
type CompanyContentProps = {
  activeContent: string;
  setActiveContent: (activeContent: string) => void;
};

export function CompanyContent({
  activeContent,
  setActiveContent,
}: CompanyContentProps) {
  const getContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return <CompanyDashboard />;
      case "Page posts":
        return <PostsContent />;
      case "Manage Followers":
        return <ManageFollowers />;
      case "Edit page":
        return (
          <CompanyEditModal
            onClose={() => {
              setActiveContent("Dashboard");
            }}
          />
        );
      case "Jobs":
        return <div>Jobs Content</div>;
      case "Try Premium Page":
        return <div>Premium Content</div>;
      case "Advertise today":
        return <div>Advertise Content</div>;
      case "Settings":
        return <SettingsContent />;
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>
              This is your dashboard content. Replace with your actual
              component.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">
      {getContent()}
    </div>
  );
}
