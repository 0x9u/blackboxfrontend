import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Resolver } from "react-hook-form";
import * as yup from "yup";

import Input from "../../components/input";
import Button from "../../components/button";

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
  return (
    <form
      className=" mx-auto flex flex-col rounded-xl bg-shade-3 py-10 px-16 shadow-2xl"
      onSubmit={handleSubmit((d) => console.log(d))}
    >
      <div className="mx-auto flex flex-col pb-10">
        <p className="my-2 text-2xl font-bold uppercase text-white">
          Create an account
        </p>
      </div>
      <div className="mx-auto">
        <Input
          error={errors.username}
          register={register("username")}
          label="username"
        />
      </div>
      <div className="mx-auto">
        <Input
          label="email"
          error={errors.email}
          register={register("email")}
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
      <div className="mx-auto flex flex-col">
        <Input
          type="password"
          label="confirm password"
          error={errors.confirmPassword}
          register={register("confirmPassword")}
        />
      </div>
      <div className="ml-auto flex flex-col py-4">
        <Button type="submit" value="Register" />
      </div>
      <div className="mb-16 flex flex-col text-sm">
        <a
          className=" cursor-pointer font-medium text-shade-5 hover:underline"
          onClick={changeMode}
        >
          Already have an account?
        </a>
      </div>
    </form>
  );
};

export default Register;
