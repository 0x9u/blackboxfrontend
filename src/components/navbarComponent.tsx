import React, { FC } from "react";
import { MdChat, MdVideogameAsset, MdPeople, MdAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMode } from "../app/slices/clientSlice";
import { RootState } from "../app/store";

const NavBar: FC = () => {
  const dispatch = useDispatch();
  const currentMode = useSelector(
    (state: RootState) => state.client.currentMode
  );
  return (
    <div className="flex min-h-screen w-20 px-1 flex-col bg-shade-1">
      <div
        className={`m-2 rounded-xl p-2  ${currentMode == "chat" ? "bg-white/50 cursor-default " : "hover:bg-white/25 hover:translate-x-1 duration-75 cursor-pointer"
          }`}
        onClick={() => dispatch(setCurrentMode("chat"))}
      >
        <MdChat className="w-10 h-10 text-white" />
      </div>
      <div
        className={`m-2 rounded-xl p-2  ${currentMode == "friends" ? "bg-white/50 cursor-default" : "hover:bg-white/25 hover:translate-x-1 duration-75 cursor-pointer"
          }`}
        onClick={() => dispatch(setCurrentMode("friends"))}
      >
        <MdPeople className="w-10 h-10 text-white" />
      </div>
      <div
        className={`m-2 rounded-xl p-2  ${currentMode == "games" ? "bg-white/50 cursor-default" : "hover:bg-white/25 hover:translate-x-1 duration-75 cursor-pointer"
          }`}
        onClick={() => dispatch(setCurrentMode("games"))}
      >
        <MdVideogameAsset className="w-10 h-10 text-white" />
      </div>
      <div className={`m-2 rounded-xl p-2  ${currentMode == "admin" ? "bg-white/50 cursor-default" : "hover:bg-white/25 hover:translate-x-1 duration-75 Fcursor-pointer"
        }`} onClick={() => dispatch(setCurrentMode("admin"))}>
        <MdAdminPanelSettings className="w-10 h-10 text-white"/>
      </div>
    </div >
  );
}

export default NavBar;
