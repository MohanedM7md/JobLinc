import React from "react";
import { ChangeEvent } from "react";
import { isValidEmail } from "./Validations";
interface EmailFieldWithMovingLabelProps {
    emailText: string;
    setEmailText: (value: string) => void;
    showErrorEmailInvalid: boolean;
    setshowErrorEmailInvalid: (value: boolean) => void;
}


const EmalFieldWithMovingLabel: React.FC<EmailFieldWithMovingLabelProps> = ({ emailText, setEmailText, 
                                                                              showErrorEmailInvalid, setshowErrorEmailInvalid, }) => 
{

    const [isFocusedEmail, setFocusedEmail] = React.useState(false);
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setEmailText(value);
        setshowErrorEmailInvalid(false);
    }

    function handleFocus() {
        setFocusedEmail(true);
    }

    function handleFocusOut() {
        setFocusedEmail(false);
        if (emailText.length === 0)
            setshowErrorEmailInvalid(false);
        else if (!isValidEmail(emailText))
            setshowErrorEmailInvalid(true);
    }
    return (
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
                    htmlFor="email-or-phone"
                    aria-labelledby="email-or-phone"
                    className={`absolute left-2 text-mutedSilver transition-all px-1 ${
                        emailText.length !== 0 || isFocusedEmail ? "top-[0px] text-[10px] z-3" : "top-2 text-base"
                    }`}
                >
                    Email
                </label>
            </div>
            {showErrorEmailInvalid && <p data-testid="errorEmail" className="text-red-800 text-[12px]">Please enter a valid email address.</p>}
        </div>
    );
}

export default EmalFieldWithMovingLabel