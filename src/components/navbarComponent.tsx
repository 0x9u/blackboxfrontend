import React, { FC, Ref } from "react";
import {MdChat, MdGames, MdPeople} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMode } from "../app/slices/clientSlice";
import { RootState } from "../app/store";

function NavBar() {
  const dispatch = useDispatch();
  const currentMode = useSelector((state : RootState) => state.client.currentMode);
  return (
    <div className="relative flex min-h-screen w-20 flex-col bg-shade-1">
      <a className={`m-2 p-2 rounded-xl  ${currentMode == "chat" ? "bg-white/50" : "hover:bg-white/25" }`} href="#" onClick={() => dispatch(setCurrentMode("chat"))}>
        <MdChat className="text-5xl text-white" />
      </a>
      <a className={`m-2 p-2 rounded-xl  ${currentMode == "friends" ? "bg-white/50" : "hover:bg-white/25" }`}   href="#" onClick={() => dispatch(setCurrentMode("friends"))}>
        <MdPeople className="text-5xl text-white" />
      </a>
      <a className={`m-2 p-2 rounded-xl  ${currentMode == "games" ? "bg-white/50" : "hover:bg-white/25" }`}  href="#" onClick={() => dispatch(setCurrentMode("games"))}>
        <MdGames className="text-5xl text-white" />
      </a>
    </div>
  );
}

export default NavBar;
