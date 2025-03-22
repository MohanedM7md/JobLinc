import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationSignInButton } from "./AuthenticationButtons";
import { useDispatch } from "react-redux";
import { setEmail, setPassword } from "../../store/userSlice";
import EmailFieldNormal from "./Utilities/EmailFieldNormal";
import PasswordFieldNormal from "./Utilities/PasswordFieldNormal";
import Checkbox from "./Utilities/Checkbox";
import store from "../../store/store";
function SignUpInformation() {

    const [emailText, setEmailText] = useState("");
    const [passText, setPassText] = useState("");
    const [showErrorEmailEmpty, setshowErrorEmailEmpty] = useState(false);
    const [showErrorEmailInvalid, setshowErrorEmailInvalid] = useState(false);

    const [showErrorPassEmpty, setshowErrorPassEmpty] = useState(false);
    const [showErrorPassInvalid, setshowErrorPassInvalid] = useState(false);

    const [showErrorRecaptcha, setShowErrorRecaptcha] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const recaptchaRendered = useRef(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    function isValidSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!showErrorPassInvalid && !showErrorEmailInvalid)
        {
            // Now we can take the First Name and Last Name
            // Navigate to Another Page

            // Now I have email and password, I need to put them in the store
            // and take more details about the user in upcoming pages

            // const userData = {
            //     email: emailText,
            //     password: passText
            // }
            const recaptchaChecked = window.grecaptcha.getResponse();
            if (recaptchaChecked !== "")
            {
                dispatch(setEmail({email: emailText}));
                dispatch(setPassword({password: passText}));
                // Set access token in the local storage
                navigate("/UserDetails");
            }
            else
            {
                setShowErrorRecaptcha(true);
            }
        }
    }

    return (
        <form onSubmit={isValidSubmit} className="flex flex-col w-80 items-start gap-3 mb-3">
            <EmailFieldNormal emailText={emailText} setEmailText={setEmailText} showErrorEmailEmpty={showErrorEmailEmpty} setshowErrorEmailEmpty={setshowErrorEmailEmpty} showErrorEmailInvalid={showErrorEmailInvalid} setshowErrorEmailInvalid={setshowErrorEmailInvalid} />
            
            <PasswordFieldNormal labelText="Password *" passwordText={passText} setPasswordText={setPassText} showErrorPassEmpty={showErrorPassEmpty} setshowErrorPassEmpty={setshowErrorPassEmpty} showErrorPassInvalid={showErrorPassInvalid} setshowErrorPassInvalid={setshowErrorPassInvalid} />

            <Checkbox labelText="Remember me" />

            <div id="recaptcha-container" className="g-recaptcha" data-sitekey="6Le48PQqAAAAABGnl1yAsKhhNuTnArdIGeRyuQoV"></div>
            {showErrorRecaptcha && <p data-testid="errorRECAPTCHA" className="text-red-800 text-[12px]">Please complete the reCAPTCHA.</p>}

            <div className="flex w-full flex-col items-center justify-center">
                <div className="text-[12px] text-mutedSilver mb-3">By clicking Agree & Join or Continue, you agree to the JobLinc's <span className="text-softRosewood font-semibold">User Agreement</span>, <span className="text-softRosewood font-semibold">Privacy Policy</span>, and <span className="text-softRosewood font-semibold">Cookie Policy.</span></div>
                <AuthenticationSignInButton id="sign-up-btn" text="Agree & Join"/>
            </div>
        </form>
    );
}

export default SignUpInformation;
