import { ArrowRight } from "lucide-react";

const SettingsPage = () => {
  const menuItems = [
    {
      id: "manage-admins",
      title: "Manage admins",
      subtitle: "Control who manages your page",
      href: "#",
    },
    {
      id: "restricted-members",
      title: "Manage restricted members",
      subtitle: "See all the restricted members",
      href: "#",
    },
    {
      id: "following",
      title: "Manage following",
      subtitle: "See all the pages your page follows",
      href: "#",
    },
    {
      id: "inbox-settings",
      title: "Inbox settings",
      subtitle:
        "Choose whether members can message the page and select conversation topics",
      href: "#",
    },
    {
      id: "job-posting",
      title: "Job posting",
      subtitle: "Manage who can post jobs and how jobs are shared on your page",
      href: "#",
    },
    {
      id: "deactivate-page",
      title: "Deactivate page",
      subtitle: "Take your page down",
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-warmWhite p-6 dark:bg-warmBlack">
      <div className="mx-auto max-w-3xl rounded-lg bg-lightGray shadow-sm dark:bg-darkGray">
        {/* Header */}
        <div className="border-b border-softRosewood/20 p-6 dark:border-mutedSilver/20">
          <h2 className="text-2xl font-bold text-charcoalBlack dark:text-charcoalWhite">
            Settings
          </h2>
        </div>

        {/* Menu Items */}
        <ul className="divide-y divide-softRosewood/20 dark:divide-mutedSilver/20">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="block px-6 py-4 transition-colors duration-200 hover:bg-SoftRed dark:hover:bg-darkBurgundy/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-charcoalBlack dark:text-charcoalWhite">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-mutedSilver dark:text-mutedSilver/80">
                      {item.subtitle}
                    </p>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 text-mutedSilver dark:text-mutedSilver/60"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingsPage;
