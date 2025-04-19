import { CompanyEditModal } from "./Edit modal/CompanyEditModal";
import { useState, useCallback, useMemo } from "react";
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
  X,
} from "lucide-react";

export function CompanySidebar() {
  const [companyImageUrl] = useState("/placeholder.svg");
  const [companyLogoUrl] = useState("/placeholder.svg");
  const [companyName] = useState<string | null>("");
  const [followers] = useState(1);
  const [activeContent, setActiveContent] = useState("Dashboard");
  const onclose = useCallback(() => {
    setActiveContent("Dashboard");
  }, []);
  const mainMenuItems = useMemo(
    () => [
      {
        icon: LayoutDashboard,
        title: "Dashboard",
        content: <DashboardContent />,
      },
      {
        icon: FileText,
        title: "Page posts",
        content: <div>Posts Content</div>,
      },
      {
        icon: BarChart2,
        title: "Analytics",
        content: <div>Analytics Content</div>,
      },
      { icon: Rss, title: "Feed", content: <div>Feed Content</div> },
      { icon: Bell, title: "Activity", content: <div>Activity Content</div> },
      { icon: Inbox, title: "Inbox", content: <div>Inbox Content</div> },
      {
        icon: Edit,
        title: "Edit page",
        content: (
          <>
            <CompanyEditModal onClose={onclose} />
          </>
        ),
      },
    ],
    [],
  );

  const jobsMenuItems = [
    { icon: Briefcase, title: "Jobs", content: <div>Jobs Content</div> },
  ];

  const premiumMenuItems = [
    {
      icon: Star,
      title: "Try Premium Page",
      content: <div>Premium Content</div>,
    },
    {
      icon: BadgePercent,
      title: "Advertise today",
      content: <div>Advertise Content</div>,
    },
    { icon: Settings, title: "Settings", content: <div>Settings Content</div> },
  ];

  const allItems = [...mainMenuItems, ...jobsMenuItems, ...premiumMenuItems];
  const currentContent = allItems.find((item) => item.title === activeContent)
    ?.content || <DashboardContent />;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-darkGray border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-0">
          <div className="relative">
            <div className="h-24 w-full overflow-hidden">
              <img
                src={companyImageUrl}
                className="w-full h-full object-cover bg-crimsonRed/10"
                alt="Company cover"
              />
              <button
                aria-label="Edit cover image"
                className="absolute right-2 top-2 bg-white dark:bg-darkGray p-1 rounded-full shadow-md"
              >
                <Edit className="h-4 w-4 text-mutedSilver" />
              </button>
            </div>

            <div className="absolute -bottom-6 left-4">
              <div className="w-16 h-16 rounded-md overflow-hidden border-2 border-white dark:border-darkGray bg-white dark:bg-darkGray">
                <img
                  src={companyLogoUrl}
                  className="w-full h-full object-cover"
                  alt="Company logo"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 px-4">
            <h1 className="text-xl font-semibold text-charcoalBlack dark:text-charcoalWhite">
              {companyName}
            </h1>
            <a
              href="/followers"
              className="text-xs text-mutedSilver hover:underline"
            >
              {followers} {followers === 1 ? "follower" : "followers"}
            </a>

            <div className="flex gap-2 mt-3">
              <button className="flex items-center text-xs gap-1 px-3 py-1.5 bg-transparent border border-mutedSilver rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-charcoalBlack dark:text-charcoalWhite">
                <span className="text-lg">+</span> Create
              </button>
              <button className="flex items-center text-xs gap-1 px-3 py-1.5 bg-transparent border border-mutedSilver rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-charcoalBlack dark:text-charcoalWhite">
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
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${item.title === activeContent ? "bg-crimsonRed/10 text-crimsonRed" : "text-charcoalBlack dark:text-charcoalWhite hover:bg-gray-100 dark:hover:bg-gray-700"}`}
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
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${item.title === activeContent ? "bg-crimsonRed/10 text-crimsonRed" : "text-charcoalBlack dark:text-charcoalWhite hover:bg-gray-100 dark:hover:bg-gray-700"}`}
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
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${item.title === activeContent ? "bg-crimsonRed/10 text-crimsonRed" : "text-charcoalBlack dark:text-charcoalWhite hover:bg-gray-100 dark:hover:bg-gray-700"}`}
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
          © 2025 JobLinc. All rights reserved.
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-6">
        {currentContent}
      </div>
    </div>
  );
}

// Example content component (you can replace with your actual content components)
function DashboardContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>This is your dashboard content. Replace with your actual component.</p>
    </div>
  );
}
