import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Resolver } from "react-hook-form";
import * as yup from "yup";

import Input from "../../components/inputComponent";
import Button from "../../components/buttonComponent";

interface LoginProps {
  changeMode: () => void;
}

type FormValues = {
  username: string;
  password: string;
};

const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required("Username is required")
      .min(1, "too short")
      .max(32, "too long"),
    password: yup
      .string()
      .required("Password is required")
      .max(32, "Too long")
      .min(8, "Too short")
  })
  .required();

const Login: FC<LoginProps> = ({ changeMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  return (
    <form
      className=" mx-auto flex flex-col rounded-xl bg-shade-3 py-10 px-16 shadow-2xl"
      onSubmit={handleSubmit((d) => console.log(d))}
    >
      <div className="mx-auto flex flex-col pb-10">
        <p className="my-2 text-4xl font-bold text-white">Welcome back!</p>
      </div>
      <div className="mx-auto">
        <Input
          label="username"
          error={errors.username}
          register={register("username")}
        />
      </div>
      <div className="mx-auto">
        <Input
          type="password"
          label="password"
          error={errors.password}
          register={register("password")}
        />
      </div>
      <div className="flex flex-col py-4">
        <Button type="submit" value="Login" />
      </div>
      <div className="mb-16 flex flex-col space-y-2 text-sm">
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
  );
};

export default Login;
