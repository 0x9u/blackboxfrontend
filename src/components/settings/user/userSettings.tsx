import React, { FC } from "react";
import { MdExitToApp } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setShowUserSettings } from "../../../app/slices/clientSlice";
import Input from "../../inputComponent";
import Modal from "../../modal/modalComponent";

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

  const [showUsernameModal, setShowUsernameModal] =
    React.useState<boolean>(false);
  const [showEmailModal, setShowEmailModal] = React.useState<boolean>(false);
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
            icon={<MdExitToApp className="ml-auto h-8 w-8 text-white" />}
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
      {showUsernameModal && (
        <Modal
          title="Change Username"
          exitFunc={() => setShowUsernameModal(false)}
        >
          <div>
            <Input />
          </div>
        </Modal>
      )}
      {showEmailModal && (
        <Modal
          title="Change Email"
          exitFunc={() => setShowEmailModal(false)}
        >
          <div>
            <Input />
          </div>
        </Modal>
      )}
    </SettingsPage>
  );
};

export default UserSettings;
