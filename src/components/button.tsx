import React, { FC } from "react";

interface ButtonProps {
  onClick?: () => void;
  type: "button" | "submit";
  value?: string;
  disabled?: boolean;
  width?: string;
  height?: string;
};

const Input: FC<ButtonProps> = ({
  value,
  type,
  onClick,
  disabled,
  width,
  height,
}) => {
  return (
    <input
      className="w-22 relative h-10 rounded bg-shade-5 px-4 font-bold text-white hover:brightness-90 active:brightness-75 disabled:opacity-50"
      type={type}
      value={value}
      onClick={onClick}
      width={width}
      height={height}
      disabled={disabled}
    />
  );
};

export default Input;
