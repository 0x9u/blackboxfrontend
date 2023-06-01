import React, { FC, Ref } from "react";
import { ChangeHandler, FieldError } from "react-hook-form";
import { MdContentCopy } from "react-icons/md";

import { UseFormRegisterReturn } from "react-hook-form/dist/types";

interface InputProps {
  value?: string;
  type?: "text" | "password";
  register?: UseFormRegisterReturn<any>;
  onChange?: ChangeHandler;
  onBlur?: ChangeHandler;
  name?: string;
  label?: string;
  error?: FieldError | undefined;
  className?: string;
  dark?: boolean;
  copyButton?: boolean;
}

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
  dark,
  copyButton,
}) => {
  return (
    <div className={`flex w-64 flex-col ${className || ""}`}>
      <p
        className={`my-2 break-words text-sm font-semibold uppercase ${
          !dark ? "text-white" : "text-black"
        }`}
      >
        {label}{" "}
        <span className="text-sm font-medium italic text-red">
          {error?.message && "-"} {error?.message}
        </span>
      </p>
      <div className="flex flex-row rounded bg-shade-2 outline-2 outline-offset-2 focus-within:outline focus-within:outline-shade-5">
        <input
          className="h-10 w-64 rounded bg-shade-2 px-2 font-medium text-white outline-none"
          type={type}
          value={value}
          onBlur={onBlur}
          name={name}
          onChange={onChange}
          {...register}
        />
        {copyButton && (
          <MdContentCopy
            className="my-auto mx-2 h-8 w-8 cursor-pointer text-white outline-none hover:text-white/75 active:text-white/50"
            onClick={() => {
              navigator.clipboard.writeText(value || "");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
