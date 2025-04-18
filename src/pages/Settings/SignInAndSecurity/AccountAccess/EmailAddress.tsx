import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmEmail from "@pages/ConfirmEmail";
import OTPInput from "../../../../components/Authentication/OTPInput";
import store, { AppDispatch } from "@store/store";
import { confirmEmail, sendConfirmationEmail } from "@store/user/userThunks";
import UpdatedSuccessfully from "../../../../components/Authentication/Utilities/UpdatedSuccessfully";
import UpdateFailed from "../../../../components/Authentication/Utilities/UpdateFailed";
import UpdateEmail from "@pages/UpdateEmail";

function EmailAddress() {
    const [clearOTP, setClearOTP] = useState(false);
    const [tokenForOTP, setTokenForOTP] = useState("");
    const [status, setStatus] = useState<"initial" | "otp" | "success">("initial");
    const [visible, setVisible] = useState(false);
    const [isConfirmClicked, setIsConfirmClicked] = useState(false);
    const [isUpdateEmailClicked, setIsUpdateEmailClicked] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = store.getState().user;

    async function handleSubmit(otp: string) {
        setClearOTP(false);
        const email = user.email;
        const token = user.accessToken;
        const response = await dispatch(confirmEmail({ email: email || "", token: token || "", otp: otp }));
        if (confirmEmail.fulfilled.match(response)) {
            setStatus("success");
        } else {
            setVisible(true);
        }
    }

    async function handleConfirm() {
        const email = user.email;
        const response = await dispatch(sendConfirmationEmail({ email: email || "" }));
        if (sendConfirmationEmail.fulfilled.match(response)) {
            setTokenForOTP(response.payload.token);
            setIsConfirmClicked(true);
        }
    }

    function handleUpdate() {
        setIsUpdateEmailClicked(true);
    }

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
        hover: {
            scale: 1.03,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.98
        }
    };

    return (
        <motion.div
            className="bg-white rounded-xl flex flex-col gap-4 p-6 w-[1000px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div 
                className="flex items-center w-[60px] hover:underline hover:cursor-pointer" 
                onClick={() => { navigate("/settings/sign-in-security") }}
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <ChevronLeftIcon />
                <p>Back</p>
            </motion.div>

            <motion.div className="mb-5" variants={itemVariants}>
                <h3 className="font-semibold text-[20px]">Email Address</h3>
                <p>Here you can verify and update your email if you wish to use another email.</p>
            </motion.div>

            <AnimatePresence mode="wait">
                {status === "initial" && (
                    <motion.div
                        className="flex flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h3 className="text-[20px] font-semibold">Confirm Email</h3>
                        <p className="text-[16px]">
                            <strong>Email: </strong>
                            {user.email}
                        </p>
                        {!user.confirmed ? (
                            <div className="flex flex-col items-center">
                                {!isConfirmClicked ? (
                                    <motion.div variants={itemVariants}>
                                        <motion.button
                                            onClick={handleConfirm}
                                            className="w-[200px] bg-crimsonRed py-2 text-charcoalBlack font-semibold rounded-3xl hover:bg-softRosewood hover:cursor-pointer"
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            Confirm email
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ConfirmEmail tokenForOTP={tokenForOTP} setIsConfirmClicked={setIsConfirmClicked} />
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Email is confirmed
                            </motion.p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {status === "otp" && (
                    <motion.div
                        className="flex flex-col p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h1 className="text-2xl font-bold">Confirm Email</h1>
                        <p className="text-[16px]">
                            Please enter the OTP sent to your email.
                        </p>
                        <OTPInput clear={clearOTP} onComplete={handleSubmit} />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {status === "success" && (
                    <UpdatedSuccessfully WhatIsUpdated="Email updated successfully" goTo="/home" />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {visible && (
                    <UpdateFailed
                        WhatFailed="Confirming email failed"
                        errorText="OTP entered is wrong"
                        setVisible={setVisible}
                    />
                )}
            </AnimatePresence>

            <motion.div className="flex flex-col" variants={itemVariants}>
                <h3 className="text-[20px] font-semibold">Update Email</h3>
                <AnimatePresence mode="wait">
                    {isUpdateEmailClicked ? (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <UpdateEmail setIsUpdateEmailClicked={setIsUpdateEmailClicked} />
                        </motion.div>
                    ) : (
                        <motion.div
                            className="flex flex-col items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.button
                                onClick={handleUpdate}
                                className="w-[200px] bg-crimsonRed py-2 text-charcoalBlack font-semibold rounded-3xl hover:bg-softRosewood hover:cursor-pointer"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                Update email
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

export default EmailAddress;