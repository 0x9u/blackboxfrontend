import React, { FC } from "react";
import {
  MdChat,
  MdVideogameAsset,
  MdPeople,
  MdAdminPanelSettings,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMode } from "../app/slices/clientSlice";
import { RootState } from "../app/store";

const NavBar: FC = () => {
  const dispatch = useDispatch();
  const currentMode = useSelector(
    (state: RootState) => state.client.currentMode
  );

  const hasPermissions = useSelector((state: RootState) => {
    const perms = state.client.permissions;
    if (Object.keys(perms).length === 0) return false;
    return (
      perms.admin ||
      perms.banIP ||
      perms.guild.delete ||
      perms.guild.edit ||
      perms.guild.get ||
      perms.user.get ||
      perms.user.edit ||
      perms.user.delete
    );
  });
  return (
    <div className="flex min-h-screen w-20 flex-col bg-shade-1 px-1">
      <div
        className={`m-2 rounded-xl p-2  ${
          currentMode == "chat"
            ? "cursor-default bg-white/50 "
            : "cursor-pointer duration-75 hover:translate-x-1 hover:bg-white/25"
        }`}
        onClick={() => dispatch(setCurrentMode("chat"))}
      >
        <MdChat className="h-10 w-10 text-white" />
      </div>
      <div
        className={`m-2 rounded-xl p-2  ${
          currentMode == "friends"
            ? "cursor-default bg-white/50"
            : "cursor-pointer duration-75 hover:translate-x-1 hover:bg-white/25"
        }`}
        onClick={() => dispatch(setCurrentMode("friends"))}
      >
        <MdPeople className="h-10 w-10 text-white" />
      </div>
      <div
        className={`m-2 rounded-xl p-2  ${
          currentMode == "games"
            ? "cursor-default bg-white/50"
            : "cursor-pointer duration-75 hover:translate-x-1 hover:bg-white/25"
        }`}
        onClick={() => dispatch(setCurrentMode("games"))}
      >
        <MdVideogameAsset className="h-10 w-10 text-white" />
      </div>
      {hasPermissions && ( 
        <div
          className={`m-2 rounded-xl p-2  ${
            currentMode == "admin"
              ? "cursor-default bg-white/50"
              : "Fcursor-pointer duration-75 hover:translate-x-1 hover:bg-white/25"
          }`}
          onClick={() => dispatch(setCurrentMode("admin"))}
        >
          <MdAdminPanelSettings className="h-10 w-10 text-white" />
        </div>
      )}
    </div>
  );
};

export default NavBar;
