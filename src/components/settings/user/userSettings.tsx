import React, { FC } from "react";
import { MdExitToApp } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setShowUserSettings } from "../../../app/slices/clientSlice";

import SettingsPage from "../settingsPage";
import SettingsPanel from "../settingsPanel";
import SettingsSideBar from "../settingsSideBar";
import SettingsSideBarButton from "../settingsSideBarButton";
import SettingsSideBarGroup from "../settingsSideBarGroup";
import AccessibilityUserSettings from "./accessabilityUserSettings";
import AccountUserSettings from "./accountUserSettings";
import FriendUserSettings from "./friendUserSettings";
import PanicUserSettings from "./panicUserSettings";
import PrivacyUserSettings from "./privacyUserSettings";
import TextUserSettings from "./textUserSettings";

const UserSettings: FC = () => {
  const dispatch = useDispatch();
  const [settingsMode, setSettingsMode] = React.useState<
    "account" | "friends" | "privacy" | "panic" | "text" | "accessability"
  >("account");
  return (
    <SettingsPage>
      <SettingsSideBar>
        <SettingsSideBarGroup label="User settings">
          <SettingsSideBarButton
            label="My Account"
            activated={settingsMode === "account"}
            onClick={() => setSettingsMode("account")}
          />
          <SettingsSideBarButton
            label="Friend Requests"
            activated={settingsMode === "friends"}
            onClick={() => setSettingsMode("friends")}
          />
          <SettingsSideBarButton
            label="Privacy & Safety"
            activated={settingsMode === "privacy"}
            onClick={() => setSettingsMode("privacy")}
          />
        </SettingsSideBarGroup>
        <SettingsSideBarGroup label="App settings">
          <SettingsSideBarButton
            label="Panic Mode"
            activated={settingsMode === "panic"}
            onClick={() => setSettingsMode("panic")}
          />
          <SettingsSideBarButton
            label="Text & Images"
            activated={settingsMode === "text"}
            onClick={() => setSettingsMode("text")}
          />
          <SettingsSideBarButton
            label="Accessability"
            activated={settingsMode === "accessability"}
            onClick={() => setSettingsMode("accessability")}
          />
        </SettingsSideBarGroup>
        <SettingsSideBarGroup bottom>
          <SettingsSideBarButton
            label="Log out"
            icon={<MdExitToApp className="text-white h-8 w-8 ml-auto" />}
          />
        </SettingsSideBarGroup>
      </SettingsSideBar>
      <SettingsPanel closeFunc={() => dispatch(setShowUserSettings(false))}>
        {settingsMode === "account" ? (
          <AccountUserSettings />
        ) : settingsMode === "friends" ? (
          <FriendUserSettings />
        ) : settingsMode === "privacy" ? (
          <PrivacyUserSettings />
        ) : settingsMode === "panic" ? (
          <PanicUserSettings />
        ) : settingsMode === "text" ? (
          <TextUserSettings />
        ) : settingsMode === "accessability" ? (
          <AccessibilityUserSettings />
        ) : null}
      </SettingsPanel>
    </SettingsPage>
  );
};

export default UserSettings;
