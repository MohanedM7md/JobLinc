import ConfirmEmail from "@pages/ConfirmEmail";
import { ChevronLeftIcon } from "lucide-react";
import OTPInput from "../../../../components/Authentication/OTPInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store";
import { useNavigate } from "react-router-dom";
import { confirmEmail, sendConfirmationEmail } from "@store/user/userThunks";
import UpdatedSuccessfully from "../../../../components/Authentication/Utilities/UpdatedSuccessfully";
import UpdateFailed from "../../../../components/Authentication/Utilities/UpdateFailed";

function EmailAddress()
{
    const [clearOTP, setClearOTP] = useState(false);
    const [status, setStatus] = useState<"initial" | "otp" | "success">("initial");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    async function handleSubmit(otp: string)
    {
        setClearOTP(false);
        const userData = JSON.parse(localStorage.getItem("userState") || "");
        const email = userData.email;
        const token = userData.accessToken;
        const response = await dispatch(confirmEmail({email: email, token: token, otp: otp}));
        if (confirmEmail.fulfilled.match(response)) {
            setStatus("success");
        }
        else
        {
            setVisible(true);
        }

    }
    
    async function handleConfirm()
    {
        const userData = JSON.parse(localStorage.getItem("userState") || "");
        const email = userData.email;
        const response = await dispatch(sendConfirmationEmail({email: email}));
        if (sendConfirmationEmail.fulfilled.match(response))
        {
            navigate("/confirm-email");
        }
        // setStatus("otp");
    }

    function handleUpdate()
    {
        navigate("/update-email");
    }

    return (
        <div className="bg-white rounded-xl flex flex-col gap-4 p-6 w-[1000px]">
            <div className="flex items-center w-[60px] hover:underline hover:cursor-pointer" onClick={() => {navigate("/settings/sign-in-security")}}>
                <ChevronLeftIcon/>
                <p>Back</p>
            </div>

            <div className="mb-5">
                <h3 className="font-semibold text-[20px]">Email Address</h3>
                <p>Here you can verify and update your email if you wish to use another email.</p>
            </div>

            {status === "initial" &&
            <div className="flex flex-col">
                <h3 className="text-[20px] font-semibold">Confirm Email</h3>
                <p className="text-[16px]">
                    <strong>Email: </strong>
                    {JSON.parse(localStorage.getItem("userState") || "").email}
                </p>
                {!JSON.parse(localStorage.getItem("userState") || "").confirmed ? 
                <div className="flex flex-col items-center">
                    <button onClick={handleConfirm} className="w-[200px] bg-crimsonRed py-2 text-charcoalBlack font-semibold rounded-3xl hover:bg-softRosewood hover:cursor-pointer">
                    Confirm email</button>
                </div>
                :
                <p>Email is confirmed</p>}
            </div>}

            {status === "otp" &&
            <div className="flex flex-col p-4 rounded-lg">
                <h1 className="text-2xl font-bold">Confirm Email</h1>
                <p className="text-[16px]">
                    Please enter the OTP sent to your email.
                </p>
                <OTPInput clear={clearOTP} onComplete={handleSubmit} />
            </div>
            }

            {status === "success" &&
                <UpdatedSuccessfully WhatIsUpdated="Email" goTo="/home"/>
            }

            {visible && 
                <UpdateFailed WhatFailed="Confirming email failed" errorText="OTP entered is wrong" setVisible={setVisible}/>
            }

            

                


            <div className="flex flex-col">
                <h3 className="text-[20px] font-semibold">Update Email</h3>
                <div className="flex flex-col items-center">
                    <button onClick={handleUpdate} className="w-[200px] bg-crimsonRed py-2 text-charcoalBlack font-semibold rounded-3xl hover:bg-softRosewood hover:cursor-pointer">Update email</button>
                </div>
            </div>
            
        </div>
    );
}


export default EmailAddress;