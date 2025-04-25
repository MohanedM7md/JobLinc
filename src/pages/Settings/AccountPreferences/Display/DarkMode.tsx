import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import { useContext } from "react";
import { ThemeContext } from "@context/ThemeProvider";
function DarkMode()
{
    const navigate = useNavigate();
    const [selectedChoice, setSelectedChoice] = useState('');
    const { darkMode, setDarkMode } = useContext(ThemeContext);


    useEffect(() => {
        const storedChoice = localStorage.getItem('theme');
        if (storedChoice) {
            setSelectedChoice(storedChoice);
        }
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const choice = event.target.value;
        setSelectedChoice(choice);
        setDarkMode(!darkMode);
    };

    return (
        <div className="bg-white rounded-xl flex flex-col gap-4 p-6 w-[1000px]">
            <div className="flex items-center w-[60px] hover:underline hover:cursor-pointer" onClick={() => {navigate("/settings/account-preferences")}}>
                <ChevronLeftIcon/>
                <p>Back</p>
            </div>

            <div className="mb-5">
                <h3 className="font-semibold text-[20px]">Dark mode</h3>
                <p>Choose how your JobLinc experience looks for this device.</p>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <input 
                        type="radio" 
                        id="always-off" 
                        name="ThemeChoice" 
                        value="light" 
                        className="w-6 h-6" 
                        checked={selectedChoice === "light"} 
                        onChange={handleChange} 
                    />
                    <label htmlFor="always-off" className="text-xl font-medium">Always Off</label>
                </div>
                <div className="flex items-center gap-3">
                    <input 
                        type="radio" 
                        id="always-on" 
                        name="ThemeChoice" 
                        value="dark" 
                        className="w-6 h-6" 
                        checked={selectedChoice === "dark"} 
                        onChange={handleChange} 
                    />
                    <label htmlFor="always-on" className="text-xl font-medium">Always On</label>
                </div>
            </div>
        </div>
    );
}

export default DarkMode;