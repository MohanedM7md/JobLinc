import { motion } from "framer-motion";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeVisibilitySetting } from "@services/api/visibilityService";
import toast from "react-hot-toast";

const AccountVisibility = () => {
  const navigate = useNavigate();
  const [selectedVisibility, setSelectedVisibility] = useState<"Public" | "Connections">("Public");

  useEffect(() => {
    const updateVisibility = async () => {
      const visibilitypromise = changeVisibilitySetting(selectedVisibility);
      toast.promise(visibilitypromise, {
        loading: `Setting Visibility to ${selectedVisibility}`,
        success: `Visibility set to ${selectedVisibility}`,
        error: `Error setting Visibility to ${selectedVisibility}`,
      });
      try {
        const response = await visibilitypromise;
        if(response.status === 200){
            console.log("Visibility change response", response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    updateVisibility();
  }, [selectedVisibility]);

  return (
    <div className="lg:w-6/10 border border-gray-200 rounded-md m-10 bg-white">
      <div className="w-full">
        <div className="bg-white rounded-xl flex flex-col gap-4 p-6">
          <motion.div
            className="flex items-center w-[60px] hover:underline hover:cursor-pointer"
            onClick={() => navigate("/settings/visibility")}
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronLeftIcon />
            <p>Back</p>
          </motion.div>
          <h3 className="text-lg font-semibold px-4 pt-4">Visibility Settings</h3>

          <div className="space-y-4 px-4 pb-4">
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-4 p-3 hover:bg-red-50 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="Public"
                  checked={selectedVisibility === "Public"}
                  onChange={(e) => setSelectedVisibility(e.target.value as "Public" | "Connections")}
                  className="h-5 w-5 accent-crimsonRed border-gray-300"
                />
                <div className="flex-1">
                  <h4 className="font-medium">Public</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Your profile and activity will be visible to everyone
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-4 p-3 hover:bg-red-50 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="Connections"
                  checked={selectedVisibility === "Connections"}
                  onChange={(e) => setSelectedVisibility(e.target.value as "Public" | "Connections")}
                  className="h-5 w-5 accent-crimsonRed border-gray-300"
                />
                <div className="flex-1">
                  <h4 className="font-medium">Connections Only</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Only your connections can see your profile and activity
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVisibility;