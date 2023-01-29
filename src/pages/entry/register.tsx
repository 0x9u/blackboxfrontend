import React, { FC } from "react";

import Input from "../../components/input";
import Button from "../../components/button";

import { useForm } from "react-hook-form";

type RegisterProps = {
  changeMode: () => void;
};

const Register: FC<RegisterProps> = ({ changeMode }) => {
  const { register, handleSubmit } = useForm();
  return (
    <div className=" mx-auto flex flex-col rounded-xl bg-shade-3 py-10 px-16 shadow-2xl">
      <div className="mx-auto flex flex-col pb-10">
        <p className="my-2 text-2xl font-bold uppercase text-white">
          Create an account
        </p>
      </div>
      <div className="mx-auto flex flex-col">
        <p className="my-2 text-xs font-bold uppercase text-white">username</p>
        <Input value="" />
      </div>
      <div className="mx-auto flex flex-col">
        <p className="my-2 text-xs font-bold uppercase text-white">email</p>
        <Input value="" />
      </div>
      <div className="mx-auto flex flex-col">
        <p className="my-2 text-xs font-bold uppercase text-white">password</p>
        <Input value="" />
      </div>
      <div className="mx-auto flex flex-col">
        <p className="my-2 text-xs font-bold uppercase text-white">
          confirm password
        </p>
        <Input value="" />
      </div>
      <div className="flex flex-col py-4 pl-32 pr-5">
        <Button type="submit" value="Register" onClick={() => console.log("Register")} />
      </div>
      <div className="mb-16 flex flex-col pl-5 text-sm">
        <a
          className=" cursor-pointer font-medium text-shade-5 hover:underline"
          onClick={changeMode}
        >
          Already have an account?
        </a>
      </div>
    </div>
  );
};

export default Register;
