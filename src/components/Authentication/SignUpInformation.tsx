import { useEffect, useState } from "react";
import { AuthenticationSignInButton } from "./AuthenticationButtons";

function SignUpInformation() {
    const [isEmpty, setEmpty] = useState({ email: true, password: true });
    const [isFocusedEmail, setFocusedEmail] = useState(false);
    const [isFocusedPass, setFocusedPass] = useState(false);
    
    const [showErrorEmail, setShowErrorEmail] = useState(false);
    const [showErrorPass, setShowErrorPass] = useState(false);

    const [isHidden, setHidden] = useState(true);
    
    useEffect(() => {
        if (!isEmpty.email) {
            setShowErrorEmail(false);
        }
        if (!isEmpty.password) {
            setShowErrorPass(false);
        }
    }, [isEmpty]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setEmpty(prevVal => {
            if (name === "email") {
                return { email: value.length === 0, password: prevVal.password };
            } else if (name === "password") {
                return { email: prevVal.email, password: value.length === 0 };
            }
            return prevVal;
        });
    }

    function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
        const { name } = event.target;
        name === "email" ? setFocusedEmail(true) : setFocusedPass(true);
    }

    function handleFocusOut(event: React.FocusEvent<HTMLInputElement>) {
        const { name } = event.target;
        if (name === "email") {
            if (isEmpty.email) {
                setShowErrorEmail(true);
            }
        } else {
            if (isEmpty.password) {
                setShowErrorPass(true);
            }
        }
        name === "email" ? setFocusedEmail(false) : setFocusedPass(false);
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setHidden(prevVal => !prevVal);
        event.preventDefault();
    }

    return (
        <form className="flex flex-col w-80 items-start gap-3">
            <div className="flex flex-col w-full">
                <label htmlFor="email" className="text-[14px] text-[#222222] font-bold">Email</label>
                <input name="email" onFocus={handleFocus} onBlur={handleFocusOut} onChange={handleChange} required id="email" className={`outline-[0.7px] text-[14px] text-[#222222] h-8 px-2 rounded-sm hover:cursor-pointer hover:outline-[1px] hover:bg-gray-100 ${showErrorEmail && "outline-red-700 hover:outline-red-900"}`}></input>
                {showErrorEmail && <p className="text-red-800 text-[10px]">Please enter your email address.</p>}
            </div>

            <div className="flex flex-col relative w-full">
                <label htmlFor="password" className="text-[14px] text-[#222222] font-bold">Password</label>
                <input name="password" type={isHidden ? "password" : "text"} onFocus={handleFocus} onBlur={handleFocusOut} onChange={handleChange} required id="password" className={`outline-[0.7px] text-[14px] text-[#222222] h-8 px-2 rounded-sm hover:cursor-pointer hover:outline-[1px] hover:bg-gray-100 ${showErrorPass && "outline-red-700 hover:outline-red-900"}`}></input>
                {showErrorPass && <p className="text-red-800 text-[10px]">Please enter your password.</p>}
                <button onClick={handleClick} className="z-2 absolute top-7.5 right-0 rounded-2xl text-[10px] border-0 px-1.5 text-[#222222] font-semibold hover:cursor-pointer hover:bg-[#A52A2A]">Show</button>
            </div>

            <div className="flex items-center">
                <div className="flex items-center">
                    <input type="checkbox" id="default-checkbox" className="mr-2 scale-95"/>
                </div>
                <div className="flex items-center">
                    <label htmlFor="default-checkbox" className="text-[14px] text-[#222222]">Keep me logged in</label>
                </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center">
                <div className="text-[12px] text-[#A0A0A0] mb-3">By clicking Agree & Join or Continue, you agree to the Job Linc <span className="text-[#A52A2A] font-semibold">User Agreement</span>, <span className="text-[#A52A2A] font-semibold">Privacy Policy</span>, and <span className="text-[#A52A2A] font-semibold">Cookie Policy.</span></div>
                <AuthenticationSignInButton text="Agree & Join"/>
            </div>
        </form>
    );
}

export default SignUpInformation;
