import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import { useContext } from "react";
import { ThemeContext } from "@context/ThemeProvider";
import { useAppDispatch } from "@store/hooks";
import { getUserDetails } from "@store/user/userThunks";
import { logOut } from "@store/user/userSlice";
import ConfirmationModal from "../../../../components/Authentication/Utilities/ConfirmationModal";



function CloseAccount()
{
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({firstname: ""});
    const [displayWarning, setDisplayWarning] = useState(false);


    function handleClick()
    {
        setDisplayWarning(true);
    }
    function handleDelete()
    {
        dispatch(logOut());
        navigate("/home");
    }

    useEffect(() => {
        dispatch(getUserDetails())
        .unwrap()
        .then((data) => {
            setUserDetails({
                firstname: data.firstname,
            });
        });
    }, [])

    return (
        <div className="bg-white rounded-xl flex flex-col gap-4 p-6 w-[1000px]">
            

            {displayWarning ? <ConfirmationModal 
            message="If you press continue, your account will be deleted permanently"
            onConfirm={handleDelete}
            onCancel={()=>{setDisplayWarning(false)}}/> : 
            <div>
                <div className="flex items-center w-[60px] hover:underline hover:cursor-pointer mb-5" onClick={() => {navigate("/settings/account-preferences")}}>
                    <ChevronLeftIcon/>
                    <p>Back</p>
                </div>

                <div className="mb-5">
                    <h3 className="font-semibold text-[20px]">Close Account</h3>
                    <p>{userDetails.firstname}, we are sorry to see you go</p>
                    <p>Just a quick reminder, closing your account means you will lose touch with your connections.</p>
                    <p>You will also lose any recommendations and endorsements you have given or received.</p>
                </div>

                <div>
                    <button onClick={handleClick} className="bg-red p-4 rounded-md">Continue</button>
                </div>
            </div>}
        </div>
    );
}

export default CloseAccount;