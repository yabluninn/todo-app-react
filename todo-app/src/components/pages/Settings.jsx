import "../../styles/Settings.css";
import SettingsItem from "../layout/settings/SettingsItem.jsx";
import SettingsBlock from "../layout/settings/SettingsBlock.jsx";

export default function Settings() {
    return (
        <div className="settings-container">
            <div className="settings-header">
                <div>
                    <p className="s-header-title">Settings</p>
                    <p className="s-header-subtitle">
                        Here you can manage your profile&apos;s info, data, and appearance
                    </p>
                </div>
            </div>
            <div className="settings-wrapper">
                {/*Profile Section*/}
                <SettingsBlock title="Profile" icon="hgi-user">
                    <SettingsItem
                        title="Username"
                        content="Artem Yablunin"
                        buttonIcon="hgi-pencil-edit-01"
                        buttonAction={() => alert("Edit username")}
                    />
                    <SettingsItem title="Email" content="yablunin.artem@gmail.com" />
                    <SettingsItem
                        title="Password"
                        buttonText="Manage password"
                        buttonClass="s-block-default-button"
                        buttonAction={() => alert("Manage password")}
                    />
                    <SettingsItem
                        title="Account"
                        buttonText="Delete Account"
                        buttonClass="s-block-red-button"
                        buttonAction={() => alert("Delete account")}
                    />
                </SettingsBlock>

                {/* Appearance Section */}
                <SettingsBlock title="Appearance" icon="hgi-paint-brush-04">
                    <SettingsItem
                        title="Theme [In Development]"
                        content="Light"
                        buttonIcon="hgi-paint-board"
                        buttonAction={() => alert("Change theme")}
                    />
                    <SettingsItem
                        title="Language [In Development]"
                        content="English"
                        buttonIcon="hgi-pencil-edit-01"
                        buttonAction={() => alert("Change language")}
                    />
                </SettingsBlock>

                {/* Notifications Section */}
                <SettingsBlock title="Notifications" icon="hgi-notification-01">
                    <SettingsItem
                        title="Push Notifications"
                        content="Enabled"
                        buttonIcon="hgi-pencil-edit-01"
                        buttonAction={() => alert("Edit notifications")}
                    />
                </SettingsBlock>
            </div>
        </div>
    );
}