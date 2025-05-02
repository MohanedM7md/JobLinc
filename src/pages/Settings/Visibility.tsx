import SettingsSection from "./SettingsSection";

function Visibility()
{
    return (
        <div data-testid="visibility" className="flex flex-col gap-6">
            <SettingsSection 
                title="Visibility of your profile & network" 
                items={[
                "Profile viewing options",
                "Page visit visibility",
                "Edit your public profile",
                "Who can see or download your email address",
                "Who can see your connections",
                "Who can see members you follow",
                "Who can see your last name",
                "Representing your organizations and interests",
                "Page owners exporting your data",
                "Profile discovery and visibility off JobLinc",
                "Profile discovery using email address",
                "Profile discovery using phone number",
                "Blocking"
            ]} 
            basePath="visibility/profile-network"
            itemPaths={[
                "profile-viewing-options",
                "page-visit-visibility",
                "edit-your-public-profile",
                "who-can-see-or-download-your-email-address",
                "who-can-see-your-connections",
                "who-can-see-members-you-follow",
                "who-can-see-your-last-name",
                "representing-your-organizations-and-interests",
                "page-owners-exporting-your-data",
                "profile-discovery-and-visibility-off-joblinc",
                "profile-discovery-using-email-address",
                "profile-discovery-using-phone-number",
                "blocking"
            ]}
            />

            <SettingsSection 
            title="Visibility of your JobLinc activity" 
            items={[
                "Manage active status (Your Connections only)",
                "Share job changes, education changes, and work anniversaries from profile",
                "Notify connections when you're in the news",
                "Mentioned by others",
                "Followers"
            ]} 
            basePath="visibility/activity"
            itemPaths={[
                "manage-active-status",
                "share-job-changes-education-changes-work-anniversaries",
                "notify-connections-when-youre-in-the-news",
                "mentioned-by-others",
                "followers"
            ]}
            />
        </div>
    );
}

export default Visibility;