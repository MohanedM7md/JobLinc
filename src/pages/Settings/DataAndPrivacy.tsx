import SettingsSection from "./SettingsSection";

function DataAndPrivacy ()
{
    return (
        <div data-testid="data-privacy" className="flex flex-col gap-6">
            <SettingsSection 
            title="How JobLinc uses your data" 
            items={[
                "Manage your data and activity",
                "Get a copy of your data",
                "Search history",
                "Personal demographic information",
                "Social, economic, and workplace research",
                "Data for Generative AI Improvement"
            ]}
            basePath="data-privacy/data-usage"
            itemPaths={[
                "manage-your-data-and-activity",
                "get-a-copy-of-your-data",
                "search-history",
                "personal-demographic-information",
                "social-economic-workplace-research",
                "data-for-generative-ai-improvement"
            ]}
            />

            <SettingsSection 
            title="Who can reach you" 
            items={[
                "Invitations to connect",
                "Invitations from your network",
                "Messages",
                "Research invites",
                "JobLinc promotions"
            ]}
            basePath="data-privacy/reach-you"
            itemPaths={[
                "invitations-to-connect",
                "invitations-from-your-network",
                "messages",
                "research-invites",
                "joblinc-promotions"
            ]}
            />

            <SettingsSection 
            title="Messaging experience" 
            items={[
                "Focused Inbox",
                "Read receipts and typing indicators",
                "Suggested replies",
                "Message nudges",
                "Automated detection of harmful content"
            ]}
            basePath="data-privacy/messaging-experience"
            itemPaths={[
                "focused-inbox",
                "read-receipts-typing-indicators",
                "suggested-replies",
                "message-nudges",
                "automated-detection-of-harmful-content"
            ]}
            />

            <SettingsSection 
            title="Job seeking preferences"
            items={[
                "Job application settings",
                "Share your profile when you click Apply for a job",
                "Signal your interest to recruiters at companies you've created job alerts for",
                "Stored job applicant accounts"
            ]}
            basePath="data-privacy/job-seeking"
            itemPaths={[
                "job-application-settings",
                "share-profile-when-click-apply",
                "signal-interest-to-recruiters",
                "stored-job-applicant-accounts"
            ]}
            />

            <SettingsSection 
            title="Other applications" 
            items={[
                "Permitted services",
                "Microsoft Word"
            ]}
            basePath="data-privacy/other-apps"
            itemPaths={[
                "permitted-services",
                "microsoft-word"
            ]}
            />

                
        </div>
    );
}

export default DataAndPrivacy;