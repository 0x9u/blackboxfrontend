import React, { FC, useEffect } from "react";
import Navbar from "../../components/navbarComponent";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import Chat from "./chat";
import Games from "./games";
import Friends from "./friends";
import Admin from "./admin";
import UserSettings from "../../components/settings/user/userSettings";
import { redirect, useNavigate } from "react-router-dom";
import { wsConnect, wsDisconnect } from "../../api/websocket";

const Main: FC = () => {
  const currentMode = useSelector(
    (state: RootState) => state.client.currentMode
  );
  const showUserSettings = useSelector(
    (state: RootState) => state.client.showUserSettings
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    console.log("we runnin")
    dispatch(wsConnect());
    return () => {
      console.log("we stoppin");
      dispatch(wsDisconnect());
    };
  }, []);

  return (
    <div className="relative flex min-h-screen flex-row overflow-hidden">
      <Navbar />
      {currentMode == "chat" ? (
        <Chat />
      ) : currentMode == "games" ? (
        <Games />
      ) : currentMode == "friends" ? (
        <Friends />
      ) : currentMode == "admin" ? (
        <Admin />
      ) : (
        <div>unknown mode selected</div>
      )}
      {showUserSettings && <UserSettings />}
    </div>
  );
};

export default Main;
