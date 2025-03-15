import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationSignInButton } from "./AuthenticationButtons";
import { useDispatch } from "react-redux";
import { setEmailPassword } from "../../store/userSlice";
function SignUpInformation() {
    const [isEmpty, setEmpty] = useState({ email: true, password: true });

    const [emailText, setEmailText] = useState("");
    const [passText, setPassText] = useState("");
    const [showErrorEmailEmpty, setshowErrorEmailEmpty] = useState(false);
    const [showErrorEmailInvalid, setshowErrorEmailInvalid] = useState(false);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [showErrorPassEmpty, setshowErrorPassEmpty] = useState(false);
    const [showErrorPassInvalid, setshowErrorPassInvalid] = useState(false);
    const dispatch = useDispatch();

    const [isHidden, setHidden] = useState(true);
    const navigate = useNavigate();

    
    useEffect(() => {
        if (!isEmpty.email) {
            setshowErrorEmailEmpty(false);
            setshowErrorEmailInvalid(false);
        }
        if (!isEmpty.password) {
            setshowErrorPassEmpty(false);
            setshowErrorPassInvalid(false);
        }
    }, [isEmpty]);

    function isValidEmail(email: string) : boolean
    {
        return emailRegex.test(email);
    }

    function isValidPassword(pass: string) : boolean {
        return pass.length >= 6;
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setEmpty(prevVal => {
            if (name === "email") {
                setEmailText(value);
                return { email: value.length === 0, password: prevVal.password };
            } else if (name === "password") {
                setPassText(value);
                return { email: prevVal.email, password: value.length === 0 };
            }
            return prevVal;
        });
    }


    function handleFocusOut(event: React.FocusEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        if (name === "email") {
            if (isEmpty.email) {
                setshowErrorEmailEmpty(true);
                setshowErrorEmailInvalid(false);
            }
            else {
                setshowErrorEmailInvalid(!isValidEmail(value));
            }
        } else {
            if (isEmpty.password) {
                setshowErrorPassEmpty(true);
                setshowErrorPassInvalid(false);
            }
            else
            {
                setshowErrorPassInvalid(!isValidPassword(value));
            }
        }
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setHidden(prevVal => !prevVal);
        event.preventDefault();
    }

    function isValidSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!showErrorPassInvalid && !showErrorEmailInvalid)
        {
            // Now we can take the First Name and Last Name
            // Navigate to Another Page

            // Now I have email and password, I need to put them in the store
            // and take more details about the user in upcoming pages
            const userData = {
                email: emailText,
                password: passText
            }
            dispatch(setEmailPassword(userData));
            navigate("/UserDetails");
        }


    }

    return (
        <form onSubmit={isValidSubmit} className="flex flex-col w-80 items-start gap-3 mb-3">
            <div className="flex flex-col w-full">
                <label htmlFor="email" className="text-[14px] text-charcoalBlack font-bold">Email</label>
                <input value={emailText} name="email" onBlur={handleFocusOut} onChange={handleChange} required id="email"  
                className={`outline-[0.7px] text-[14px] text-charcoalBlack h-8 px-2 rounded-sm hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px] ${(showErrorEmailEmpty || showErrorEmailInvalid) && "outline-red-700 hover:outline-red-900"}`}></input>
                {showErrorEmailEmpty && <p className="text-red-800 text-[10px]">Please enter your email address.</p>}
                {showErrorEmailInvalid && <p className="text-red-800 text-[10px]">Please enter a valid email address.</p>}

            </div>

            <div className="flex flex-col relative w-full">
                <label htmlFor="password" className="text-[14px] text-charcoalBlack font-bold">Password</label>
                <input value={passText} name="password" type={isHidden ? "password" : "text"} onBlur={handleFocusOut} onChange={handleChange} required id="password" 
                className={`outline-[0.7px] text-[14px] text-charcoalBlack h-8 pl-2 pr-10 rounded-sm hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px] ${(showErrorPassEmpty || showErrorPassInvalid) && "outline-red-700 hover:outline-red-900"}`}  ></input>
                {showErrorPassEmpty && <p className="text-red-800 text-[10px]">Please enter your password.</p>}
                {showErrorPassInvalid && <p className="text-red-800 text-[10px]">Password must be 6 characters or more.</p>}

                <button onClick={handleClick} className="z-2 absolute top-7.5 right-0 rounded-2xl text-[10px] border-0 px-1.5 text-charcoalBlack font-semibold hover:cursor-pointer">{isHidden ? "Show" : "Hide"}</button>
            </div>

            <div className="flex items-center">
                <div className="flex items-center">
                    <input type="checkbox" id="default-checkbox" className="mr-2 scale-95"/>
                </div>
                <div className="flex items-center">
                    <label htmlFor="default-checkbox" className="text-[14px] text-charcoalBlack">Keep me logged in</label>
                </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center">
                <div className="text-[12px] text-mutedSilver mb-3">By clicking Agree & Join or Continue, you agree to the JobLinc's <span className="text-softRosewood font-semibold">User Agreement</span>, <span className="text-softRosewood font-semibold">Privacy Policy</span>, and <span className="text-softRosewood font-semibold">Cookie Policy.</span></div>
                <AuthenticationSignInButton text="Agree & Join"/>
            </div>
        </form>
    );
}

export default SignUpInformation;
