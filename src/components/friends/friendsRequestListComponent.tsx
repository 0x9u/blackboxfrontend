import React, { FC } from "react";
import { MdCheck, MdClose } from "react-icons/md";

const FriendsRequestList: FC = () => {
  return (
    <div className="flex h-0 grow flex-col space-y-4 overflow-auto p-8">
      {[...Array(50)].map(() => (
        <div className="flex flex-row justify-between border-b border-gray pb-4">
          <div className="flex flex-row space-x-4">
            <div className="m-auto h-14 w-14 rounded-full border border-black"></div>
            <p className="m-auto text-xl font-semibold text-white">Bov</p>
          </div>
          <div className="flex flex-row space-x-4">
            <div className="bg-shade-2 rounded-full m-auto p-1 hover:brightness-75 cursor-pointer active:brightness-50">
              <MdCheck className="h-8 w-8 rounded-full  text-white/75" />
            </div>
            <div className="bg-shade-2 rounded-full m-auto p-1 hover:brightness-75 cursor-pointer active:brightness-50">
              <MdClose className="h-8 w-8 rounded-full text-white/75" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsRequestList;
