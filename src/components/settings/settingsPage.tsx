import React, { FC } from "react";

interface settingsPageProps {
  children: React.ReactNode; //buttons
}

const SettingsPage: FC<settingsPageProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 h-screen w-screen flex flex-row bg-shade-4">
      {children}
    </div>
  );
};

export default SettingsPage;
