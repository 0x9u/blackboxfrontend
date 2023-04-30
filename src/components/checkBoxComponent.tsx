import React, { FC, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form/dist/types";
import { MdDone } from "react-icons/md";

interface checkBoxProps {
  register?: UseFormRegisterReturn<any>;
  checked? : boolean; //temp until i find a fix for style issue
}

const CheckBox: FC<checkBoxProps> = ({ register, checked : initialChecked}) => {
  const [checked, setChecked] = useState<boolean>(initialChecked ?? false);
  return (
    <div
      className={`relative h-7 w-14 rounded-full ${
        checked ? "bg-green" : "bg-gray"
      } 
        duration-100
        ease-in-out
    `}
    >
      <span
        className={`inset-0 origin-center ${
          checked ?  "translate-x-7" : "translate-x-0"
        } absolute mx-1 my-1 h-5 w-5 cursor-pointer rounded-full bg-white duration-100 ease-in-out`}
      >
        <MdDone
          className={`m-auto h-full w-full ${
            checked ? "text-green" : "text-gray"
          } `}
        />
      </span>
      <input
        type="checkbox"
        className="absolute h-full w-full cursor-pointer appearance-none"
        {...register}
        onChange={(e) => {
          console.log("test");
          setChecked(e.target.checked); //temp or maybe not who knows?
          register?.onChange(e);
        }}
      />
    </div>
  );
};

export default CheckBox;
