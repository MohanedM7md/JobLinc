import SettingsSection from "./SettingsSection";

function Visibility()
{
    return (
        <div data-testid="visibility">
            <SettingsSection title="Visibility of your profile & network" items={[
                "Profile viewing options",
                "Page visit visibility",
                "Edit your public profile",
                "Who can see or download your email address",
                "Who can see your connections",
                "Who can see members you follow",
                "Who can see your last name",
                "Representing your organizations and interests",
                "Page owners exporting your data",
                "Profile discovery and visibility off LinkedIn",
                "Profile discovery using email address",
                "Profile discovery using phone number",
                "Blocking"
            ]} />

            <SettingsSection title="Visibility of your LinkedIn activity" items={[
                "Manage active status (Your Connections only)",
                "Share job changes, education changes, and work anniversaries from profile (Off)",
                "Notify connections when you're in the news (On)",
                "Mentioned by others (On)",
                "Followers"
            ]} />
        </div>
    );
}

export default Visibility;