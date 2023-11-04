import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentChatMode,
  setShowChatUserList,
} from "../../app/slices/clientSlice";
import { RootState } from "../../app/store";

const ChatMode: FC = () => {
  const currentChatMode = useSelector(
    (state: RootState) => state.client.currentChatMode
  );
  const [guildPings, dmPings] = useSelector((state: RootState) => {
    if (currentChatMode === "dm") {
      var guildPings = 0;
      for (const guildId of state.guild.guildIds) {
        guildPings += state.guild.guilds[guildId].unread.mentions;
      }
      return [guildPings, 0];
    } else if (currentChatMode === "guild") {
      var dmPings = 0;
      for (const dmId of state.guild.dmIds) {
        console.log(dmId, state.guild.guilds[dmId]);
        dmPings += state.guild.dms[dmId].unread.mentions;
      }
      return [0, dmPings];
    }
    return [0, 0];
  });
  const dispatch = useDispatch();
  return (
    <div className="min-w-8 m-auto flex h-16 w-full shrink-0 flex-row space-x-4 border-b border-black bg-shade-2 px-8 text-lg font-medium text-white shadow-md">
      {/*TODO: make cool transition for switch*/}
      <div
        className={`relative my-auto select-none px-2 leading-relaxed ${
          currentChatMode === "guild"
            ? "cursor-default border-b border-white"
            : "cursor-pointer rounded hover:hover:bg-white/25 "
        }`}
        onClick={() => {
          dispatch(setCurrentChatMode("guild"));
          dispatch(setShowChatUserList(false));
        }}
      >
        Rooms
        {currentChatMode === "dm" && guildPings > 0 && (
          <div className="absolute -bottom-2 -right-2 h-4 w-4 rounded-xl bg-red text-center text-xs leading-relaxed text-white">
            {guildPings}
          </div>
        )}
      </div>
      <div
        className={`relative my-auto select-none px-2 leading-relaxed ${
          currentChatMode === "dm"
            ? "cursor-default border-b border-white"
            : "cursor-pointer rounded hover:hover:bg-white/25 "
        }`}
        onClick={() => {
          dispatch(setCurrentChatMode("dm"));
          dispatch(setShowChatUserList(false));
        }}
      >
        Messages
        {currentChatMode === "guild" && dmPings > 0 && (
          <div className="absolute -bottom-2 -right-2 h-4 w-4 rounded-xl bg-red text-center text-xs leading-relaxed text-white">
            {dmPings}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMode;
