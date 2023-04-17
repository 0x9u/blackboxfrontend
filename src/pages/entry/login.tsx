import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Resolver } from "react-hook-form";
import * as yup from "yup";

import Input from "../../components/inputComponent";
import Button from "../../components/buttonComponent";
import { useNavigate } from "react-router-dom";
import { LoginReq, usePostAuthMutation } from "../../api/authApi";

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
  const navigate = useNavigate();
  const [postAuth, result] = usePostAuthMutation();
  return (
    <form
      className=" mx-auto flex flex-col rounded-xl bg-shade-3 py-8 px-14 shadow-2xl"
      onSubmit={handleSubmit((data) => {
        const body : LoginReq = {
          name : data.username,
          password : data.password,
        }
        postAuth(body);
        navigate("/main");
      })}
    >
      <div className="flex flex-col py-2">
        <p className="text-4xl font-bold text-white">Welcome back!</p>
      </div>
      <div className="py-4 mx-auto">
        <Input
          label="username"
          error={errors.username}
          register={register("username")}
        />
        <Input
          type="password"
          label="password"
          error={errors.password}
          register={register("password")}
        />
      </div>
      <div className="flex flex-col py-2">
        <Button type="submit" value="Login" />
      </div>
      <div className="py-4 flex flex-col space-y-2 text-sm">
        <a
          className=" cursor-pointer font-medium text-shade-5 hover:underline text-center"
          onClick={changeMode}
        >
          Create an account
        </a>
        <a
          className=" cursor-pointer font-medium text-shade-5 hover:underline text-center"
          onClick={changeMode}
        >
          Reset my password
        </a>
      </div>
    </form>
  );
};

export default Login;
