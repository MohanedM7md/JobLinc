import SignHeader from "../components/Authentication/SignHeader";
import { AuthenticationSignInButton } from "../components/Authentication/AuthenticationButtons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { resetPassword } from "../store/userSlice";
import Modal from "../components/Authentication/Modal";
import PasswordFieldNormal from "../components/Authentication/Utilities/PasswordFieldNormal";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


interface ResetPasswordProps {
    email: string;
    resetToken: string;
}

function ResetPassword()
{

    const [passText, setPassText] = useState("");

    const [showErrorPassEmpty, setshowErrorPassEmpty] = useState(false);
    const [showErrorPassInvalid, setshowErrorPassInvalid] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const {email, resetToken} = location.state as ResetPasswordProps;

    const navigate = useNavigate();
    useEffect(() => {
        if (isModalOpen)
        {
            setTimeout(() => {
                navigate("/home")
            }, 2000)
        }
    }, [isModalOpen])

    function isValidPassword(pass: string) : boolean
    {
        return pass.length >= 6;
    }


    async function isValidSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        if (isValidPassword(passText))
        {   
            const userData = {
                email: email || "",
                newPassword: passText,
                resetToken: resetToken || ""
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
                    <PasswordFieldNormal labelText="New Password *" passwordText={passText} setPasswordText={setPassText} showErrorPassEmpty={showErrorPassEmpty} setshowErrorPassEmpty={setshowErrorPassEmpty} showErrorPassInvalid={showErrorPassInvalid} setshowErrorPassInvalid={setshowErrorPassInvalid} />
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