import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationSignInButton } from "./AuthenticationButtons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { loginUser, setPassword } from "../../store/userSlice"; // New login thunk
import Modal from "./Modal";
import store from "../../store/store";
import Checkbox from "./Utilities/Checkbox";
import Navigate_Component from "./Utilities/Navigate_Component";
import PasswordFieldWithMovingLabel from "./Utilities/PasswordFieldWIthMovingLabel";
import EmalFieldWithMovingLabel from "./Utilities/EmailFieldWithMovingLabel";
import { isValidEmail, isValidPassword } from "./Utilities/Validations";

declare global {
    interface Window {
        grecaptcha: any;
    }
}

function SignInInformation() {
    const [emailText, setEmailText] = useState("");
    const [passText, setPassText] = useState(""); // State for password text
    const [showErrorEmailInvalid, setshowErrorEmailInvalid] = useState(false);
    const [showErrorPassInvalid, setshowErrorPassInvalid] = useState(false);

    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [showErrorRecaptcha, setShowErrorRecaptcha] = useState(false);
    const recaptchaRendered = useRef(false);

    const [isWrongEmailOrPassword, setIsWrongEmailOrPassword] = useState(false);

    useEffect(() => {
        // Load script only once
        if (!document.querySelector("script[src='https://www.google.com/recaptcha/api.js']")) {
            const script = document.createElement("script");
            script.src = "https://www.google.com/recaptcha/api.js";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }

        // Ensure reCAPTCHA renders only once
        if (window.grecaptcha) {
            window.grecaptcha.ready(() => {
                if (!recaptchaRendered.current) {
                    recaptchaRendered.current = true;
                    const recaptchaElement = document.getElementById("recaptcha-container");

                    if (recaptchaElement && recaptchaElement.childNodes.length === 0) {
                        window.grecaptcha.render(recaptchaElement, {
                            sitekey: "6Le48PQqAAAAABGnl1yAsKhhNuTnArdIGeRyuQoV",
                            callback: (token: string) => {
                                setRecaptchaToken(token);
                                setShowErrorRecaptcha(false);
                            },
                        });
                    }
                }
            });
        }
    }, []);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    async function isValidSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isValidEmail(emailText)) {
            if (isValidPassword(passText)) {
                const recaptchaChecked = window.grecaptcha.getResponse();
                if (recaptchaChecked !== "") {
                    const userData = { email: emailText, password: passText };
                    dispatch(setPassword({password: passText})); 
                    console.log("store data before sign in: " + JSON.stringify(store.getState().user));
                    const resultAction = await dispatch(loginUser(userData));
                    //retrieveUser(userData.email, userData.password);
                    if (loginUser.fulfilled.match(resultAction)) {
                        navigate("/MainPage");
                    }
                    else
                    {
                        // Render a component to say wrong email or password
                        setIsWrongEmailOrPassword(true);
                    }
                }
                else
                {
                    setShowErrorRecaptcha(true);
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
            <EmalFieldWithMovingLabel emailText={emailText} setEmailText={setEmailText} showErrorEmailInvalid={showErrorEmailInvalid} setshowErrorEmailInvalid={setshowErrorEmailInvalid} />

            <PasswordFieldWithMovingLabel passText={passText} setPassText={setPassText} showErrorPassInvalid={showErrorPassInvalid} setshowErrorPassInvalid={setshowErrorPassInvalid} />
            
            <div id="recaptcha-container" className="g-recaptcha" data-sitekey="6Le48PQqAAAAABGnl1yAsKhhNuTnArdIGeRyuQoV"></div>
            {showErrorRecaptcha && <p data-testid="errorRECAPTCHA" className="text-red-800 text-[12px]">Please complete the reCAPTCHA.</p>}

            <Navigate_Component labelText="Forgot password?" navigateTo="/Signin/ForgotPassword" />

            <Checkbox labelText="Keep me logged in" />
            
            <div className="flex w-full justify-center">
                <AuthenticationSignInButton id="sign-in-btn" text="Sign in" />
            </div>

            <Modal isOpen={isWrongEmailOrPassword} onClose={() => setIsWrongEmailOrPassword(false)}>
                <div className="flex flex-col items-start gap-4 w-full">
                    <h2 className="font-bold text-[18px]">Wrong Email or Password.</h2>
                    <p className="text-[18px]">Please try again.</p>
                </div>
            </Modal>
        </form>
    );
}

export default SignInInformation;