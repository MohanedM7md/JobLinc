import { useEffect, useState } from "react";
import { JSX } from "react";
import SettingsHeader from "../../components/Authentication/Headers/SettingsHeader";
import { User, Lock, Eye, Shield, Receipt, Bell } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../../components/utils/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import store from "@store/store";
import { Menu } from "lucide-react";

interface SettingsPage {
  id: string;
  icon: JSX.Element;
  label: string;
}

function Settings() {
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    function handleMenuClick()
    {
      setIsMenuClicked(!isMenuClicked);
    }

    const settingsPages: SettingsPage[] = [
    {
      id: "account-preferences",
      icon: <User size={32} />,
      label: "Account preferences",
    },
    {
      id: "sign-in-security",
      icon: <Lock size={32} />,
      label: "Sign in & security",
    },
    { id: "visibility", icon: <Eye size={32} />, label: "Visibility" },
    { id: "data-privacy", icon: <Shield size={32} />, label: "Data privacy" },
    {
      id: "advertising-data",
      icon: <Receipt size={32} />,
      label: "Advertising data",
    },
    { id: "notifications", icon: <Bell size={32} />, label: "Notifications" },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const initialSelected =
    location.pathname.split("/").pop() || "account-preferences";
  const [selected, setSelected] = useState<string>(initialSelected);
  const user = store.getState().user;

  useEffect(() => {
    const path = location.pathname;
    const match = path.split("/settings/")[1]; // gets text after /settings/
    if (match)
        setSelected(match);
    else    
        setSelected("account-preferences")
    }, []);
    
    return (
        <div className="w-full min-h-screen flex flex-col justify-between items-center gap-10 bg-warmWhite">
            <SettingsHeader />

            <div className="fixed xl:left-0 xl:bottom-0 top-[60px] md:top-[90px] w-full xl:w-[350px] flex flex-col bg-white">
              <div className="flex items-center justify-start p-5 w-full">
                  <div className="lg:hidden flex mr-9 hover:cursor-pointer" onClick={handleMenuClick}>
                    <Menu />
                  </div>
                  <img 
                      className="w-[40px] h-[40px] object-cover rounded-full mr-4" 
                      alt="user profile picture" 
                      src={user.profilePicture!}
                  />
                  <h2 className="text-[32px] text-charcoalBlack font-bold">Settings</h2>
              </div>
              <div className="lg:flex xl:flex-col hidden">
                {settingsPages.map((item: SettingsPage) => (
                  <div
                    key={item.id}
                    onClick={() => {
                    navigate(item.id);
                    setSelected(item.id);
                    }}
                    className={`flex items-center p-5 gap-4 text-gray-700 w-full hover:cursor-pointer
                              ${selected === item.id && "xl:border-l-4 xl:border-b-0 border-b-4 border-l-0 border-softRosewood text-softRosewood font-semibold"}`}>
                      {selected === item.id ? (
                      <item.icon.type size={32} className="text-softRosewood" />
                      ) : (
                      <item.icon.type size={32} className="text-gray-700" />
                      )}
                      <p className="text-[15x] xl:text-[22px]">{item.label}</p>
                  </div>
                    ))}
              </div>

              {/* Here */ }
              <div className="flex flex-col lg:hidden">
                {isMenuClicked && (
                  <div className="absolute left-4  top-[100px] md:top-[100px] w-[250px] bg-white shadow-lg rounded-lg z-50 border border-gray-200">
                    {settingsPages.map((item: SettingsPage) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          navigate(item.id);
                          setSelected(item.id);
                          setIsMenuClicked(false);
                        }}
                        className={`flex items-center p-4 gap-3 text-gray-700 hover:bg-gray-50 hover:cursor-pointer
                                  ${selected === item.id ? "text-softRosewood font-semibold" : ""}`}
                      >
                        {selected === item.id ? (
                          <item.icon.type size={24} className="text-softRosewood min-w-[24px]" />
                        ) : (
                          <item.icon.type size={24} className="text-gray-700 min-w-[24px]" />
                        )}
                        <p className="text-[14px]">{item.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

        
        <div className="xl:ml-[380px] mt-[180px] md:mt-[200px] lg:mt-[300px] xl:mt-[110px] flex flex-col w-[450px] md:w-[600px] lg:w-[800px]">
          <Outlet />
        </div>

        <footer className="xl:ml-[380px] w-full text-[10px] md:text-[12px] lg:text-[15px] mb-12 flex flex-col justify-center items-center font-semibold">
          <div className="flex justify-between gap-5">
            <Link className="hover:underline" to="/">
              Help Center
            </Link>
            <Link className="hover:underline" to="/">
              Professional Community Policies
            </Link>
            <Link className="hover:underline" to="/">
              Language
            </Link>
            <Link className="hover:underline" to="/">
              Privacy Policy
            </Link>
            <Link className="hover:underline" to="/">
              Accessibility
            </Link>
            <Link className="hover:underline" to="/">
              Recommendation Transparency
            </Link>
          </div>
          <div className="flex justify-between gap-5">
            <Link className="hover:underline" to="/">
              User Agreement
            </Link>
            <Link className="hover:underline" to="/">
              End User License Agreement
            </Link>
          </div>
          <Logo />
        </footer>
    </div>
  );
}

export default Settings;
