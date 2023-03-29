//create empty component using FC
import React, { FC } from "react";
import {MdPeople, MdSettings} from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import { setShowChatUserList, setShowGuildDMSettings } from "../../app/slices/clientSlice";
import { RootState } from "../../app/store";

const ChatBar: FC = () => {
  const dispatch = useDispatch();

  const showChatUserList = useSelector((state : RootState) => state.client.showChatUserList);

    return (
        <div className="flex h-16 flex-row border-b border-black bg-shade-4 px-4 shadow-xl">
        <p className="m-auto w-0 grow truncate text-2xl font-bold text-white/90">
          First server!
        </p>
        <div className="flex grow flex-row-reverse space-x-4 space-x-reverse">
          <MdPeople
            className="my-auto h-10 w-10 shrink-0 text-white/90 hover:text-white/75 cursor-pointer active:text-white/50"
            onClick={() => dispatch(setShowChatUserList(!showChatUserList))}
          />
          <MdSettings className="my-auto h-10 w-10 shrink-0 text-white/90 hover:text-white/75 active:text-white/50 cursor-pointer " onClick={() => dispatch(setShowGuildDMSettings(true))}/>
        </div>
      </div>
    )
}

export default ChatBar;