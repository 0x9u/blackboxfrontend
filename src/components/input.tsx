import React, { FC, Ref } from "react";
import { ChangeHandler, FieldError } from "react-hook-form";

interface InputProps {
  value?: string;
  type?: "text" | "password";
  register?: {
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    ref: Ref<HTMLInputElement>;
    name: string;
  };
  onChange?: ChangeHandler;
  onBlur?: ChangeHandler;
  name?: string;
  label?: string;
  error?:  FieldError | undefined;
};

const Input: FC<InputProps> = ({
  value,
  type,
  onChange,
  onBlur,
  name,
  label,
  error,
  register,
}) => {
  return (
    <div className="flex flex-col w-64">
      <p className=" my-2 text-xs font-bold break-words uppercase text-white">
        {label}{" "}
        <span className="italic text-xs font-medium text-[#ff3333]">
          {error?.message && "-"} {error?.message}
        </span>
      </p>
      <input
        className="h-10 w-64 rounded  bg-shade-1 px-2 font-medium text-white outline-offset-2 outline-shade-5"
        type={type}
        value={value}
        onBlur={onBlur}
        name={name}
        onChange={onChange}
        {...register}
      />
    </div>
  );
};

export default Input;
