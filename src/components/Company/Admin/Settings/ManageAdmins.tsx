import { useState, useEffect } from "react";
import { useCompanyStore } from "@store/comapny/companyStore";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import {
  addAdmin,
  deleteAdmin,
  getConnections,
} from "@services/api/companyServices";
import { motion, AnimatePresence } from "framer-motion";

const slideVariants = {
  initial: { x: "30%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-30%", opacity: 0 },
};

export default function ManageAdmins() {
  const { company, updateBasicInfo } = useCompanyStore();
  const admins = company?.admins || [];
  const [showAddView, setShowAddView] = useState(false);
  const [connections, setConnections] = useState<any[]>([]);

  useEffect(() => {
    getConnections()
      .then((data) => {
        const nonAdminConnections = data.filter(
          (connection: any) =>
            !admins.some((admin: any) => admin.id === connection.userId),
        );
        setConnections(nonAdminConnections);
      })
      .catch((err) => console.log(err));
  }, [showAddView]);

  const handleAddAdmin = async (userId: string) => {
    try {
      const response = await addAdmin(userId);
      if (response.status !== 200)
        throw "Failed to add admin. Please try again later.";

      setConnections(
        connections.filter((connection) => connection.userId !== userId),
      );
      updateBasicInfo({
        ...company,
        admins: [...response.data.admins],
      }); //!this is not right and need to be changed when magdy update it
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const handleDeleteAdmin = async (userId: string) => {
    try {
      const response = await deleteAdmin(userId);
      if (response.status !== 200)
        throw "Failed to delete admin. Please try again later.";
      updateBasicInfo({
        ...company,
        admins: admins.filter((admin) => admin.id !== userId),
      });
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  return (
    <div className="relative min-h-[400px]">
      <AnimatePresence mode="wait">
        {!showAddView ? (
          <motion.div
            key="main"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideVariants}
            transition={{ duration: 0.3 }}
            className="space-y-6 absolute top-0 left-0 w-full h-full"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-charcoalBlack dark:text-charcoalWhite">
                Admins
              </h4>
              <button
                onClick={() => setShowAddView(true)}
                className="flex items-center gap-2 cursor-pointer hover:bg-crimsonRed/40 text-black p-2 rounded-md"
              >
                <Plus className="w-4 h-4" />
                Add Admin
              </button>
            </div>

            {admins.length === 0 ? (
              <p className="text-mutedSilver dark:text-mutedSilver/70">
                No admins yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {admins.map((admin: any) => (
                  <li
                    key={admin.id}
                    className="flex items-center justify-between bg-white dark:bg-charcoalBlack/30 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={admin.profilePicture || "/default-avatar.png"}
                        alt={admin.firstname || "Admin"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-charcoalBlack dark:text-charcoalWhite font-medium">
                        {admin.firstname + " " + admin.lastname ||
                          "Unnamed Admin"}
                      </span>
                    </div>
                    <button
                      className="flex items-center gap-1 cursor-pointer transition-transform duration-200"
                      onClick={() => handleDeleteAdmin(admin.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="transition-all duration-200 hover:text-[105%]">
                        Delete
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="add"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideVariants}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-full space-y-6"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddView(false)}
                className="p-2 hover:bg-softRosewood/20 rounded-md"
              >
                <ArrowLeft className="w-5 h-5 text-charcoalBlack dark:text-charcoalWhite" />
              </button>
              <h4 className="text-lg font-semibold text-charcoalBlack dark:text-charcoalWhite">
                Add New Admin
              </h4>
            </div>

            {connections.length === 0 ? (
              <p className="text-mutedSilver dark:text-mutedSilver/70">
                No connections found.
              </p>
            ) : (
              <ul className="space-y-4">
                {connections.map((user: any) => (
                  <li
                    key={user.id}
                    className="flex items-center justify-between bg-white dark:bg-charcoalBlack/30 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={user.profilePicture || "/default-avatar.png"}
                        alt={user.firstname || "User"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-charcoalBlack dark:text-charcoalWhite font-medium">
                        {user.firstname + " " + user.lastname || "Unnamed User"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddAdmin(user.userId)}
                      className="text-sm text-black px-3 py-1 rounded-md cursor-pointer hover:text-[101%] transition-all"
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
