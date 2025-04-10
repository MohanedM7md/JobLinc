import SignHeader from "../components/Authentication/Headers/SignHeader";
import EmailFieldNormal from "../components/Authentication/Utilities/EmailFieldNormal";
import { useState } from "react";
import { AuthenticationSignInButton } from "../components/Authentication/AuthenticationButtons";
import { updateEmail } from "@store/user/userThunks";
import { useAppDispatch } from "@store/hooks";

function UpdateEmail()
{
    const [emailText, setEmailText] = useState("");
    const [showErrorEmailEmpty, setshowErrorEmailEmpty] = useState(false);
    const [showErrorEmailInvalid, setshowErrorEmailInvalid] = useState(false);
    const dispatch = useAppDispatch();
    async function isValidSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!showErrorEmailEmpty && !showErrorEmailInvalid) {
            const storedUser = localStorage.getItem("userState");
            const user = JSON.parse(storedUser || "{}");
        
            const userId = user.userId;
            const userData = {
                userId: userId,
                email: emailText,
            };
        
            dispatch(updateEmail(userData))
            .then(() => {
                console.log("Email updated successfully");
        
                const updatedUser = {
                    ...user,
                    email: emailText
                };
                localStorage.setItem("userState", JSON.stringify(updatedUser));
            })
            .catch((err) => {
                console.error(err);
            });
        }
        
    }
    {

    }
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-white"> 
            <SignHeader />
            <form onSubmit={isValidSubmit} className="flex flex-col w-80 items-start gap-3 mb-3 bg-lightGray p-5 rounded-xl">
                <EmailFieldNormal emailText={emailText} setEmailText={setEmailText} showErrorEmailEmpty={showErrorEmailEmpty} setshowErrorEmailEmpty={setshowErrorEmailEmpty} showErrorEmailInvalid={showErrorEmailInvalid} setshowErrorEmailInvalid={setshowErrorEmailInvalid} />
                <AuthenticationSignInButton id="update-email-btn" text="Update Email"/>
            </form>
        </div>
    );
    
}

export default UpdateEmail;
