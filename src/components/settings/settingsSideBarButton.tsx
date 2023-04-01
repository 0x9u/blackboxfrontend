import React, { FC } from "react";

interface settingsSideBarButtonProps {
  label: string;
  onClick?: () => void;
  activated?: boolean;
  icon?: React.ReactNode;
}

const SettingsSideBarButton: FC<settingsSideBarButtonProps> = ({
  label,
  onClick,
  activated,
  icon,
}) => {
  return (
    <div className={`flex flex-row ${
      activated ? "cursor-default bg-white/50" : "bg-none"
    } cursor-pointer rounded-md px-2 py-0.5 w-full hover:bg-white/25`} onClick={onClick}>
      <p
        className="text-lg my-auto font-medium text-white"
      >
        {label}
      </p>
      {icon}
    </div>
  );
};

export default SettingsSideBarButton;
