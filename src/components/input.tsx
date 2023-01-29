import React, { FC, Ref } from "react";
import { ChangeHandler } from "react-hook-form";

type InputProps = {
  value?: string;
  type?: "text" | "password";
  onChange?: ChangeHandler;
  onBlur?: ChangeHandler;
  name?: string;
  ref?: Ref<any>;
};

const Input: FC<InputProps> = ({
  value,
  type,
  onChange,
  onBlur,
  name,
  ref,
}) => {
  return (
    <input
      className="relative h-10 w-56 rounded  bg-shade-1 px-2 font-medium text-white outline-offset-2 outline-shade-5"
      type={type}
      value={value}
      onBlur={onBlur}
      name={name}
      ref={ref}
      onChange={onChange}
    />
  );
};

export default Input;
