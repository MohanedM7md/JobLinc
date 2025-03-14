import { useState, ChangeEvent, FocusEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationSignInButton } from "./AuthenticationButtons";
import { Outlet, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { loginUser } from "../../store/userSlice"; // New login thunk

function SignInInformation() {
    const [isEmpty, setEmpty] = useState({ email: true, password: true });
    const [emailText, setEmailText] = useState("");
    const [passText, setPassText] = useState("");
    const [isFocusedEmail, setFocusedEmail] = useState(false);
    const [isFocusedPass, setFocusedPass] = useState(false);
    const [isHidden, setHidden] = useState(true);
    const [showErrorEmailInvalid, setshowErrorEmailInvalid] = useState(false);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [showErrorPassInvalid, setshowErrorPassInvalid] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        setHidden((prevVal) => !prevVal);
        event.preventDefault();
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setEmpty((prevVal) => {
            if (name === "email") {
                setEmailText(value);
                setshowErrorEmailInvalid(false);
                return { email: value.length === 0, password: prevVal.password };
            } else if (name === "password") {
                setPassText(value);
                setshowErrorPassInvalid(false);
                return { email: prevVal.email, password: value.length === 0 };
            }
            return prevVal;
        });
    }

    function handleFocus(event: FocusEvent<HTMLInputElement>) {
        const { name } = event.target;
        name === "email" ? setFocusedEmail(true) : setFocusedPass(true);
    }

    function handleFocusOut(event: FocusEvent<HTMLInputElement>) {
        const { name } = event.target;
        name === "email" ? setFocusedEmail(false) : setFocusedPass(false);
    }

    function isValidEmail(email: string): boolean {
        return emailRegex.test(email);
    }

    function isValidPassword(pass: string): boolean {
        return pass.length >= 6;
    }

    async function isValidSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isValidEmail(emailText)) {
            if (isValidPassword(passText)) {
                const userData = { email: emailText, password: passText };
                const resultAction = await dispatch(loginUser(userData));

                if (loginUser.fulfilled.match(resultAction)) {
                    navigate("/MainPage");
                }
            } else {
                setshowErrorPassInvalid(true);
            }
        } else {
            setshowErrorEmailInvalid(true);
        }
    }

    return (
        <form onSubmit={isValidSubmit} className="flex flex-col w-80 items-start gap-3">
            <div className="relative w-full">
                <div className="relative mb-13 w-full">
                    <input
                        value={emailText}
                        type="text"
                        name="email"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleFocusOut}
                        id="email-or-phone"
                        placeholder=" "
                        className="peer z-1 border w-full h-11 rounded-sm absolute px-2 hover:cursor-text focus:outline-black transition-all"
                        required
                    />
                    <label
                        htmlFor="email"
                        className={`absolute left-2 text-mutedSilver transition-all px-1 ${
                            !isEmpty.email || isFocusedEmail ? "top-[0px] text-[10px] z-3" : "top-2 text-base"
                        }`}
                    >
                        Email or phone
                    </label>
                </div>
                {showErrorEmailInvalid && <p className="text-red-800 text-[12px]">Please enter a valid email address.</p>}
            </div>

            <div className="relative w-full">
                <div className="relative mb-13 w-full">
                    <input
                        value={passText}
                        type={isHidden ? "password" : "text"}
                        name="password"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleFocusOut}
                        id="password"
                        placeholder=" "
                        className="peer z-1 border w-full h-11 rounded-sm absolute pl-2 pr-12 hover:cursor-text focus:outline-black transition-all"
                        required
                    />
                    <label
                        htmlFor="password"
                        className={`absolute left-2 text-mutedSilver transition-all px-1 ${
                            !isEmpty.password || isFocusedPass ? "top-[0px] text-[10px]" : "top-2 text-base"
                        }`}
                    >
                        Password
                    </label>
                    <button onClick={handleClick} className="z-2 absolute top-3 right-1 rounded-2xl text-[12px] border-0 px-1.5 text-warmBlack hover:cursor-pointer">
                        {isHidden ? "Show" : "Hide"}
                    </button>
                </div>
                {showErrorPassInvalid && <p className="text-red-800 text-[12px]">The password must have at least 6 characters.</p>}
            </div>

            <div className="text-center">
                <Link to="/Signin/ForgotPassword" className="text-warmBlack px-2 font-semibold hover:underline hover:rounded-3xl">
                    Forgot password?
                </Link>
                <Outlet />
            </div>

            <div className="flex items-center px-2">
                <input type="checkbox" id="default-checkbox" className="mr-2 scale-95" />
                <label htmlFor="default-checkbox" className="text-[14px] text-warmBlack">
                    Keep me logged in
                </label>
            </div>

            <div className="flex w-full justify-center">
                <AuthenticationSignInButton text="Sign in" />
            </div>
        </form>
    );
}

export default SignInInformation;
