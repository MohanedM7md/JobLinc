import SettingsSection from "./SettingsSection";

function Notifications ()
{
    return (
        <div data-testid="notifications">
            <SettingsSection title="Notifications you receive" items={[
                "Searching for a job",
                "Hiring someone",
                "Connecting with others",
                "Network catch-up updates",
                "Posting and commenting",
                "Messaging",
                "Groups",
                "Pages",
                "Attending events",
                "News and reports",
                "Updating your profile",
                "Verifications",
                "Games"
            ]} />

            
        </div>
    );
}

export default Notifications;