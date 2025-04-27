
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { loginWithGoogle } from '@store/user/userThunks';
import { AppDispatch } from '@store/store';
import { useAppDispatch } from '@store/hooks';
import { useNavigate } from 'react-router-dom';
import store from '@store/store';
function AuthenticationGoogleButton()
{
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const clientId = "1026201483663-9g1k1avpkm7jjajm200uvgt8h8tob6tp.apps.googleusercontent.com";
    return (
        <div className="w-full h-10 rounded-[3.125rem] p-2.5 mb-5 text-[15px] flex justify-center items-center hover:bg-blue-50 hover:bg-opacity-5 hover:cursor-pointer transition-all duration-200">
            <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    dispatch(loginWithGoogle({ credential: credentialResponse.credential || "" })).then(() => {
                        if (store.getState().user.loggedIn)
                        {
                            navigate("/home");
                        }
                    })
                    .catch((error: any) => {
                        console.error("Error while logging in with google: ", error);
                    })
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </GoogleOAuthProvider>
        </div>
    );
}

function AuthenticationAppleButton()
{
    return (
        <div className="border-1 border-gray-600 w-full h-10 rounded-[3.125rem] p-2.5 mb-5 text-[15px] text-gray-500 flex justify-center items-center hover:border-2 hover:bg-gray-100 hover:cursor-pointer">
            <div className="flex-shrink-0 w-8">
                <img src="src\assets\Apple-Logosu.png"/>
            </div>
            <p>Sign in with Apple</p>
        </div> 
    );
}

function AuthenticationMicrosoftButton()
{
    return (
        <div className="border-1 border-black w-full h-10 rounded-[3.125rem] p-2.5 mb-5 text-[15px] text-black flex justify-center items-center hover:bg-gray-100 hover:cursor-pointer">
            <div className="flex-shrink-0 w-4 mr-2">
                <img src="src\assets\Microsoft_logo.svg.png"/>
            </div>
            <p>Continue with Microsoft</p>
        </div> 
    ); 
}

type AuthenticationSignInButtonProps = {
    text: string;
    id: string;
};

function AuthenticationSignInButton({ text, id }: AuthenticationSignInButtonProps)
{
    return (<button id={id} className="w-full bg-crimsonRed py-2 text-charcoalBlack font-semibold rounded-3xl hover:bg-softRosewood hover:cursor-pointer">{text}</button>);

}



export {AuthenticationGoogleButton, AuthenticationAppleButton, AuthenticationMicrosoftButton, AuthenticationSignInButton};