import SignHeader from "../components/Authentication/SignHeader";
import { AuthenticationSignInButton } from "../components/Authentication/AuthenticationButtons";
import { useState } from "react";
import store from "../store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { resetPassword } from "../store/userSlice";
import Modal from "../components/Authentication/Modal";
import { log } from "console";


function ResetPassword()
{

    const [passText, setPassText] = useState("");
    const [isHidden, setIsHidden] = useState(true);

    const [showErrorPassEmpty, setshowErrorPassEmpty] = useState(false);
    const [showErrorPassInvalid, setshowErrorPassInvalid] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);



    const dispatch = useDispatch<AppDispatch>();

    function isValidPassword(pass: string) : boolean
    {
        return pass.length >= 6;
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setIsHidden(prevVal => !prevVal);
        event.preventDefault();
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setPassText(value);
        setshowErrorPassEmpty(false);
        setshowErrorPassInvalid(false);
    }

    function handleFocusOut(event: React.FocusEvent<HTMLInputElement>) {
        const { value } = event.target;
        if (value.length === 0) {
            setshowErrorPassEmpty(true);
            setshowErrorPassInvalid(false);
        }
        else
        {
            if (!isValidPassword(value))
            {
                setshowErrorPassInvalid(true);
                setshowErrorPassEmpty(false);
            }
        }
    }

    async function isValidSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        if (isValidPassword(passText))
        {   
            const userData = {
                email: store.getState().user.email || "",
                newPassword: passText,
                resetToken: store.getState().user.resetToken || ""
            };

            const resultAction = await dispatch(resetPassword(userData));

            console.log("result action: " + JSON.stringify(resultAction));
            if (resetPassword.fulfilled.match(resultAction))
            {
                setIsModalOpen(true);
            }
            else
            {
                setIsModalErrorOpen(true);
            }
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-charcoalWhite m-0">
            <SignHeader />
            <form onSubmit={isValidSubmit}>
                <div className="flex flex-col w-80 gap-4 bg-lightGray p-5 rounded-xl">
                    <h1 className="text-warmBlack text-[20px] font-bold">Reset Password</h1>
                    <div className="flex flex-col relative w-full">
                        <label htmlFor="password" className="text-[14px] text-charcoalBlack font-bold">New password *</label>
                        <input value={passText} name="password" type={isHidden ? "password" : "text"} onBlur={handleFocusOut} onChange={handleChange} required id="password" 
                        className={`outline-[0.7px] text-[14px] text-charcoalBlack h-8 pl-2 pr-10 rounded-sm hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px] ${(showErrorPassEmpty || showErrorPassInvalid) && "outline-red-700 hover:outline-red-900"}`}></input>
                        {showErrorPassEmpty && <p className="text-red-800 text-[10px]">Please enter your password.</p>}
                        {showErrorPassInvalid && <p data-testid="errorPass" className="text-red-800 text-[10px]">Password must be 6 characters or more.</p>}
                        <button onClick={handleClick} className="z-2 absolute top-7.5 right-0 rounded-2xl text-[10px] border-0 px-1.5 text-charcoalBlack font-semibold hover:cursor-pointer">{isHidden ? "Show" : "Hide"}</button>
                    </div>
                    <AuthenticationSignInButton id="done-btn" text="Done"/>
                </div>
            </form>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col gap-3">
                    <h2 className="font-bold text-[18px]">Password changed successfully!</h2>
                    <p>Redirecting you back to main page..</p>
                </div>
            </Modal>

            <Modal isOpen={isModalErrorOpen} onClose={() => setIsModalErrorOpen(false)}>
                <div className="flex flex-col gap-3">
                    <h2 className="font-bold text-[18px]">An error Occurred.</h2>
                    <p>Please try again later.</p>
                </div>
            </Modal>
        </div>
    );
}

export default ResetPassword;