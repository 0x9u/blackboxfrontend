import React, { FC } from "react";

interface modalProps {
  children: React.ReactNode; //buttons
}

const Page: FC<modalProps> = ({ children }) => {
  return (
    <div className="absolute flex grow min-h-screen flex-col bg-shade-4">
      {children}
    </div>
  );
};

export default Page;
