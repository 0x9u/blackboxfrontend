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
  className? : string;
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
  className,
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
        className={"h-10 w-64 rounded  bg-shade-2 px-2 font-medium text-white outline-none focus:outline-shade-5 "+className}
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
