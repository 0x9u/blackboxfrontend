import React, { FC } from "react";
import Navbar from "../../components/navbarComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Chat from "./chat";
import Games from "./games";
import Friends from "./friends";

const Main: FC = () => {
  const currentMode = useSelector(
    (state: RootState) => state.client.currentMode
  );
  return (
    <div className="relative flex min-h-screen flex-row overflow-hidden">
      <Navbar />
      {
        currentMode == "chat" ?
          <Chat />
          : currentMode == "games" ?
            <Games />
            : currentMode == "friends" ?
              <Friends />
              : <div>unknown mode selected</div>
      }
    </div>
  );
};

export default Main;
