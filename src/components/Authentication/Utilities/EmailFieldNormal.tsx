import React from "react";
import { isValidEmail } from "./Validations";
interface EmailFieldNormalProps {
    emailText: string;
    setEmailText: React.Dispatch<React.SetStateAction<string>>;
    showErrorEmailInvalid: boolean;
    setshowErrorEmailInvalid: React.Dispatch<React.SetStateAction<boolean>>;
    showErrorEmailEmpty: boolean;
    setshowErrorEmailEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}
    

const EmailFieldNormal: React.FC<EmailFieldNormalProps> = ({emailText, setEmailText, showErrorEmailEmpty ,setshowErrorEmailEmpty
                                                            ,showErrorEmailInvalid, setshowErrorEmailInvalid}) =>
{

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setEmailText(value);
        setshowErrorEmailInvalid(false);
        setshowErrorEmailEmpty(false);
    }

    function handleFocusOut() {
        if (emailText.length === 0) {
            setshowErrorEmailEmpty(true);
            setshowErrorEmailInvalid(false);
        }
        else {
            setshowErrorEmailInvalid(!isValidEmail(emailText));
        }
    }

    return (
        <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-[14px] text-charcoalBlack font-bold">Email *</label>
            <input value={emailText} name="email" onBlur={handleFocusOut} onChange={handleChange} required id="email"  
            className={`outline-[0.7px] text-[14px] text-charcoalBlack h-8 px-2 rounded-sm hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px] ${(showErrorEmailEmpty || showErrorEmailInvalid) && "outline-red-700 hover:outline-red-900"}`}></input>
            {showErrorEmailEmpty && <p className="text-red-800 text-[10px]">Please enter your email address.</p>}
            {showErrorEmailInvalid && <p data-testid="errorEmail" className="text-red-800 text-[10px]">Please enter a valid email address.</p>}
        </div>
    );
}

export default EmailFieldNormal;