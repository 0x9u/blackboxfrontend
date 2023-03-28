import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { setShowUserSettings } from "../../../app/slices/clientSlice";

import SettingsPage from "../settingsPage";
import SettingsPanel from "../settingsPanel";
import SettingsSideBar from "../settingsSideBar";
import SettingsSideBarButton from "../settingsSideBarButton";
import SettingsSideBarGroup from "../settingsSideBarGroup";
import AccountUserSettings from "./accountUserSettings";

const UserSettings: FC = () => {
  const dispatch = useDispatch();
  const [settingsMode, setSettingsMode] = React.useState<
    "account" | "friends" | "privacy" | "text" | "accessability"
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
      </SettingsSideBar>
      <SettingsPanel closeFunc={() => dispatch(setShowUserSettings(false))}>
        <AccountUserSettings/>
      </SettingsPanel>
    </SettingsPage>
  );
};

export default UserSettings;
