import React, { FC } from "react";

interface ButtonProps {
  onClick?: () => void;
  type: "button" | "submit";
  value?: string;
  disabled?: boolean;
  width?: string;
  height?: string;
  className?: string;
  gray?: boolean;
  red?: boolean;
}

const Button: FC<ButtonProps> = ({
  value,
  type,
  onClick,
  disabled,
  width,
  height,
  className,
  gray,
  red,
}) => {
  return (
    <input
      className={
        `w-22 relative h-10 rounded ${
          gray ? "bg-gray" : red ? "bg-red" : "bg-shade-5"
        } px-4 ${
          gray || red ? "font-medium" : "font-bold"
        } cursor-pointer text-white hover:brightness-90 active:brightness-75 disabled:opacity-50 ` +
        className
      }
      type={type}
      value={value}
      onClick={onClick}
      width={width}
      height={height}
      disabled={disabled}
    />
  );
};

export default Button;
