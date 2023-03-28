import React, { FC } from "react";
import { MdDelete } from "react-icons/md";

const InvitesGuildSettings: FC = () => {
  return (
    <div>
      <h1 className="mb-5 text-2xl text-white">Invites</h1>
      <div className="flex h-96 flex-col border-b-2 border-t-2 border-gray p-2 text-white">
        <div className="col mb-2 flex flex-row justify-between text-lg font-medium">
          <p>Invite Code</p>
          <p className="mr-8">Created By</p>
        </div>
        <div className="h-full w-full space-y-2 overflow-auto">
          { [...Array(1)].map(() => (
            <div className="text-md flex flex-row justify-between">
              <p className="text-white/75">ASJDSL</p>
              <div className="flex flex-row space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-black"></div>
                <p className="m-auto">Bob</p>
                <MdDelete className="h-8 w-8 cursor-pointer" />
              </div>
            </div>))
          }
        </div>
      </div>
    </div>
  );
};

export default InvitesGuildSettings;
