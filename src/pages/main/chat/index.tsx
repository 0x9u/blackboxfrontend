import React, { FC, useState } from "react";

import NavbarChild from "../../../components/navbarChildComponent";
import Page from "../../../components/pageComponent";
import ChatHistory from "../../../components/chat/chatHistoryComponent";
import UserList from "../../../components/chat/userListComponent";
import ChatBar from "../../../components/chat/chatBarComponent";
import ChatMode from "../../../components/chat/chatModeComponent";
import ChatList from "../../../components/chat/chatListComponent";

import ChatModal from "../../../components/chat/chatModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import GuildSettings from "../../../components/settings/guild/guildSettings";

const Chat: FC = () => {
  const showAddChatModal = useSelector((state : RootState) => state.client.showAddChatModal);
  const showGuildDMSettings = useSelector((state: RootState) => state.client.showGuildDMSettings);
  const showChatUserList = useSelector((state : RootState) => state.client.showChatUserList);
  return (
    <div className="flex min-h-full grow flex-row">
      <NavbarChild>
        <ChatMode />
        <ChatList/>
      </NavbarChild>
      <Page>
        <ChatBar/>
        <div className="flex h-0 grow flex-row">
          <ChatHistory />
          {showChatUserList && <UserList />}
        </div>
      </Page>
      {showAddChatModal && <ChatModal/>}
      {showGuildDMSettings && <GuildSettings/>}
    </div>
  );
};

export default Chat;
