import SettingsSection from "./SettingsSection";

function Notifications ()
{
    return (
        <div data-testid="notifications" className="flex flex-col gap-6">
            <SettingsSection 
            title="Notifications you receive" 
            items={[
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
            ]} 
            basePath="notifications/received"
            itemPaths={[
                "searching-for-a-job",
                "hiring-someone",
                "connecting-with-others",
                "network-catch-up-updates",
                "posting-and-commenting",
                "messaging",
                "groups",
                "pages",
                "attending-events",
                "news-and-reports",
                "updating-your-profile",
                "verifications",
                "games"
            ]}
            />

            
        </div>
    );
}

export default Notifications;