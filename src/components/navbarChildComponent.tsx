import React, { FC } from "react";
import { MdSettings } from "react-icons/md"

interface navbarChildProps {
  children: React.ReactNode; //buttons
}

const navbarChild: FC<navbarChildProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-64 flex-col bg-shade-3">
      {/* got it working after 1 hour of debugging css*/}
      <div className="flex flex-col grow h-0 space-y-1">{children}</div>
      <div className="flex h-16 flex-row border-shade-4 border-t py-2 px-4 bg-shade-2">
        <div className="h-10 w-10 my-auto shrink-0 border-black border rounded-full">
        </div>
        <p className="text-lg text-white truncate font-bold m-auto ml-4 leading-relaxed">
          Username
          </p>
        <MdSettings className="m-auto shrink-0 text-white/90 hover:text-white cursor-pointer h-8 w-8 ml-10 leading-relaxed" />
      </div>
    </div>
  );
};

export default navbarChild;
