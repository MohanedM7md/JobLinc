import SettingsSection from "./SettingsSection";

function AdvertisingData ()
{
    return (
        <>
            <SettingsSection title="Profile data" items={[
                "Connections: On",
                "Education you follow: On",
                "Groups: On",
                "Companies and Skills: Schools & 4 more",
                "Job Information: Current job & 1 more",
                "Employer: Current company & 1 more",
                "Customized display format: On",
                "Profile Location: On"
            ]} />
            <SettingsSection title="Activity and inferred data" items={[
                "Inferred city location: On",
                "Interests and traits: On",
                "Age range: On",
                "Gender: On"
            ]} />
            <SettingsSection title="Third-party data" items={[
                "Ads beyond LinkedIn: On",
                "Interactions with businesses: On",
                "Ad-related actions: On"
            ]} />
        </>
    );
}

export default AdvertisingData;