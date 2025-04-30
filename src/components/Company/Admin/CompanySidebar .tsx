import { useCompanyStore } from "@store/comapny/companyStore";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Rss,
  Bell,
  Inbox,
  Edit,
  Briefcase,
  Star,
  BadgePercent,
  Settings,
  Eye,
} from "lucide-react";
import { FileUploadIcon } from "../Inputs";
import { updateInfo } from "@services/api/companyServices";
import { useNavigate } from "react-router-dom";
import { CompanySidebarProps } from "../interfaces/company.interface";
export function CompanySidebar({
  activeContent,
  setActiveContent,
}: CompanySidebarProps) {
  const { company } = useCompanyStore();
  const [coverPhoto, setCoverPhoto] = useState<string | undefined>(
    company?.coverPhoto,
  );

  const date = new Date();

  const mainMenuItems = [
    { icon: LayoutDashboard, title: "Dashboard" },
    { icon: FileText, title: "Page posts" },
    { icon: BarChart2, title: "Manage Followers" },
    { icon: Rss, title: "Feed" },
    { icon: Bell, title: "Activity" },
    { icon: Inbox, title: "Inbox" },
    { icon: Edit, title: "Edit page" },
  ];

  const jobsMenuItems = [{ icon: Briefcase, title: "Jobs" }];

  const premiumMenuItems = [
    { icon: Star, title: "Try Premium Page" },
    { icon: BadgePercent, title: "Advertise today" },
    { icon: Settings, title: "Settings" },
  ];
  const navigate = useNavigate();
  return (
    <div className="w-64 bg-white dark:bg-darkGray border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-0">
        <div className="relative">
          <div className="h-24 w-full overflow-hidden">
            <img
              src={coverPhoto}
              className="w-full h-full object-cover bg-crimsonRed/10"
              alt="Company cover"
            />
            <button
              aria-label="Edit cover image"
              className="absolute right-2 top-2 bg-white dark:bg-darkGray p-1 rounded-full shadow-md"
            >
              <FileUploadIcon
                icon={<Edit />}
                accept="image/*"
                onChange={(file: string | null) => {
                  setCoverPhoto(file || undefined);
                  updateInfo({ coverPhoto: file || "" }); // THERE WAS A SMALL ERROR HERE SO I ADDED || ""
                }}
              />
            </button>
          </div>

          <div className="absolute -bottom-6 left-4">
            <div className="w-16 h-16 rounded-md overflow-hidden border-2 border-white dark:border-darkGray bg-white dark:bg-darkGray">
              <img
                src={company?.logo}
                className="w-full h-full object-cover"
                alt="Company logo"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 px-4">
          <h1 className="text-xl font-semibold text-charcoalBlack dark:text-charcoalWhite">
            {company?.name}
          </h1>
          <a
            href="/followers"
            className="text-xs text-mutedSilver hover:underline"
          >
            {company?.followers}{" "}
            {company?.followers === 1 ? "follower" : "followers"}
          </a>

          <div className="flex gap-2 mt-3">
            <button className="flex items-center text-xs gap-1 px-3 py-1.5 bg-transparent border border-mutedSilver rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-charcoalBlack dark:text-charcoalWhite"
                    onClick={() => {navigate("/company/setup/new")}}>
              <span className="text-lg">+</span> Create
            </button>
            <button
              className="flex items-center text-xs gap-1 px-3 py-1.5 bg-transparent border border-mutedSilver rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-charcoalBlack dark:text-charcoalWhite"
              onClick={() => {
                navigate(`/company/member-view/${company?.urlSlug}`);
              }}
            >
              <Eye className="h-3 w-3" /> View as member
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="mb-4">
          <ul className="space-y-1">
            {mainMenuItems.map((item) => (
              <li key={item.title}>
                <button
                  onClick={() => setActiveContent(item.title)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${
                    item.title === activeContent
                      ? "bg-crimsonRed/10 text-crimsonRed"
                      : "text-charcoalBlack dark:text-charcoalWhite hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

        <div className="mb-4">
          <h3 className="px-4 text-xs font-semibold text-mutedSilver uppercase tracking-wider mb-2">
            Jobs
          </h3>
          <ul className="space-y-1">
            {jobsMenuItems.map((item) => (
              <li key={item.title}>
                <button
                  onClick={() => setActiveContent(item.title)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${
                    item.title === activeContent
                      ? "bg-crimsonRed/10 text-crimsonRed"
                      : "text-charcoalBlack dark:text-charcoalWhite hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

        <div className="mb-4">
          <h3 className="px-4 text-xs font-semibold text-mutedSilver uppercase tracking-wider mb-2">
            Premium
          </h3>
          <ul className="space-y-1">
            {premiumMenuItems.map((item) => (
              <li key={item.title}>
                <button
                  onClick={() => setActiveContent(item.title)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${
                    item.title === activeContent
                      ? "bg-crimsonRed/10 text-crimsonRed"
                      : "text-charcoalBlack dark:text-charcoalWhite hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-4 py-2 text-xs text-mutedSilver border-t border-gray-200 dark:border-gray-700">
        © {date.getFullYear()} JobLinc. All rights reserved.
      </div>
    </div>
  );
}
