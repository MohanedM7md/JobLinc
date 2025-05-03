import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ManageAdmins from "./ManageAdmins";
import DeactivatePage from "./CompanyContentPages/DeactivatePage";
// Dummy components (replace with real ones)

const RestrictedMembers = () => <div>Restricted Members Component</div>;
const Following = () => <div>Following Component</div>;
const InboxSettings = () => <div>Inbox Settings Component</div>;
const JobPosting = () => <div>Job Posting Component</div>;

const menuItems = [
  {
    id: "manage-admins",
    title: "Manage admins",
    subtitle: "Control who manages your page",
    component: <ManageAdmins />,
  },
  {
    id: "restricted-members",
    title: "Manage restricted members",
    subtitle: "See all the restricted members",
    component: <RestrictedMembers />,
  },
  {
    id: "following",
    title: "Manage following",
    subtitle: "See all the pages your page follows",
    component: <Following />,
  },
  {
    id: "inbox-settings",
    title: "Inbox settings",
    subtitle:
      "Choose whether members can message the page and select conversation topics",
    component: <InboxSettings />,
  },
  {
    id: "job-posting",
    title: "Job posting",
    subtitle: "Manage who can post jobs and how jobs are shared on your page",
    component: <JobPosting />,
  },
  {
    id: "deactivate-page",
    title: "Deactivate page",
    subtitle: "Take your page down",
    component: <DeactivatePage />,
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const modalVariants = {
  hidden: { opacity: 0, y: "-10%", scale: 0.95 },
  visible: {
    opacity: 1,
    y: "0%",
    scale: 1,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  exit: { opacity: 0, y: "10%", scale: 0.95, transition: { duration: 0.2 } },
};

const SettingsContent = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const selectedItem = menuItems.find((item) => item.id === activeModal);
  const[deleteCompanyModal, setDeleteCompanyModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmWhite via-warmWhite-50 to-warmBlack-100 dark:from-warmBlack dark:via-darkGray dark:to-charcoalBlack p-6 flex justify-center items-center">
      <div className="w-full max-w-3xl rounded-2xl shadow-xl bg-white/80 dark:bg-darkGray/80 backdrop-blur-md border border-softRosewood/10 dark:border-mutedSilver/10">
        {/* Header */}
        <div className="border-b border-softRosewood/20 dark:border-mutedSilver/20 p-8">
          <h2 className="text-3xl font-extrabold text-charcoalBlack dark:text-charcoalWhite">
            Page Settings
          </h2>
          <p className="text-sm text-mutedSilver dark:text-mutedSilver/80">
            Customize and control your page preferences
          </p>
        </div>

        {/* Menu Items */}
        <ul className="divide-y divide-softRosewood/10 dark:divide-mutedSilver/10">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              onClick={() => setActiveModal(item.id)}
              className="cursor-pointer group"
            >
              <div className="block px-6 py-5 hover:bg-SoftRed/10 dark:hover:bg-darkBurgundy/30 transition-all duration-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-charcoalBlack dark:text-charcoalWhite">
                      {item.title}
                    </h3>
                    <p className="text-sm mt-1 text-mutedSilver dark:text-mutedSilver/80">
                      {item.subtitle}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-mutedSilver dark:text-mutedSilver/70 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-xl mx-auto bg-white dark:bg-darkGray rounded-2xl p-6 relative shadow-2xl"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-3 right-3 text-mutedSilver hover:text-charcoalBlack dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-charcoalBlack dark:text-charcoalWhite mb-4">
                {selectedItem.title}
              </h3>
              <div>{selectedItem.component}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsContent;
