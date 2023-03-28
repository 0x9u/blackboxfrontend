import React, { FC } from "react";
import Button from "../../buttonComponent";

const MembersGuildSettings: FC = () => {
  return (
    <div>
      <h1 className="mb-5 text-2xl text-white">Members</h1>
      <div className="flex h-96 flex-col border-b-2 border-t-2 border-gray p-2 text-white">
        <div className="col mb-2 flex flex-row justify-between text-lg font-medium">
          <p>Name</p>
          <p className="mr-6">Actions</p>
        </div>
        <div className="h-full w-full space-y-2 overflow-auto">
          {[...Array(1)].map(() => (
            <div className="text-md flex flex-row justify-between">
              <div className="flex flex-row space-x-2">
                <div className="h-10 w-10 rounded-full border-2 border-black"></div>
                <p className="m-auto text-lg text-white/75">Bob</p>
              </div>
              <div className="flex flex-row space-x-2">
                <Button
                  value="Make Admin"
                  type="button"
                  className="m-auto h-8 w-28 px-0"
                />
                <Button
                  value="Make Owner"
                  type="button"
                  className="m-auto h-8 w-28 px-0"
                />
                <Button
                  value="Kick"
                  type="button"
                  gray
                  className="m-auto h-8 w-12 px-0"
                />
                <Button
                  value="Ban"
                  type="button"
                  className="m-auto h-8 w-12 px-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersGuildSettings;
