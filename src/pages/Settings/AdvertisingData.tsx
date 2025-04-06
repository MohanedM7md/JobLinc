import SettingsSection from "./SettingsSection";

function AdvertisingData ()
{
    return (
        <div data-testid="advertising-data" className="flex flex-col gap-6">
            <SettingsSection 
                title="Profile data" 
                items={[
                    "Connections",
                    "Education you follow",
                    "Groups",
                    "Companies and Skills",
                    "Job Information",
                    "Employer",
                    "Customized display format",
                    "Profile Location"
                ]}
                basePath="advertising-data/profile-data"
                itemPaths={[
                    "connections",
                    "education-you-follow",
                    "groups",
                    "companies-and-skills",
                    "job-information",
                    "employer",
                    "customized-display-format",
                    "profile-location"
                ]}
            />

            <SettingsSection 
                title="Activity and inferred data" 
                items={[
                    "Inferred city location",
                    "Interests and traits",
                    "Age range",
                    "Gender"
                ]}
                basePath="advertising-data/activity-and-data"
                itemPaths={[
                    "inferred-city-location",
                    "interests-and-traits",
                    "age-range",
                    "gender"
                ]}
            />

            <SettingsSection 
                title="Third-party data" 
                items={[
                    "Ads beyond JobLinc",
                    "Interactions with businesses",
                    "Ad-related actions"
                ]}
                basePath="advertising-data/third-party-data"
                itemPaths={[
                    "ads-beyond-joblinc",
                    "interactions-with-businesses",
                    "ad-related-actions"
                ]}
            />
        </div>
    );
}

export default AdvertisingData;