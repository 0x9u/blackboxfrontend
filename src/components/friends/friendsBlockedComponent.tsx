import React, { FC } from "react";
import { MdPersonRemove } from "react-icons/md";
const FriendsBlocked: FC = () => {
  return (
    <div className="flex h-0 grow flex-col space-y-4 overflow-auto p-8">
      {[...Array(50)].map(() => (
        <div className="flex flex-row justify-between border-b border-gray pb-4">
          <div className="flex flex-row space-x-4">
            <div className="m-auto h-14 w-14 rounded-full border border-black"></div>
            <p className="m-auto text-xl font-semibold text-white">Bov</p>
          </div>
          <div>
            <MdPersonRemove className="m-auto h-12 w-12 text-white/75 cursor-pointer hover:text-white/50 active:text-white/25" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default FriendsBlocked;
