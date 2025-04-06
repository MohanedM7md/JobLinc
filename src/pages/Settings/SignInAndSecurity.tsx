import SettingsSection from "./SettingsSection";

function SignInAndSecurity ()
{
    return (
        <div data-testid="sign-in-security" className="flex flex-col gap-6">
            <SettingsSection 
            title="Account access" 
            items={[
                "Email addresses",
                "Phone numbers",
                "Change password",
                "Passkeys",
                "Where you're signed in",
                "Devices that remember your password",
                "Two-step verification"
            ]} 
            basePath="sign-in-security/account-access"
            itemPaths={[
                "email-addresses",
                "phone-numbers",
                "change-password",
                "passkeys",
                "where-youre-signed-in",
                "devices-that-remember-your-password",
                "two-step-verification"
            ]}
            />

                
        </div>
    );
}

export default SignInAndSecurity;