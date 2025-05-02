import SettingsSection from "./SettingsSection";

function Visibility()
{
    return (
        <div data-testid="visibility" className="flex flex-col gap-6">
            <SettingsSection 
                title="Visibility of your profile & network" 
                items={[
                "Account Visibility",
                "Blocking"
            ]} 
            basePath="visibility/profile-network"
            itemPaths={[
                "account-visibility",
                "blocking"
            ]}
            />
        </div>
    );
}

export default Visibility;