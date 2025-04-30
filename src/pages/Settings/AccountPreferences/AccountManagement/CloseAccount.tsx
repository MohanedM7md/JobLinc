import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logOut } from "@store/user/userSlice";
import store from "@store/store";
import ConfirmationModal from "../../../../components/Authentication/Utilities/ConfirmationModal";
import PasswordFieldNormal from "../../../../components/Authentication/Utilities/PasswordFieldNormal";
import { deleteAccount } from "@services/api/userProfileServices";
import { useAppDispatch } from "@store/hooks";

function CloseAccount() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [displayWarning, setDisplayWarning] = useState(false);
  const [displayPasswordField, setDisplayPasswordField] = useState(false);
  const [password, setPassword] = useState("");
  const [showErrorPassEmpty, setShowErrorPassEmpty] = useState(false);
  const [showErrorPassInvalid, setShowErrorPassInvalid] = useState(false);
  const [errorPassIncorrect, setErrorPassIncorrect] = useState(false);
  const user = store.getState().user;

  useEffect(() => {
    if (password) {
      setShowErrorPassEmpty(false);
      setShowErrorPassInvalid(false);
    }
  }, [password]);

  // Animation variants (keep existing ones)
  const containerVariants = { /* unchanged */ };
  const itemVariants = { /* unchanged */ };
  const buttonVariants = { /* unchanged */ };

  function handleClick() {
    setDisplayPasswordField(true);
  }

  async function handlePasswordSubmit() {
    if (!password.trim()) {
      setShowErrorPassEmpty(true);
      setShowErrorPassInvalid(false);
      return;
    }

    try {
      // Add actual password verification API call here
      
      const isValid = !showErrorPassInvalid && !errorPassIncorrect && !showErrorPassEmpty;
      
      if (isValid) {
        setDisplayPasswordField(false);
        setDisplayWarning(true);
      }
    } catch (error) {
      console.error("Password verification failed:", error);
    }
  }

  async function handleDelete() {
    try {
      const response = await deleteAccount(password);
      
      if (response.status === 200) {
        dispatch(logOut());
        navigate("");
      } else {
        if (response.data.errorCode === 401) {
          setShowErrorPassInvalid(true);
          setPassword("");
          setDisplayWarning(false);
          setDisplayPasswordField(true);
        } else {
          console.error("Account deletion failed:", response.data.message);
          setPassword("");
          alert("Something went wrong. Please try again later.");
        }
      }
    } catch (error) {
      setDisplayWarning(false);
      setDisplayPasswordField(true);
      setErrorPassIncorrect(true);
    }
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
            onCancel={() => {
              setDisplayWarning(false);
              setDisplayPasswordField(true);
            }}
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Back Button */}
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

            {displayPasswordField ? (
              <motion.div
                className="flex flex-col gap-4"
                variants={containerVariants}
              >
                <PasswordFieldNormal
                  labelText="Confirm Password"
                  passwordText={password}
                  setPasswordText={setPassword}
                  showErrorPassEmpty={showErrorPassEmpty}
                  setshowErrorPassEmpty={setShowErrorPassEmpty}
                  showErrorPassInvalid={showErrorPassInvalid}
                  setshowErrorPassInvalid={setShowErrorPassInvalid}
                  showErrorPassIncorrect={errorPassIncorrect}
                  setShowErrorPassIncorrect={setErrorPassIncorrect}
                />
                <motion.div
                  className="flex gap-4"
                  variants={itemVariants}
                >
                  <motion.button
                    onClick={handlePasswordSubmit}
                    className="w-full bg-crimsonRed py-2 text-white font-semibold rounded-3xl hover:bg-darkBurgundy"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Verify Password
                  </motion.button>
                  <motion.button
                    onClick={() => setDisplayPasswordField(false)}
                    className="w-full bg-gray-100 py-2 text-gray-700 font-semibold rounded-3xl hover:bg-gray-200"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="mb-5 flex flex-col gap-2"
                variants={containerVariants}
              >
                {/* Existing Content */}
                <motion.h3 
                  variants={itemVariants}
                  className="font-semibold text-[20px]"
                >
                  Close Account
                </motion.h3>
                <motion.p variants={itemVariants}>
                  {user.firstname}, we are sorry to see you go
                </motion.p>
                {/* ... rest of original content ... */}
                <motion.button
                  onClick={handleClick}
                  className="w-[100px] bg-crimsonRed py-2 text-white font-semibold rounded-3xl hover:bg-darkBurgundy"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Continue
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CloseAccount;