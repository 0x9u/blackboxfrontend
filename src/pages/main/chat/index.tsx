import React, { FC, useState } from "react";

import NavbarChild from "../../../components/navbarChildComponent";
import Page from "../../../components/pageComponent";
import ChatHistory from "../../../components/chat/chatHistoryComponent";
import UserList from "../../../components/chat/userListComponent";
import ChatBar from "../../../components/chat/chatBarComponent";
import ChatMode from "../../../components/chat/chatModeComponent";
import ChatList from "../../../components/chat/chatListComponent";

const Chat: FC = () => {
  const [showUserList, setShowUserList] = useState<boolean>(false);

  return (
    <div className="flex min-h-full grow flex-row">
      <NavbarChild>
        <ChatMode />
        <ChatList />
      </NavbarChild>
      <Page>
        <ChatBar stateFunc={() => setShowUserList(!showUserList)} />
        <div className="flex h-0 grow flex-row">
          <ChatHistory />
          {showUserList && <UserList />}
        </div>
      </Page>
    </div>
  );
};

export default Chat;
