import React, { FC } from "react";

interface settingsSideBarProps {
  children: React.ReactNode; //buttons
}

const SettingsSideBar: FC<settingsSideBarProps> = ({ children }) => {
  return (
    <div className="min-h-screen min-w-[250px] w-[calc(50%-250px)] bg-shade-3">
        <div className="float-right flex flex-col mx-12 py-5 space-y-2">
            {children}
        </div>
    </div>
  );
};

export default SettingsSideBar;
