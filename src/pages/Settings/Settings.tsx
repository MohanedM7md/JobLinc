import { useState } from "react";
import { JSX } from "react";
import SignHeader from "../../components/Authentication/Headers/SignHeader";
import { User, Lock, Eye, Shield, Receipt, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";

import AccountPreferences from "./AccountPreferences";
import Notifications from "./Notifications";
import SignInAndSecurity from "./SignInAndSecurity";
import Visibility from "./Visibility";
import DataAndPrivacy from "./DataAndPrivacy";
import AdvertisingData from "./AdvertisingData";
// 🔹 Define Type for Settings Page Items
interface SettingsPage {
    id: string;
    icon: JSX.Element;
    label: string;
}

// 🔹 Define Type for Settings Section Props


function Settings() {
    const [selected, setSelected] = useState<string>("Account Preferences");


    const settingsComponents: { [key: string]: JSX.Element } = {
        "Account Preferences": <AccountPreferences />,
        "Sign in & Security": <SignInAndSecurity />,
        "Visibility": <Visibility />,
        "Data Privacy": <DataAndPrivacy />,
        "Advertising Data": <AdvertisingData />,
        "Notifications": <Notifications />

    };
    
    const settingsPages: SettingsPage[] = [
        { id: "Account Preferences", icon: <User size={32} />, label: "Account preferences" },
        { id: "Sign in & Security", icon: <Lock size={32} />, label: "Sign in & security" },
        { id: "Visibility", icon: <Eye size={32} />, label: "Visibility" },
        { id: "Data Privacy", icon: <Shield size={32} />, label: "Data privacy" },
        { id: "Advertising Data", icon: <Receipt size={32} />, label: "Advertising data" },
        { id: "Notifications", icon: <Bell size={32} />, label: "Notifications" }
    ];

    return (
        <div className="w-full min-h-screen flex flex-col justify-between items-center gap-10 bg-warmWhite">
            <SignHeader />

            <div className="fixed left-0 bottom-0 top-[90px] w-[350px] flex flex-col bg-white gap-2">
                <div className="flex items-center justify-start p-5 w-full">
                    <img 
                        className="w-[40px] h-[40px] object-cover rounded-full mr-4" 
                        alt="user profile picture" 
                        src="/src/assets/Tyrone.jpg"
                    />
                    <h2 className="text-[32px] text-charcoalBlack font-bold">Settings</h2>
                </div>

                {settingsPages.map((item: SettingsPage) => (
                    <div 
                        key={item.id}
                        onClick={() => setSelected(item.id)}
                        className={`flex items-center p-5 gap-4 text-gray-700 w-full hover:cursor-pointer
                            ${selected === item.id ? "border-l-4 border-softRosewood text-softRosewood font-semibold" : ""}
                        `}
                    >
                        {selected === item.id 
                            ? <item.icon.type size={32} className="text-softRosewood" /> 
                            : <item.icon.type size={32} className="text-gray-700" />
                        }
                        <p className="text-[22px]">{item.label}</p>
                    </div>
                ))}
            </div>

            <div className="ml-[380px] mt-[70px] flex flex-col w-[1000px] gap-6">
                {settingsComponents[selected]} 
            </div>

            <footer className="w-[1000px] ml-[380px] mb-12 flex flex-col justify-center items-center font-semibold">
                
                
                <div className="flex justify-between gap-5">
                    <Link className="hover:underline" to="/">Help Center</Link>
                    <Link className="hover:underline" to="/">Professional Community Policies</Link>
                    <Link className="hover:underline" to="/">Language</Link>
                    <Link className="hover:underline" to="/">Privacy Policy</Link>
                    <Link className="hover:underline" to="/">Accessibility</Link>
                    <Link className="hover:underline" to="/">Recommendation Transparency</Link>
                </div>
                <div className="flex justify-between gap-5">
                    <Link className="hover:underline" to="/">User Agreement</Link>
                    <Link className="hover:underline" to="/">End User License Agreement</Link>
                </div>
                <Logo />


            </footer>

            


        </div>
    );
}



export default Settings;
