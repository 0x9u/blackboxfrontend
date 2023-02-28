import React, { FC } from "react";

interface navbarChildProps {
  children: React.ReactNode; //buttons
}

const navbarChild: FC<navbarChildProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-56 flex-col bg-shade-2">
      <div className="flex grow flex-col px-4 py-2">{children}</div>
      <div className="flex h-16 flex-row bg-[#FF0000]"></div>
    </div>
  );
};

export default navbarChild;
