import React, { FC, useState } from "react";

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

const Chat: FC = () => {
  const [showUserList, setShowUserList] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const showGuildDMSettings = useSelector((state: RootState) => state.client.showGuildDMSettings);
  return (
    <div className="flex min-h-full grow flex-row">
      <NavbarChild>
        <ChatMode />
        <ChatList
          stateFunc={() => {
            setShowModal(true);
            console.log("hi");
          }}
        />
      </NavbarChild>
      <Page>
        <ChatBar stateFunc={() => setShowUserList(!showUserList)} />
        <div className="flex h-0 grow flex-row">
          <ChatHistory />
          {showUserList && <UserList />}
        </div>
      </Page>
      {showModal && <ChatModal exitFunc={() => setShowModal(false)}/>}
      {showGuildDMSettings && <GuildSettings/>}
    </div>
  );
};

export default Chat;
