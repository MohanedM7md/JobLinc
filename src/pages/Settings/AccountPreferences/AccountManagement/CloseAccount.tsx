import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { logOut } from "@store/user/userSlice";
import store from "@store/store";
import ConfirmationModal from "../../../../components/Authentication/Utilities/ConfirmationModal";
import PasswordFieldNormal from "../../../../components/Authentication/Utilities/PasswordFieldNormal";
import { deleteAccount, getMyCompanies } from "@services/api/userProfileServices";
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
  const [isButtonClickable, setIsButtonClickable] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  const user = store.getState().user;

  const helpRef = useRef<HTMLDivElement>(null);
  const helpButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getMyCompanies();
        console.log("Why here", response);
        if (response.data.length !== 0) {
          setIsButtonClickable(false);
        }
      } catch (error) {
        console.error("cannot fetch companies ", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        helpRef.current &&
        !helpRef.current.contains(event.target as Node) &&
        helpButtonRef.current &&
        !helpButtonRef.current.contains(event.target as Node)
      ) {
        setShowHelp(false);
      }
    };

    if (showHelp) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHelp]);

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
                className="mb-5 flex flex-col gap-2 relative"
                variants={containerVariants}
              >
                {!isButtonClickable && (
                <motion.div
                  className="absolute top-[-43px] right-0"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <button
                    ref={helpButtonRef}
                    onClick={() => setShowHelp(!showHelp)}
                    className="w-8 h-8 rounded-full bg-crimsonRed flex items-center justify-center hover:bg-darkBurgundy transition-colors"
                  >
                    <span className="text-white font-semibold">?</span>
                  </button>

                  <AnimatePresence>
                    {showHelp && (
                      <motion.div
                        ref={helpRef}
                        className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <p className="text-sm text-gray-600">
                          This account manages companies, so account deletion isn't feasible. 
                          If you would like to delete this account, kindly delete your companies first.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
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
                  className={`w-[100px] py-2 font-semibold rounded-3xl ${
                    isButtonClickable 
                      ? "bg-crimsonRed text-white hover:bg-darkBurgundy cursor-pointer"
                      : "bg-crimsonRed/30 text-gray-400 cursor-not-allowed"
                  }`}
                  variants={buttonVariants}
                  whileHover={isButtonClickable ? "hover" : undefined}
                  whileTap={isButtonClickable ? "tap" : undefined}
                  transition={{ duration: 0.15 }}
                  disabled={!isButtonClickable}
                >
                  <motion.span
                    animate={{ 
                      opacity: isButtonClickable ? 1 : 0.7,
                      scale: isButtonClickable ? 1 : 0.98
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Continue
                  </motion.span>
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