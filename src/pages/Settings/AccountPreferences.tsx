import SettingsSection from "./SettingsSection";

function AccountPreferences ()
{
    return (
        <div data-testid="account-preferences" className="flex flex-col gap-6" >
            <SettingsSection
             title="Profile information" 
             items={[
                "Name, location, and industry",
                "Personal demographic information",
                "Verifications"
            ]} 
            basePath="account-preferences/profile-information"
            itemPaths={[ 
                "name-location-industry",
                "demographic-info",
                "verifications"]}
            />

            <SettingsSection 
                title="Display" 
                items={["Dark mode"]}
                basePath="account-preferences/display"
                itemPaths={[
                    "dark-mode",
                ]}
            />

            <SettingsSection 
                title="General preferences" 
                items={[
                    "Language",
                    "Content language",
                    "Autoplay videos",
                    "Sound effects",
                    "Showing profile photos",
                    "Preferred Feed View",
                    "People you unfollowed"
                ]}
                basePath="account-preferences/general-preferences"
                itemPaths={[
                    "language",
                    "content-language",
                    "autoplay-videos",
                    "sound-effects",
                    "showing-profile-photos",
                    "preferred-feed-view",
                    "people-you-unfollowed"
                ]}
            />

            <SettingsSection 
                title="Syncing options" 
                items={[
                    "Sync calendar",
                    "Sync contacts",
                ]}
                basePath="account-preferences/syncing-options"
                itemPaths={[
                    "sync-calendar",
                    "sync-contacts"
                ]}
            />

            <SettingsSection 
                title="Subscriptions & payments" 
                items={[
                    "Upgrade for Free",
                    "View purchase history",
                ]}
                basePath="account-preferences/subscriptions-payments"
                itemPaths={[
                    "upgrade-for-free",
                    "view-purchase-history"
                ]}
            />

            <SettingsSection 
                title="Partners & services" 
                items={[
                    "Microsoft",
                ]}
                basePath="account-preferences/partners-services"
                itemPaths={[
                    "microsoft"
                ]}
            />

            <SettingsSection 
                title="Account Management" 
                items={[
                    "Hibernate account",
                    "Close account",
                ]}
                basePath="account-preferences/account-management"
                itemPaths={[
                    "hibernate-account",
                    "close-account"
                ]}
            />
        </div>
    );
}




export default AccountPreferences;