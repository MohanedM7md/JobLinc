import { useState, ChangeEvent, FocusEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationSignInButton } from "../components/Authentication/AuthenticationButtons";
import SignHeader from "../components/Authentication/SignHeader";
import Modal from "../components/Authentication/Modal";
function ForgotPassword()
{
    const [emailText, setEmailText] = useState("");
    const [showErrorEmailInvalid, setshowErrorEmailInvalid] = useState(false);
    const [showErrorEmailEmpty, setshowErrorEmailEmpty] = useState(false);


    const [isModalOpen, setIsModalOpen] = useState(false);


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    const [isEmpty, setEmpty] = useState(true);
    const [isFocusedEmail, setFocusedEmail] = useState(false);

    const navigate = useNavigate();

    
    function isValidEmail(email: string) : boolean
    {
        return emailRegex.test(email);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setEmpty(() => {
            setEmailText(value);
            setshowErrorEmailInvalid(false);
            setshowErrorEmailEmpty(false);
            return (value.length === 0);
        });
    }
    
    function handleFocus() {
        setFocusedEmail(true);
    }
    
    function handleFocusOut() {
        setFocusedEmail(false);
        if (isEmpty)
            setshowErrorEmailEmpty(true);
        else if (!isValidEmail(emailText))
            setshowErrorEmailInvalid(true);
    }

    function handleBackBtn()
    {
        navigate("/Signin");
    }

    function isValidSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        if (isValidEmail(emailText))
        {
            
            // Send to the BE a post request to send an email to this email
            
            // Display a success message
            setIsModalOpen(true);
        }
        else
        {
            setshowErrorEmailInvalid(true);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-charcoalWhite m-0">
            <SignHeader />
            <form onSubmit={isValidSubmit}>
                <div className="flex flex-col w-80 gap-4 bg-lightGray p-5 rounded-xl">
                    <h1 className="text-warmBlack text-[20px] font-bold">Forgot Password</h1>
                    <div className="relative w-full">
                        <div className="relative mb-13 w-full">
                            <input value={emailText} type="text" name="email" onChange={handleChange} onFocus={handleFocus} onBlur={handleFocusOut} id="email-or-phone" placeholder=" " className="peer z-1 border w-full h-11 rounded-sm absolute px-2 hover:cursor-text focus:outline-black transition-all" required />
                            <label htmlFor="email" className={`absolute left-2 text-mutedSilver transition-all px-1 ${(!isEmpty || isFocusedEmail) ? "top-[0px] text-[10px] z-3" : "top-2 text-base"}`}>Email or phone</label>
                        </div>
                        {showErrorEmailEmpty && <p className="text-red-800 text-[12px]">Please enter your email address.</p>}
                        {showErrorEmailInvalid && <p className="text-red-800 text-[12px]">Please enter a valid email address.</p>}
                    </div>
                    <p className="text-warmBlack text-[12px]">We'll send a verification code to this email or phone number if it matches an existing JobLinc account.</p>
                    <AuthenticationSignInButton id="next-btn" text="Next"/>
                    <button onClick={handleBackBtn} className="w-full bg-crimsonRed py-2 text-charcoalBlack font-semibold rounded-3xl mb-4 hover:bg-softRosewood hover:cursor-pointer">Back</button>
                </div>
            </form>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-[18px]">Email sent successfully!</h2>
                    <p className="font-semibold text-[15px]">Kindly check your email for the verification code</p>
                    <div className="">
                        Take Code from user here
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ForgotPassword;