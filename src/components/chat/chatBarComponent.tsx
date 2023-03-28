//create empty component using FC
import React, { FC } from "react";
import {MdPeople, MdSettings} from "react-icons/md"
import { useDispatch } from "react-redux";
import { setShowGuildDMSettings } from "../../app/slices/clientSlice";

interface chatBarProps {
    stateFunc : () => void;
}

const ChatBar: FC<chatBarProps> = ({stateFunc}) => {
  const dispatch = useDispatch();

    return (
        <div className="flex h-16 flex-row border-b border-black bg-shade-4 px-4 shadow-xl">
        <p className="m-auto w-0 grow truncate text-2xl font-bold text-white/90 hover:text-white cursor-pointer ">
          First server!
        </p>
        <div className="flex grow flex-row-reverse space-x-4 space-x-reverse">
          <MdPeople
            className="my-auto h-10 w-10 shrink-0 text-white/90 hover:text-white cursor-pointer "
            onClick={stateFunc}
          />
          <MdSettings className="my-auto h-10 w-10 shrink-0 text-white/90 hover:text-white cursor-pointer " onClick={() => dispatch(setShowGuildDMSettings(true))}/>
        </div>
      </div>
    )
}

export default ChatBar;