



function AuthenticationGoogleButton()
{
    return (
        <div className="border-1 w-60 h-10 rounded-[3.125rem] p-2.5 mb-5 text-[13px] flex justify-center items-center hover:bg-blue-50 hover:bg-opacity-5 hover:cursor-pointer transition-all duration-200">
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
        <div className="border-1 border-gray-600 w-60 h-10 rounded-[3.125rem] p-2.5 mb-5 text-[15px] text-gray-500 flex justify-center items-center hover:border-2 hover:bg-gray-100 hover:cursor-pointer">
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
        <div className="border-1 border-black w-60 h-10 rounded-[3.125rem] p-2.5 mb-5 text-[15px] text-black flex justify-center items-center hover:bg-gray-100 hover:cursor-pointer">
            <div className="flex-shrink-0 w-4 mr-2">
                <img src="src\assets\Microsoft_logo.svg.png"/>
            </div>
            <p>Continue with Microsoft</p>
        </div> 
    ); 
}

function AuthenticationSignInButton()
{
    return (<button className="bg-blue-800 w-60 py-2 text-white font-semibold rounded-3xl mb-4 hover:bg-blue-900 hover:cursor-pointer">Sign in</button>);

}

export {AuthenticationGoogleButton, AuthenticationAppleButton, AuthenticationMicrosoftButton, AuthenticationSignInButton};