import SignHeader from "../components/Authentication/Headers/SignHeader";
import EmailFieldNormal from "../components/Authentication/Utilities/EmailFieldNormal";
import { SetStateAction, useState } from "react";
import { AuthenticationSignInButton } from "../components/Authentication/AuthenticationButtons";
import { updateEmail } from "@store/user/userThunks";
import { useAppDispatch } from "@store/hooks";
import UpdatedSuccessfully from "../components/Authentication/Utilities/UpdatedSuccessfully";
import UpdateFailed from "../components/Authentication/Utilities/UpdateFailed";
import { ChevronLeftIcon } from "lucide-react";
import store from "@store/store";

type UpdateEmailProps = {
    setIsUpdateEmailClicked: React.Dispatch<SetStateAction<boolean>>;
}
function UpdateEmail(props: UpdateEmailProps)
{
    const [emailText, setEmailText] = useState("");
    const [emailUpdatedSuccessfully, setEmailUpdatedSuccessfully] = useState(false);
    const [emailUpdateFailed, setEmailUpdateFailed] = useState(false);
    const [showErrorEmailEmpty, setshowErrorEmailEmpty] = useState(false);
    const [showErrorEmailInvalid, setshowErrorEmailInvalid] = useState(false);
    const dispatch = useAppDispatch();
    async function isValidSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!showErrorEmailEmpty && !showErrorEmailInvalid) {
            const user = store.getState().user
            if (emailText === user.email)
            {
                setEmailUpdateFailed(true);
                return;
            }
            const userId = user.userId;
            const userData = {
                userId: userId || "",
                email: emailText,
            };
        
            dispatch(updateEmail(userData))
            .then(() => {
                setEmailUpdatedSuccessfully(true);
            })
            .catch((err) => {
                console.error(err);
            });
        }
        else
        {
            setEmailUpdateFailed(true);
            setEmailUpdatedSuccessfully(false);
        }
        
    }
    {

    }
    return (
        <div className="flex flex-col items-center justify-center w-full bg-white">

        {emailUpdatedSuccessfully ? 
        (<UpdatedSuccessfully WhatIsUpdated="Email updated successfully!" goTo="/home" />) : emailUpdateFailed ? 
        (   <UpdateFailed
            WhatFailed="Email update failed"
            errorText="Please enter a valid email address. Click the button below to try again."
            setVisible={setEmailUpdateFailed}
            />
        ) : (
            <form
            onSubmit={isValidSubmit}
            className="flex flex-col w-80 items-start gap-3 mb-3 bg-lightGray p-5 rounded-xl"
            >
            <div className="flex items-center w-[60px] hover:underline hover:cursor-pointer" onClick={() => {props.setIsUpdateEmailClicked(false)}}>
                <ChevronLeftIcon/>
                <p>Back</p>
            </div>
            <EmailFieldNormal
                emailText={emailText}
                setEmailText={setEmailText}
                showErrorEmailEmpty={showErrorEmailEmpty}
                setshowErrorEmailEmpty={setshowErrorEmailEmpty}
                showErrorEmailInvalid={showErrorEmailInvalid}
                setshowErrorEmailInvalid={setshowErrorEmailInvalid}
            />
            <AuthenticationSignInButton id="update-email-btn" text="Update Email" />
            </form>
        )}
        </div>
    );
    
}

export default UpdateEmail;
