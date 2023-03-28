import React, { FC } from "react";

interface settingsSideBarGroupProps {
  label: string;
  children: React.ReactNode;
}

const SettingsSideBarGroup: FC<settingsSideBarGroupProps> = ({
  label,
  children,
}) => {
  return (
    <div className="border-b border-gray w-44 pb-1">
      <p className="text-sm font-bold text-white uppercase mx-2 mb-0.5">{label}</p>
      <div className="py-1 space-y-1">{children}</div>
    </div>
  );
};

export default SettingsSideBarGroup;
