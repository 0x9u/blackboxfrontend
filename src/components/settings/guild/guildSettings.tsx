import React, { FC } from "react";
import { setShowGuildDMSettings } from "../../../app/slices/clientSlice";
import SettingsPage from "../settingsPage";
import SettingsPanel from "../settingsPanel";
import SettingsSideBar from "../settingsSideBar";
import { useDispatch } from "react-redux";
import SettingsSideBarButton from "../settingsSideBarButton";
import SettingsSideBarGroup from "../settingsSideBarGroup";
import OverviewGuildSettings from "./overviewGuildSettings";
import InvitesGuildSettings from "./invitesGuildSettings";
import BansGuildSettings from "./banGuildSettings";
import MembersGuildSettings from "./membersGuildSettings";
import { MdDelete } from "react-icons/md";

const GuildSettings: FC = () => {
  const dispatch = useDispatch();
  const [settingsMode, setSettingsMode] = React.useState<
    "overview" | "invites" | "members" | "bans"
  >("overview");
  return (
    <SettingsPage>
      <SettingsSideBar>
        <SettingsSideBarGroup label="First Server">
          <SettingsSideBarButton
            label="Overview"
            activated={settingsMode === "overview"}
            onClick={() => setSettingsMode("overview")}
          />
          <SettingsSideBarButton
            label="Invites"
            activated={settingsMode === "invites"}
            onClick={() => setSettingsMode("invites")}
          />
          <SettingsSideBarButton
            label="Members"
            activated={settingsMode === "members"}
            onClick={() => setSettingsMode("members")}
          />
          <SettingsSideBarButton
            label="Bans"
            activated={settingsMode === "bans"}
            onClick={() => setSettingsMode("bans")}
          />
        </SettingsSideBarGroup>
        <SettingsSideBarGroup bottom>
          <SettingsSideBarButton
            label="Delete Server"
            onClick={() => console.log("delete guild clicked")}
            icon={<MdDelete className="ml-auto w-8 h-8 text-white" />}
          />
        </SettingsSideBarGroup>
      </SettingsSideBar>
      <SettingsPanel closeFunc={() => dispatch(setShowGuildDMSettings(false))}>
        {settingsMode === "overview" ? (
          <OverviewGuildSettings />
        ) : settingsMode === "invites" ? (
          <InvitesGuildSettings />
        ) : settingsMode === "members" ? (
          <MembersGuildSettings />
        ) : settingsMode === "bans" ? (
          <BansGuildSettings />
        ) : null}
      </SettingsPanel>
    </SettingsPage>
  );
};

export default GuildSettings;
