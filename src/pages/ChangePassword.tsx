import { motion, AnimatePresence } from "framer-motion";
import SignHeader from "../components/Authentication/Headers/SignHeader";
import { AuthenticationSignInButton } from "../components/Authentication/AuthenticationButtons";
import { useState } from "react";
import store from "../store/store";
import { changePassword } from "../store/user/userThunks";
import { ChevronLeftIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

import Modal from "../components/utils/Modal";
import { Link } from "react-router-dom";
import PasswordFieldNormal from "../components/Authentication/Utilities/PasswordFieldNormal";
import { isValidPassword } from "../components/Authentication/Utilities/Validations";
import UpdatedSuccessfully from "../components/Authentication/Utilities/UpdatedSuccessfully";
import UpdateFailed from "../components/Authentication/Utilities/UpdateFailed";

function ChangePassword() {
  const [oldPassText, setOldPassText] = useState("");
  const [newPassText, setNewPassText] = useState("");
  const [showErrorOldPassEmpty, setShowErrorOldPassEmpty] = useState(false);
  const [showErrorOldPassInvalid, setShowErrorOldPassInvalid] = useState(false);
  const [showErrorNewPassEmpty, setShowErrorNewPassEmpty] = useState(false);
  const [showErrorNewPassInvalid, setShowErrorNewPassInvalid] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
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

  async function isValidSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isValidPassword(oldPassText) && isValidPassword(newPassText)) {
      if (oldPassText !== newPassText) {
        const userData = {
          oldPassword: oldPassText,
          newPassword: newPassText,
          refreshToken: localStorage.getItem("refreshToken") || "",
        };
        
        const response = await dispatch(changePassword(userData));
        
        if (changePassword.fulfilled.match(response)) {
          setIsModalSuccessOpen(true);
        } else {
          setIsModalErrorOpen(true);
        }
      } else {
        setShowError(true);
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl flex flex-col gap-4 p-6 shadow-md border border-gray-200 max-w-[600px]"
    >
      <motion.div
        className="flex items-center w-[60px] hover:underline hover:cursor-pointer"
        onClick={() => navigate("/settings/sign-in-security")}
        whileHover={{ x: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <ChevronLeftIcon />
        <span>Back</span>
      </motion.div>

      <AnimatePresence mode="wait">
        {isModalSuccessOpen ? (
          <UpdatedSuccessfully WhatIsUpdated="Password updated successfully!" goTo="/home" />
        ) : isModalErrorOpen ? (
          <UpdateFailed
            WhatFailed="Password update failed"
            errorText="Old password is incorrect. Did you forget your password?"
            setVisible={setIsModalErrorOpen}
            helperText="Forgot Password"
            goTo="/signin/forgot-password"
          />
        ) : (
          <motion.form
            onSubmit={isValidSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-6 w-full bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm"
            >
              <motion.h1 variants={itemVariants} className="text-xl font-bold text-neutral-800">
                Change Password
              </motion.h1>

              <motion.div variants={itemVariants}>
                <PasswordFieldNormal
                  labelText="Old password *"
                  passwordText={oldPassText}
                  setPasswordText={setOldPassText}
                  showErrorPassEmpty={showErrorOldPassEmpty}
                  setshowErrorPassEmpty={setShowErrorOldPassEmpty}
                  showErrorPassInvalid={showErrorOldPassInvalid}
                  setshowErrorPassInvalid={setShowErrorOldPassInvalid}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <PasswordFieldNormal
                  labelText="New password *"
                  passwordText={newPassText}
                  setPasswordText={setNewPassText}
                  showErrorPassEmpty={showErrorNewPassEmpty}
                  setshowErrorPassEmpty={setShowErrorNewPassEmpty}
                  showErrorPassInvalid={showErrorNewPassInvalid}
                  setshowErrorPassInvalid={setShowErrorNewPassInvalid}
                />
              </motion.div>

              <AnimatePresence>
                {showError && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-red-700"
                  >
                    New password can't be the same as old password.
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.div
                variants={itemVariants}
                className="pt-2"
                whileHover="hover"
                whileTap="tap"
              >
                <AuthenticationSignInButton id="done-btn" text="Done" />
              </motion.div>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ChangePassword;