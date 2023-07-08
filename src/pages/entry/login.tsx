import React, { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import Input from "../../components/inputComponent";
import Button from "../../components/buttonComponent";
import { useNavigate } from "react-router-dom";
import { LoginReq, postAuth } from "../../api/authApi";
import { useAppDispatch } from "../../app/store";

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
      .min(8, "Too short"),
  })
  .required();

const Login: FC<LoginProps> = ({ changeMode }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <form
      className=" mx-auto flex flex-col rounded-xl bg-shade-3 py-8 px-14 shadow-2xl"
      onSubmit={handleSubmit((data) => {
        const body: LoginReq = {
          name: data.username,
          password: data.password,
        };
        dispatch(postAuth(body)).then((action) => {
          if (action.type === postAuth.fulfilled.type) {
            navigate("/main");
          } else if (action.type === postAuth.rejected.type) {
            setError("username", {
              type: "manual",
              message: "Invalid username or password",
            });
          }
        });
      })}
    >
      <div className="flex flex-col py-2">
        <p className="text-4xl font-bold text-white">Welcome back!</p>
      </div>
      <div className="mx-auto py-4">
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
      <div className="flex flex-col space-y-2 py-4 text-sm">
        <a
          className=" cursor-pointer text-center font-medium text-shade-5 hover:underline"
          onClick={changeMode}
        >
          Create an account
        </a>
        <a
          className=" cursor-pointer text-center font-medium text-shade-5 hover:underline"
          onClick={changeMode}
        >
          Reset my password
        </a>
      </div>
    </form>
  );
};

export default Login;
