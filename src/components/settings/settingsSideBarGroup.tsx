import React, { FC } from "react";

interface settingsSideBarGroupProps {
  label?: string;
  children: React.ReactNode;
  bottom?: boolean;
}

const SettingsSideBarGroup: FC<settingsSideBarGroupProps> = ({
  label,
  children,
  bottom,
}) => {
  return (
    <div className={`border-b border-gray w-44 pb-1 ${bottom ? " mt-auto mb-8 border-t": ""}`}>
      <p className="text-sm font-bold text-white uppercase mx-2 mb-0.5">{label}</p>
      <div className="py-1 space-y-1">{children}</div>
    </div>
  );
};

export default SettingsSideBarGroup;
