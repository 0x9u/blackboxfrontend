import React, { FC } from "react";

import { useForm } from "react-hook-form";

import Input from "../../components/input";
import Button from "../../components/button";

type LoginProps = {
  changeMode: () => void;
};

const Login: FC<LoginProps> = ({ changeMode }) => {
  const { register, handleSubmit } = useForm();
  return (
    <div className=" mx-auto flex flex-col rounded-xl bg-shade-3 py-10 px-16 shadow-2xl">
      <form>
        <div className="mx-auto flex flex-col pb-10">
          <p className="my-2 text-4xl font-bold text-white">Welcome back!</p>
        </div>
        <div className="mx-auto flex flex-col">
          <p className="my-2 text-xs font-bold uppercase text-white">
            username
          </p>
          <Input {...register("username")} />
        </div>
        <div className="mx-auto flex flex-col">
          <p className="my-2 text-xs font-bold uppercase text-white">
            password
          </p>
          <Input {...register("password")} />
        </div>
        <div className="flex flex-col py-4 pl-32 pr-5">
          <Button type="submit" value="Login" onClick={() => console.log("Login")} />
        </div>
        <div className="mb-16 flex flex-col space-y-2 pl-5 text-sm">
          <a
            className=" cursor-pointer font-medium text-shade-5 hover:underline"
            onClick={changeMode}
          >
            Create an account
          </a>
          <a
            className=" cursor-pointer font-medium text-shade-5 hover:underline"
            onClick={changeMode}
          >
            Reset my password
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
