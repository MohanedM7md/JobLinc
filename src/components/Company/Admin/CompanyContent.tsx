import { CompanyEditModal } from "./Edit modal/CompanyEditModal";
import SettingsContent from "./Settings/SettingsContent";
import ManageFollowers from "./Settings/CompanyContentPages/ManageFollowers";
import PostsContent from "@pages/Company/Cards/PostsContent";
import { useState } from "react";
import AdminJobApplicants from "../Jobs/AdminJobApplicants";

type CompanyContentProps = {
  activeContent: string;
  setActiveContent: (activeContent: string) => void;
};

export function CompanyContent({
  activeContent,
  setActiveContent,
}: CompanyContentProps) {
  const [selectedJob, setSelectedJob] = useState<{ id: string } | null>(null);

  const getContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>
              This is your dashboard content. Replace with your actual
              component.
            </p>
          </div>
        );
      case "Page posts":
        return <PostsContent />;
      case "Manage Followers":
        return <ManageFollowers />;
      case "Feed":
        return <div>Feed Content</div>;
      case "Activity":
        return <div>Activity Content</div>;
      case "Inbox":
        return <div>Inbox Content</div>;
      case "Edit page":
        return (
          <CompanyEditModal
            onClose={() => {
              setActiveContent("Dashboard");
            }}
          />
        );
      case "Jobs":
        return (<AdminJobApplicants/>);
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
