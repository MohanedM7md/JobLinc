import { useNavigate } from "react-router-dom";
import store from "@store/store";
function SettingsHeader()
{
    const navigate = useNavigate();
    const user = store.getState().user;
    return (
        <div id="header-container" data-testid="header-test" className="flex justify-between items-center fixed top-0 w-full bg-darkBurgundy">
            <img alt="JobLinc Logo" src="\src\assets\JobLincIcon-removebg.png"
                className="w-[90px] hover:cursor-pointer" 
                onClick={() => {navigate("/home")}}
                />
            
            {user.profilePicture && <img className="w-[80px] h-[80px] object-cover rounded-full mr-4" alt="user profile picture" src={user.profilePicture}/>}
        </div>
    );
}

export default SettingsHeader;