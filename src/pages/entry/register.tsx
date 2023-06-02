import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import Input from "../../components/inputComponent";
import Button from "../../components/buttonComponent";
import { postAuth, RegisterReq, useCreateAccountMutation } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  changeMode: () => void;
}

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required("Username is required")
      .min(1, "too short")
      .max(32, "too long")
      .matches(/^[A-Za-z][A-Za-z0-9_]+$/, "Not valid character"),
    email: yup.string().email("Not a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .max(32, "Too long")
      .min(8, "Too short")
      .matches(/[A-Z]/, "must contain a uppercase letter")
      .matches(/\d/, "must contain a number")
      .matches(/[a-z]/, "must contain a lowercase letter"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();
const Register: FC<RegisterProps> = ({ changeMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const [createAccount, result] = useCreateAccountMutation(); //dont use result its should be stored in slice
  return (
    <form
      className=" mx-auto flex flex-col rounded-xl bg-shade-3 py-4 px-8 shadow-2xl"
      onSubmit={handleSubmit((data) => {
        const body : RegisterReq = {
          name : data.username,
          password : data.password,
          email : data.email,
        };
        createAccount(body);
        navigate("/main");
      })}
    >
      <div className="flex flex-col py-4">
        <p className="mx-auto text-4xl font-bold text-white">
          Create an account
        </p>
      </div>
      <div className="mx-auto py-4">
        <Input
          error={errors.username}
          register={register("username")}
          label="username"
        />
        <Input
          label="email"
          error={errors.email}
          register={register("email")}
        />
        <Input
          type="password"
          label="password"
          error={errors.password}
          register={register("password")}
        />
        <Input
          type="password"
          label="confirm password"
          error={errors.confirmPassword}
          register={register("confirmPassword")}
        />
      </div>
      <div className="flex flex-col py-2 px-6">
        <Button type="submit" value="Register" />
      </div>
      <div className="py-4 flex flex-col text-sm">
        <a
          className="cursor-pointer font-medium text-shade-5 hover:underline text-center"
          onClick={changeMode}
        >
          Already have an account?
        </a>
      </div>
    </form>
  );
};

export default Register;
