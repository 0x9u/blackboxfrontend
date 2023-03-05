//create empty component
import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentChatMode } from "../../app/slices/clientSlice";
import { RootState } from "../../app/store";

const ChatMode: FC = () => {
  const currentChatMode = useSelector(
    (state: RootState) => state.client.currentChatMode
  );
  const dispatch = useDispatch();
  return (
    <div className="min-w-8 m-auto flex h-16 w-full shrink-0 flex-row space-x-4 border-b border-black bg-shade-2 px-8 text-lg font-medium text-white shadow-md">
      {/*TODO: make cool transition for switch*/}
      <div
        className={`my-auto select-none px-2 leading-relaxed ${
          currentChatMode === "guild"
            ? "cursor-default border-b border-white"
            : "cursor-pointer rounded hover:hover:bg-white/25 "
        }`}
        onClick={() => dispatch(setCurrentChatMode("guild"))}
      >
        Rooms
      </div>
      <div
        className={`my-auto select-none px-2 leading-relaxed ${
          currentChatMode === "dm"
            ? "cursor-default border-b border-white"
            : "cursor-pointer rounded hover:hover:bg-white/25 "
        }`}
        onClick={() => dispatch(setCurrentChatMode("dm"))}
      >
        Messages
      </div>
    </div>
  );
};

export default ChatMode;
