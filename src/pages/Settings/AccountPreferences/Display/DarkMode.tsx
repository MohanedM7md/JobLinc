import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import { useContext } from "react";
import { ThemeContext } from "@context/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

function DarkMode() {
    const navigate = useNavigate();
    const [selectedChoice, setSelectedChoice] = useState(false);
    const { darkMode, setDarkMode } = useContext(ThemeContext);

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
        hidden: { y: 10, opacity: 0 },
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

    const radioVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    useEffect(() => {
        setSelectedChoice(darkMode);
    }, [darkMode]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const isDark = value === "dark";
        setSelectedChoice(isDark);
        const themeVal = isDark ? "dark" : "light";
        localStorage.setItem("theme", themeVal);
        setDarkMode(isDark);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl flex flex-col gap-4 p-6 shadow-md"
        >
            <motion.div 
                className="flex items-center w-[60px] hover:underline hover:cursor-pointer" 
                onClick={() => navigate("/settings/account-preferences")}
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <ChevronLeftIcon className="dark:text-white"/>
                <p className="dark:text-white">Back</p>
            </motion.div>

            <motion.div 
                className="mb-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h3 
                    variants={itemVariants}
                    className="font-semibold text-[20px] dark:text-white"
                >
                    Dark mode
                </motion.h3>
                <motion.p 
                    variants={itemVariants}
                    className="dark:text-gray-300"
                >
                    Choose how your JobLinc experience looks for this device.
                </motion.p>
            </motion.div>

            <motion.div 
                className="flex flex-col gap-5"
                variants={containerVariants}
            >
                <motion.div 
                    className="flex items-center gap-3"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                >
                    <motion.input 
                        type="radio" 
                        id="always-off" 
                        name="ThemeChoice" 
                        value="light" 
                        className="w-6 h-6 dark:accent-softRosewood" 
                        checked={selectedChoice === false} 
                        onChange={handleChange}
                        variants={radioVariants}
                        whileHover="hover"
                        whileTap="tap"
                    />
                    <label htmlFor="always-off" className="text-xl font-medium dark:text-white">Always Off</label>
                </motion.div>
                <motion.div 
                    className="flex items-center gap-3"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                >
                    <motion.input 
                        type="radio" 
                        id="always-on" 
                        name="ThemeChoice" 
                        value="dark" 
                        className="w-6 h-6 dark:accent-softRosewood" 
                        checked={selectedChoice === true} 
                        onChange={handleChange}
                        variants={radioVariants}
                        whileHover="hover"
                        whileTap="tap"
                    />
                    <label htmlFor="always-on" className="text-xl font-medium dark:text-white">Always On</label>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default DarkMode;