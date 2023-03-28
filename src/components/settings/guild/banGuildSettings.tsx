import React, { FC } from "react";
import Button from "../../buttonComponent";

const BansGuildSettings: FC = () => {
  return (
    <div>
      <h1 className="mb-5 text-2xl text-white">Bans</h1>
      <div className="flex h-96 flex-col border-b-2 border-t-2 border-gray p-2 text-white">
        <div className="col mb-2 flex flex-row justify-between text-lg font-medium">
          <p>Name</p>
        </div>
        <div className="h-full w-full space-y-2 overflow-auto">
          {[...Array(1)].map(() => (
            <div className="text-md flex flex-row justify-between">
              <div className="flex flex-row space-x-2">
                <div className="h-10 w-10 rounded-full border-2 border-black"></div>
                <p className="m-auto text-lg text-white/75">Bob</p>
              </div>
              <div className="flex flex-row space-x-2">
                  <Button value="Unban" type="button" className="h-8 w-16 px-0 m-auto"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BansGuildSettings;