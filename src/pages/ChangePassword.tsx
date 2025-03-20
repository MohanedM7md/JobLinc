import SignHeader from "../components/Authentication/SignHeader";
import { AuthenticationSignInButton } from "../components/Authentication/AuthenticationButtons";
import { useState, useEffect } from "react";
import store from "../store/store";
import { changePassword, setPassword } from "../store/userSlice";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

import { useNavigate } from "react-router-dom";

import Modal from "../components/Authentication/Modal";
import { Link } from "react-router-dom";
function ChangePassword()
{
    const [oldPassText, setOldPassText] = useState("");
    const [newPassText, setNewPassText] = useState("");

    const [isHiddenOld, setIsHiddenOld] = useState(false);
    const [isHiddenNew, setIsHiddenNew] = useState(false);

    const [showErrorOldPassEmpty, setShowErrorOldPassEmpty] = useState(false);
    const [showErrorOldPassInvalid, setShowErrorOldPassInvalid] = useState(false);

    const [showErrorNewPassEmpty, setShowErrorNewPassEmpty] = useState(false);
    const [showErrorNewPassInvalid, setShowErrorNewPassInvalid] = useState(false);

    const[isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
    const[isModalErrorOpen, setIsModalErrorOpen] = useState(false);

    const[showError, setShowError] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();


    // useEffect(() => {
    //     if (isModalSuccessOpen)
    //     {
    //         setTimeout(() => {
    //             setIsModalSuccessOpen(false);
    //             navigate("/MainPage");
    //         }, 2000);
    //     }
    // },[isModalSuccessOpen]);

    async function isValidSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        if (isValidPassword(oldPassText) && isValidPassword(newPassText))
        {
            if (oldPassText !== newPassText)
            {
                // Check that OldPassword is the correct password stored in the DB
                // If it is, then update the password to the new password
                // Else, show an error message --> Use Modal Component
                const userData = {
                    oldPassword: oldPassText,
                    newPassword: newPassText,
                    // accessToken: store.getState().user.accessToken || "",
                    refreshToken: store.getState().user.refreshToken || ""
                };
                console.log("store status before changing password: " + JSON.stringify(store.getState().user));
                dispatch(setPassword({password: newPassText}));
                const response = await dispatch(changePassword(userData));
                
                console.log("response: " + JSON.stringify(response));
                if (changePassword.fulfilled.match(response))
                {
                    // Redirect to the Home Page
                    console.log("store status after changing password: " + JSON.stringify(store.getState().user));
                    setIsModalSuccessOpen(true);
                }
                else
                {
                    setIsModalErrorOpen(true);
                }
            }
            else
            {
                setShowError(true);
            }
        }
    }

    function isValidPassword(pass: string) : boolean {
        return pass.length >= 6;
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        const id = event.currentTarget.id;
        if (id === "toggle-old-pass") {
            setIsHiddenOld(prevVal => !prevVal);
        }
        else if (id === "toggle-new-pass") {
            setIsHiddenNew(prevVal => !prevVal);
        }
        event.preventDefault();
    }

    function handleFocusOut(event: React.FocusEvent<HTMLInputElement>) {
        const { value } = event.target;
        const id = event.currentTarget.id;
        if (value.length === 0) {
            if (id === "old-password") {
                setShowErrorOldPassEmpty(true);
                setShowErrorOldPassInvalid(false);
            }
            else if (id === "new-password") {
                setShowErrorNewPassEmpty(true);
                setShowErrorNewPassInvalid(false);
            }
        }
        else {
            if (id === "old-password") {
                setShowErrorOldPassInvalid(!isValidPassword(value));
                setShowErrorOldPassEmpty(false);
            }
            else if (id === "new-password") {
                setShowErrorNewPassInvalid(!isValidPassword(value));
                setShowErrorNewPassEmpty(false);
            }
        }

    }
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        const id = event.currentTarget.id;
        if (id === "old-password") {
            setOldPassText(value);
            setShowErrorOldPassEmpty(false);
            setShowErrorOldPassInvalid(false);
            setShowError(false);
        }
        else if (id === "new-password") {
            setNewPassText(value);
            setShowErrorNewPassEmpty(false);
            setShowErrorNewPassInvalid(false);
            setShowError(false);
        }
    }


    return (
        <div className="flex h-screen w-full bg-charcoalWhite items-center justify-center">
            <SignHeader />
            <form onSubmit={isValidSubmit}>
                <div className="flex flex-col w-80 gap-4 bg-lightGray p-5 rounded-xl">
                    <h1 className="text-warmBlack text-[20px] font-bold">Reset Password</h1>
                    <div className="flex flex-col relative w-full">
                        <label htmlFor="password" className="text-[14px] text-charcoalBlack font-bold">Old password *</label>
                        <input value={oldPassText} name="password" type={isHiddenOld ? "password" : "text"} onBlur={handleFocusOut} onChange={handleChange} required id="old-password" 
                        className={`outline-[0.7px] text-[14px] text-charcoalBlack h-8 pl-2 pr-10 rounded-sm hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px] ${(showErrorOldPassEmpty || showErrorOldPassInvalid) && "outline-red-700 hover:outline-red-900"}`}></input>
                        {showErrorOldPassEmpty && <p className="text-red-800 text-[10px]">Please enter your password.</p>}
                        {showErrorOldPassInvalid && <p data-testid="errorOldPass" className="text-red-800 text-[10px]">Password must be 6 characters or more.</p>}
                        <button onClick={handleClick} id="toggle-old-pass" className="z-2 absolute top-7.5 right-0 rounded-2xl text-[10px] border-0 px-1.5 text-charcoalBlack font-semibold hover:cursor-pointer">{isHiddenOld ? "Show" : "Hide"}</button>
                    </div>
                    <div className="flex flex-col relative w-full">
                        <label htmlFor="password" className="text-[14px] text-charcoalBlack font-bold">New password *</label>
                        <input value={newPassText} name="password" type={isHiddenNew ? "password" : "text"} onBlur={handleFocusOut} onChange={handleChange} required id="new-password" 
                        className={`outline-[0.7px] text-[14px] text-charcoalBlack h-8 pl-2 pr-10 rounded-sm hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px] ${(showErrorNewPassEmpty || showErrorNewPassInvalid) && "outline-red-700 hover:outline-red-900"}`}></input>
                        {showErrorNewPassEmpty && <p className="text-red-800 text-[10px]">Please enter your password.</p>}
                        {showErrorNewPassInvalid && <p data-testid="errorNewPass" className="text-red-800 text-[10px]">Password must be 6 characters or more.</p>}
                        <button onClick={handleClick} id="toggle-new-pass" className="z-2 absolute top-7.5 right-0 rounded-2xl text-[10px] border-0 px-1.5 text-charcoalBlack font-semibold hover:cursor-pointer">{isHiddenNew ? "Show" : "Hide"}</button>
                    </div>
                    {showError && <p data-testid="errorLogical" className="text-red-800 text-[10px]">New password can't be as old password.</p>}
                    

                    <AuthenticationSignInButton id="done-btn" text="Done"/>
                </div>
            </form>

            <Modal isOpen={isModalSuccessOpen} onClose={() => {setIsModalSuccessOpen(false)}}>
                <div className="flex flex-col items-center">
                    <h1 className="text-warmBlack text-[20px] font-bold">Password Changed Successfully</h1>
                    <p>Redirecting you to Main page..</p>
                </div>
            </Modal>

            <Modal isOpen={isModalErrorOpen} onClose={() => {setIsModalErrorOpen(false)}}>
                <div className="flex flex-col items-center">
                    <h1 className="text-warmBlack text-[20px] font-bold">Old password is incorrect</h1>
                    <strong>Did you forget your password? <Link to="/Signin/ForgotPassword" className="text-[16px] text-warmBlack hover:underline">Forgot password</Link></strong>
                </div>
            </Modal>
        </div>
    );
}

export default ChangePassword;