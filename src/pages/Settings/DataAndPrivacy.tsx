import SettingsSection from "./SettingsSection";

function DataAndPrivacy ()
{
    return (
        <div data-testid="data-privacy">
            <SettingsSection title="How LinkedIn uses your data" items={[
                "Manage your data and activity",
                "Get a copy of your data",
                "Search history",
                "Personal demographic information",
                "Social, economic, and workplace research",
                "Data for Generative AI Improvement"
            ]} />
            <SettingsSection title="Who can reach you" items={[
                "Invitations to connect",
                "Invitations from your network",
                "Messages",
                "Research invites",
                "LinkedIn promotions"
            ]} />

            <SettingsSection title="Messaging experience" items={[
                "Focused Inbox: On",
                "Read receipts and typing indicators: On",
                "Suggested replies: On",
                "Message nudges: On",
                "Automated detection of harmful content: On"
            ]} />
            <SettingsSection title="Job seeking preferences" items={[
                "Job application settings",
                "Share your profile when you click Apply for a job: On",
                "Signal your interest to recruiters at companies you've created job alerts for: Off",
                "Stored job applicant accounts"
            ]} />
            <SettingsSection title="Other applications" items={[
                "Permitted services",
                "Microsoft Word"
            ]} />

                
        </div>
    );
}

export default DataAndPrivacy;