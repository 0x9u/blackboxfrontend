import React, { FC } from "react";
import {MdSettings} from "react-icons/md"

interface pageProps {
  children: React.ReactNode; //buttons
}

const Page: FC<pageProps> = ({ children }) => {
  return (
    <div className="flex grow min-h-screen flex-col bg-shade-3">
      {children}
    </div>
  );
};

export default Page;
