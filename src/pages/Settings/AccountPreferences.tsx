import SettingsSection from "./SettingsSection";

function AccountPreferences ()
{
    return (
        <div data-testid="account-preferences">
            <SettingsSection title="Profile information" items={[
                "Name, location, and industry",
                "Personal demographic information",
                "Verifications"
            ]} />

            <SettingsSection title="Display" items={["Dark mode"]} />

            <SettingsSection title="General preferences" items={[
                "Language",
                "Content language",
                "Autoplay videos",
                "Sound effects",
                "Showing profile photos",
                "Preferred Feed View",
                "People you unfollowed"
            ]} />


            <SettingsSection title="Syncing options" items={[
                "Sync calendar",
                "Sync contacts",
            ]} />

            <SettingsSection title="Subscriptions & payments" items={[
                "Upgrade for Free",
                "View purchase history",
            ]} />

            <SettingsSection title="Partners & services" items={[
                "Microsoft",
            ]} />

            <SettingsSection title="General preferences" items={[
                "Hibernate account",
                "Close account",
            ]} />
        </div>
    );
}




export default AccountPreferences;