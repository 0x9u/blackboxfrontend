import React, { FC } from "react";

interface settingsSideBarButtonProps {
  label: string;
  onClick?: () => void;
  activated: boolean;
}

const SettingsSideBarButton: FC<settingsSideBarButtonProps> = ({
  label,
  onClick,
  activated,
}) => {
  return (
    <div className="" onClick={onClick}>
      <p
        className={`text-lg  font-medium text-white ${
          activated ? "cursor-default bg-white/50" : "bg-none"
        } cursor-pointer rounded-md px-2 py-0.5 hover:bg-white/25`}
      >
        {label}
      </p>
    </div>
  );
};

export default SettingsSideBarButton;
