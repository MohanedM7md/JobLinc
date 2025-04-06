import SettingsSection from "./SettingsSection";

function SignInAndSecurity ()
{
    return (
        <div data-testid="sign-in-security">
            <SettingsSection title="Account access" items={[
                "Email addresses",
                "Phone numbers",
                "Change password",
                "Passkeys",
                "Where you're signed in",
                "Devices that remember your password",
                "Two-step verification"
            ]} />

                
        </div>
    );
}

export default SignInAndSecurity;