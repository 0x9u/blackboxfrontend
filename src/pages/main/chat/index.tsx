import React, { FC, useState, Fragment } from "react";

import NavbarChild from "../../../components/navbarChildComponent";
import Page from "../../../components/pageComponent";
import ChatHistory from "../../../components/chat/chatHistoryComponent";
import UserList from "../../../components/chat/userListComponent";
import ChatBar from "../../../components/chat/chatBarComponent";
import ChatMode from "../../../components/chat/chatModeComponent";
import ChatList from "../../../components/chat/chatListComponent";

import ChatModal from "../../../components/chat/chatModalComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import GuildSettings from "../../../components/settings/guild/guildSettings";
import InviteModal from "../../../components/chat/inviteModalComponent";
import CooldownModal from "../../../components/chat/chatCooldownModalComponent";
import { loadGuildInfo } from "../../../api/hooks/guildHooks";
import UserBlockedModal from "../../../components/chat/chatUserBlockedModalComponent";

const Chat: FC = () => {
  const showAddChatModal = useSelector(
    (state: RootState) => state.client.showAddChatModal
  );
  const showCreateInviteModal = useSelector(
    (state: RootState) => state.client.showCreateInviteModal
  );
  const showGuildDMSettings = useSelector(
    (state: RootState) => state.client.showGuildDMSettings
  );
  const showChatUserList = useSelector(
    (state: RootState) => state.client.showChatUserList
  );
  const currentChatMode = useSelector(
    (state: RootState) => state.client.currentChatMode
  );
  const currentGuild = useSelector(
    (state: RootState) => state.client.currentGuild
  );
  const currentDM = useSelector((state: RootState) => state.client.currentDM);
  const showCooldownModal = useSelector(
    (state: RootState) => state.client.showCooldownModal
  );
  const showUserBlockedModal = useSelector(
    (state: RootState) => state.client.showUserBlockedModal
  );

  loadGuildInfo(); //load order for dm and guild

  return (
    <div className="flex min-h-full grow flex-row">
      <NavbarChild>
        <ChatMode />
        <ChatList />
      </NavbarChild>
      <Page>
        {(currentGuild === null && currentChatMode === "guild") ||
        (currentDM === null && currentChatMode === "dm") ? (
          <div className="flex h-0 grow flex-row">
            <div className="flex flex-grow flex-col items-center justify-center">
              <div className="text-3xl font-bold text-white">Not Selected!</div>
            </div>
          </div>
        ) : (
          <Fragment>
            <ChatBar />
            <div className="flex h-0 grow flex-row">
              <ChatHistory />
              {showChatUserList && <UserList />}
            </div>
          </Fragment>
        )}
      </Page>
      {showAddChatModal && <ChatModal />}
      {showCooldownModal && <CooldownModal />}
      {showUserBlockedModal && <UserBlockedModal />}
      {showCreateInviteModal && <InviteModal />}
      {showGuildDMSettings && <GuildSettings />}
    </div>
  );
};

export default Chat;
