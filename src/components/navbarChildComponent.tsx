import React, { FC } from "react";
import {MdSettings} from "react-icons/md"

interface navbarChildProps {
  children: React.ReactNode; //buttons
}

const navbarChild: FC<navbarChildProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-64 flex-col bg-shade-2">
      {/* got it working after 1 hour of debugging css*/}
      <div className="flex flex-col grow h-0 p-2 space-y-1 overflow-y-auto hide-scrollbar">{children}</div>
      <div className="flex h-16 flex-row border-black border-t-2">
        <div className="flex py-2 px-4">
          <div className="h-12 w-12 border-black border rounded-full">
          </div>
          <p className="text-lg text-white font-bold m-auto ml-4">
            Username
          </p>
          <MdSettings className="m-auto text-white h-8 w-8 ml-10"/>
        </div>
      </div>
    </div>
  );
};

export default navbarChild;
