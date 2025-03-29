import { useState, ChangeEvent, FocusEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationSignInButton } from "../components/Authentication/AuthenticationButtons";
import SignHeader from "../components/Authentication/SignHeader";
function ForgotPassword()
{
    const [emailText, setEmailText] = useState("");
    const [showErrorEmailInvalid, setshowErrorEmailInvalid] = useState(false);

    const [isEmpty, setEmpty] = useState({ email: true, password: true });
    const [isFocusedEmail, setFocusedEmail] = useState(false);

    const navigate = useNavigate();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setEmpty(prevVal => {
            setEmailText(value);
            setshowErrorEmailInvalid(false);
            return { email: value.length === 0, password: prevVal.password };
        });
    }
    
    function handleFocus(event: FocusEvent<HTMLInputElement>) {
        const { name } = event.target;
        name === "email" && setFocusedEmail(true);
    }
    
    function handleFocusOut(event: FocusEvent<HTMLInputElement>) {
        const { name } = event.target;
        name === "email" && setFocusedEmail(false);
    }

    function handleClickBtn()
    {
        navigate("/Signin");
    }

    function isValidSubmit()
    {
        
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
                            <label htmlFor="email" className={`absolute left-2 text-mutedSilver transition-all px-1 ${(!isEmpty.email || isFocusedEmail) ? "top-[0px] text-[10px] z-3" : "top-2 text-base"}`}>Email or phone</label>
                        </div>
                        {showErrorEmailInvalid && <p className="text-red-800 text-[12px]">Please enter a valid email address.</p>}
                    </div>
                    <p className="text-warmBlack text-[12px]">We'll send a verification code to this email or phone number if it matches an existing JobLinc account.</p>
                    <AuthenticationSignInButton text="Next"/>
                    <button onClick={handleClickBtn} className="w-full bg-crimsonRed py-2 text-charcoalBlack font-semibold rounded-3xl mb-4 hover:bg-softRosewood hover:cursor-pointer">Back</button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;