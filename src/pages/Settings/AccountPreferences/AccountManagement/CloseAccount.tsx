import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { logOut } from "@store/user/userSlice";
import store from "@store/store";
import ConfirmationModal from "../../../../components/Authentication/Utilities/ConfirmationModal";

function CloseAccount() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [displayWarning, setDisplayWarning] = useState(false);
  const user = store.getState().user;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.03 },
    tap: { scale: 0.98 }
  };

  function handleClick() {
    setDisplayWarning(true);
  }

  function handleDelete() {
    dispatch(logOut());
    navigate("/home");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl flex flex-col gap-4 p-6 shadow-md"
    >
      <AnimatePresence mode="wait">
        {displayWarning ? (
          <ConfirmationModal
            message="If you press continue, your account will be deleted permanently"
            onConfirm={handleDelete}
            onCancel={() => setDisplayWarning(false)}
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex items-center w-[60px] hover:underline hover:cursor-pointer mb-5"
              onClick={() => navigate("/settings/account-preferences")}
              variants={itemVariants}
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ChevronLeftIcon />
              <p>Back</p>
            </motion.div>

            <motion.div 
              className="mb-5 flex flex-col gap-2"
              variants={containerVariants}
            >
              <motion.h3 
                variants={itemVariants}
                className="font-semibold text-[20px]"
              >
                Close Account
              </motion.h3>
              <motion.p variants={itemVariants}>
                {user.firstname}, we are sorry to see you go
              </motion.p>
              <motion.p variants={itemVariants}>
                Just a quick reminder, closing your account means you will lose
                touch with your connections.
              </motion.p>
              <motion.p variants={itemVariants}>
                You will also lose any recommendations and endorsements you have
                given or received.
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                onClick={handleClick}
                className="w-[100px] bg-crimsonRed py-2 text-charcoalBlack font-semibold rounded-3xl hover:bg-softRosewood hover:cursor-pointer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CloseAccount;