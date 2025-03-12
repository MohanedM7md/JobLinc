

function AuthenticationGoogleButton()
{
    return (
        <div className="border-1 w-full h-10 rounded-[3.125rem] p-2.5 mb-5 text-[15px] flex justify-center items-center hover:bg-blue-50 hover:bg-opacity-5 hover:cursor-pointer transition-all duration-200">
            <div className="flex-shrink-0 w-4 mr-2">
                <img src="src\assets\google-logo.png"/>
            </div>
            <p>Continue with Google</p>
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
};

function AuthenticationSignInButton({ text }: AuthenticationSignInButtonProps)
{
    return (<button className="w-full bg-[#D72638] py-2 text-[#222222] font-semibold rounded-3xl mb-4 hover:bg-[#A52A2A] hover:cursor-pointer">{text}</button>);

}



export {AuthenticationGoogleButton, AuthenticationAppleButton, AuthenticationMicrosoftButton, AuthenticationSignInButton};