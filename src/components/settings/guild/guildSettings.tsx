import React, { FC } from "react";
import { setShowGuildDMSettings } from "../../../app/slices/clientSlice";
import SettingsPage from "../settingsPage";
import SettingsPanel from "../settingsPanel";
import SettingsSideBar from "../settingsSideBar";
import { useDispatch, useSelector } from "react-redux";
import SettingsSideBarButton from "../settingsSideBarButton";
import SettingsSideBarGroup from "../settingsSideBarGroup";
import OverviewGuildSettings from "./overviewGuildSettings";
import InvitesGuildSettings from "./invitesGuildSettings";
import BansGuildSettings from "./banGuildSettings";
import MembersGuildSettings from "./membersGuildSettings";
import { MdDelete } from "react-icons/md";
import { RootState, useAppDispatch } from "../../../app/store";
import { deleteGuild } from "../../../api/guildApi";

const GuildSettings: FC = () => {
  const dispatch = useAppDispatch();
  const [settingsMode, setSettingsMode] = React.useState<
    "overview" | "invites" | "members" | "bans"
  >("overview");
  const currentGuild = useSelector(
    (state: RootState) => state.client.currentGuild
  );
  const selfUserId = useSelector((state: RootState) => state.user.selfUser);
  const currentOwner = useSelector(
    (state: RootState) => state.guild.guilds[currentGuild || ""]?.ownerId ?? ""
  );

  const guildName = useSelector(
    (state: RootState) =>
      state.guild.guilds[state.client.currentGuild || ""]?.name ?? ""
  );
  return (
    <SettingsPage>
      <SettingsSideBar>
        <SettingsSideBarGroup label={guildName}>
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
        {currentOwner === selfUserId && (
          <SettingsSideBarGroup bottom>
            <SettingsSideBarButton
              label="Delete Server"
              onClick={() => {
                dispatch(deleteGuild(currentGuild || ""));
                dispatch(setShowGuildDMSettings(false));
              }}
              icon={<MdDelete className="ml-auto h-8 w-8 text-white" />}
            />
          </SettingsSideBarGroup>
        )}
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
