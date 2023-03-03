import React, { FC } from "react";
import { MdChat, MdGames, MdPeople } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMode } from "../app/slices/clientSlice";
import { RootState } from "../app/store";

const NavBar : FC = () => {
  const dispatch = useDispatch();
  const currentMode = useSelector(
    (state: RootState) => state.client.currentMode
  );
  return (
    <div className="flex min-h-screen w-20 flex-col bg-shade-1">
      <div
        className={`m-2 rounded-xl p-2  ${
          currentMode == "chat" ? "bg-white/50" : "hover:bg-white/25"
        }`}
        onClick={() => dispatch(setCurrentMode("chat"))}
      >
        <MdChat className="text-5xl text-white" />
      </div>
      <div
        className={`m-2 rounded-xl p-2  ${
          currentMode == "friends" ? "bg-white/50" : "hover:bg-white/25"
        }`}
        onClick={() => dispatch(setCurrentMode("friends"))}
      >
        <MdPeople className="text-5xl text-white" />
      </div>
      <div
        className={`m-2 rounded-xl p-2  ${
          currentMode == "games" ? "bg-white/50" : "hover:bg-white/25"
        }`}
        onClick={() => dispatch(setCurrentMode("games"))}
      >
        <MdGames className="text-5xl text-white" />
      </div>
    </div>
  );
}

export default NavBar;
