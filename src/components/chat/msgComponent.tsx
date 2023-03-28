import React, { FC } from "react";

import { MdDelete, MdEdit, MdRepeat } from "react-icons/md";

interface msgProps {
  content: string;
  failed?: boolean;
  username: string;
  created: number;
  modified?: number;
}

const Msg: FC<msgProps> = ({
  content,
  failed,
  username,
  created,
  modified,
}) => {
  return (
    <div className="group relative flex flex-row space-x-4 px-4 py-1 hover:bg-black/25">
      <div className="h-12 w-12 shrink-0 rounded-full border border-black">
        {/* for pfp */}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center space-x-2">
          <p className="text-lg font-semibold leading-relaxed text-white">
            {username}
          </p>
          <p className="text-xs font-medium leading-relaxed text-white brightness-75">
            Created on {created} {modified && `and Edited at ${modified}`}
          </p>
          <div className="hidden flex-row space-x-2 group-hover:flex">
            <MdRepeat className="h-6 w-6 cursor-pointer text-white" />
            <MdEdit className="h-6 w-6 cursor-pointer text-white" />
            <MdDelete className="h-6 w-6 cursor-pointer text-red" />
          </div>
        </div>
        <div className="mx-1">
          <p className="font-normal text-white">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Msg;
