import { useState, ChangeEvent, FocusEvent, MouseEvent } from "react";
import { AuthenticationSignInButton } from "./AuthenticationButtons";
import { Outlet, Link } from "react-router-dom";


function SignInInformation() {
    const [isEmpty, setEmpty] = useState({ email: true, password: true });
    const [isFocusedEmail, setFocusedEmail] = useState(false);
    const [isFocusedPass, setFocusedPass] = useState(false);
    const [isHidden, setHidden] = useState(true);

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        setHidden(prevVal => !prevVal);
        event.preventDefault();
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setEmpty(prevVal => ({ ...prevVal, [name]: value.length === 0 }));
    }

    function handleFocus(event: FocusEvent<HTMLInputElement>) {
        const { name } = event.target;
        name === "email" ? setFocusedEmail(true) : setFocusedPass(true);
    }

    function handleFocusOut(event: FocusEvent<HTMLInputElement>) {
        const { name } = event.target;
        name === "email" ? setFocusedEmail(false) : setFocusedPass(false);
    }

    return (
        <form className="flex flex-col w-80 items-start gap-3">
            <div className="relative mb-13 w-full">
                <input type="text" name="email" onChange={handleChange} onFocus={handleFocus} onBlur={handleFocusOut} id="email-or-phone" placeholder=" " className="peer z-1 border w-full h-11 rounded-sm absolute px-2 hover:cursor-text focus:outline-black transition-all" required />
                <label htmlFor="email" className={`absolute left-2 text-[#A0A0A0] transition-all px-1 ${(!isEmpty.email || isFocusedEmail) ? "top-[0px] text-[10px]" : "top-2 text-base"}`}>Email or phone</label>
            </div>
            <div className="relative mb-13 w-full">
                <input type={isHidden ? "password" : "text"} name="password" onChange={handleChange} onFocus={handleFocus} onBlur={handleFocusOut} id="password" placeholder=" " className="peer z-1 border w-full h-11 rounded-sm absolute px-2 hover:cursor-text focus:outline-black transition-all" required />
                <label htmlFor="password" className={`absolute left-2 text-[#A0A0A0] transition-all px-1 ${(!isEmpty.password || isFocusedPass) ? "top-[0px] text-[10px]" : "top-2 text-base"}`}>Password</label>
                <button onClick={handleClick} className="z-2 absolute top-3 right-1 rounded-2xl text-[12px] border-0 px-1.5 text-[#222222] hover:bg-[#A52A2A] hover:cursor-pointer">Show</button>
            </div>
            <div className="text-center">
                <Link to="/Signin/ForgotPassword" className="text-[#222222] px-2 font-semibold hover:underline hover:rounded-3xl hover:bg-[#A52A2A]">Forgot password?</Link>
                <Outlet />
            </div>
            <div className="flex items-center px-2">
                <div className="flex items-center">
                    <input type="checkbox" id="default-checkbox" className="mr-2 scale-95"/>
                </div>
                <div className="flex items-center">
                    <label htmlFor="default-checkbox" className="text-[14px] text-[#222222]">Keep me logged in</label>
                </div>
            </div>
            <div className="flex w-full justify-center">
                <AuthenticationSignInButton text="Sign in"/>
            </div>
        </form>
    );
}

export default SignInInformation;
