import { useState, ChangeEvent, FocusEvent, MouseEvent } from "react";
import { AuthenticationSignInButton } from "./AuthenticationButtons";

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
        <form className="flex flex-col w-60 items-start gap-2">
            <div className="relative mb-10 w-full">
                <input type="text" name="email" onChange={handleChange} onFocus={handleFocus} onBlur={handleFocusOut} id="email-or-phone" placeholder=" " className="peer z-1 border w-full h-9 rounded-sm absolute px-2 hover:cursor-text focus:outline-blue-900 focus:border-blue-900 transition-all" required />
                <label htmlFor="email" className={`absolute left-2 text-gray-500 transition-all bg-white px-1 ${(!isEmpty.email || isFocusedEmail) ? "top-[0px] text-[10px] text-blue-900" : "top-1 text-base"}`}>Email or phone</label>
            </div>
            <div className="relative mb-10 w-full">
                <input type={isHidden ? "password" : "text"} name="password" onChange={handleChange} onFocus={handleFocus} onBlur={handleFocusOut} id="password" placeholder=" " className="peer z-1 border w-full h-9 rounded-sm absolute px-2 hover:cursor-text focus:outline-blue-900 focus:border-blue-900 transition-all" required />
                <label htmlFor="password" className={`absolute left-2 text-gray-500 transition-all bg-white px-1 ${(!isEmpty.password || isFocusedPass) ? "top-[0px] text-[10px] text-blue-900" : "top-1 text-base"}`}>Password</label>
                <button onClick={handleClick} className="z-2 absolute top-1.5 right-1 bg-white rounded-2xl text-[12px] border-0 px-1.5 text-blue-800 hover:bg-blue-100 hover:cursor-pointer">Show</button>
            </div>
            <div className="text-center">
                <a className="text-blue-800 font-semibold px-3 hover:underline hover:rounded-3xl hover:bg-blue-200">Forgot password?</a>
            </div>
            <div className="flex items-center">
                <div className="flex items-center">
                    <input type="checkbox" id="default-checkbox" className="mx-2 scale-95"/>
                </div>
                <div className="flex items-center">
                    <label htmlFor="default-checkbox" className="text-[14px]">Keep me logged in</label>
                </div>
            </div>
            <AuthenticationSignInButton />
        </form>
    );
}

export default SignInInformation;
