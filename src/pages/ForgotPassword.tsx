import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationSignInButton } from "../components/Authentication/AuthenticationButtons";
import SignHeader from "../components/Authentication/SignHeader";
import Modal from "../components/Authentication/Modal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store";
import { forgotPassword, confirmOTP, setEmail } from "../store/userSlice";
import store from "../store/store";
import OTPInput from "../components/Authentication/OTPInput";
import EmalFieldWithMovingLabel from "../components/Authentication/Utilities/EmailFieldWithMovingLabel";
import { isValidEmail } from "../components/Authentication/Utilities/Validations";
{/* There was an error when I tried to import it using @store/userSlice for some reason, so I did this for now*/}
function ForgotPassword()
{
    const [emailText, setEmailText] = useState("");
    const [showErrorEmailInvalid, setshowErrorEmailInvalid] = useState(false);

    const [showErrorOTP, setShowErrorOTP] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    function handleBackBtn()
    {
        navigate("/Signin");
    }

    async function isValidSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        if (isValidEmail(emailText))
        {
            
            // Send to the BE a post request to send an email to this email
            const userData = {email: emailText}
            dispatch(setEmail( {email: emailText} ))           
            const resultAction = await dispatch(forgotPassword(userData));
            // Display a success message

            console.log("Redux state: " + JSON.stringify(store.getState().user));
            

            if (forgotPassword.fulfilled.match(resultAction)) {
                setIsModalOpen(true);
            } 
            else {
                setIsModalErrorOpen(true);
            }
              
            
        }
        else
        {
            setshowErrorEmailInvalid(true);
        }
    }

    async function handleOTPCompletion(otp: string)
    {
                
        const userData = {
            email: store.getState().user.email || "",
            forgotToken: store.getState().user.forgotToken || "",
            otp: otp
        }

        const resultAction = await dispatch(confirmOTP(userData))
        console.log("R: " + JSON.stringify(resultAction));
        console.log("State now: " + JSON.stringify(store.getState().user));

        if (confirmOTP.fulfilled.match(resultAction))
        {
            // Navigate the user to reset password page
            setShowErrorOTP(false);
            navigate("/ResetPassword");
        }
        else
        {
            setShowErrorOTP(true);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-charcoalWhite m-0">
            <SignHeader />
            <form onSubmit={isValidSubmit}>
                <div className="flex flex-col w-80 gap-4 bg-lightGray p-5 rounded-xl">
                    <h1 className="text-warmBlack text-[20px] font-bold">Forgot Password</h1>
                    
                    <EmalFieldWithMovingLabel emailText={emailText} setEmailText={setEmailText} showErrorEmailInvalid={showErrorEmailInvalid} setshowErrorEmailInvalid={setshowErrorEmailInvalid} />
                    
                    <p className="text-warmBlack text-[12px]">We'll send a verification code to this Email if it matches an existing JobLinc account.</p>
                    
                    <AuthenticationSignInButton id="next-btn" text="Next"/>
                    
                    <button onClick={handleBackBtn} className="w-full bg-crimsonRed py-2 text-charcoalBlack font-semibold rounded-3xl mb-4 hover:bg-softRosewood hover:cursor-pointer">Back</button>
                </div>
            </form>

            <Modal isOpen={isModalErrorOpen} onClose={() => setIsModalErrorOpen(false)}>
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-[18px]">An error occured, please try again later.</h2>
                </div>
            </Modal>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-[18px]">Email sent successfully!</h2>
                    <p className="font-semibold text-[15px]">Kindly check your email for the verification code</p>
                    <div className="">
                        <OTPInput onComplete={handleOTPCompletion}/>
                    </div>
                    {showErrorOTP && <p className="text-[15px] text-warmBlack">Wrong OTP entered. Kindly check your email again to verify OTP.</p>}
                    {showErrorOTP && <p className="text-[15px] text-warmBlack hover:cursor-pointer hover:underline">Get a new OTP</p>}
                    {/* Add the getting a new OTP feature and put, for example, a minute delay on getting a new OTP */}
                </div>
            </Modal>
        </div>
    );
}

export default ForgotPassword;