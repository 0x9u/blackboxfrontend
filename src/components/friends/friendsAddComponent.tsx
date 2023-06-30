import React, { FC } from "react";
import * as yup from "yup";
import Button from "../buttonComponent";
import Input from "../inputComponent";
import { useAddFriend } from "../../api/hooks/userHooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  username: string;
};

const FriendsAdd: FC = () => {
  const { callFunction: addFriend, status, error } = useAddFriend();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormValues>({
    resolver: yupResolver(
      yup
        .object()
        .shape({
          username: yup
            .string()
            .required("Username is required")
            .min(1, "too short")
            .max(32, "too long"),
        })
        .required()
    ),
  });
  return (
    <div className="m-auto flex h-full w-full flex-col items-center ">
      <form
        className="m-auto space-y-2"
        onSubmit={handleSubmit((data) => {
          addFriend(data.username);
        })}
      >
        <h1 className="text-2xl text-white">Add a Friend!</h1>
        <p className="font-medium italic text-gray">
          Usernames are case sensitive!
        </p>
        <div className="flex flex-row space-x-4">
          <Input label="Username" register={register("username")} />
          <Button type="submit" className="place-self-end" />
        </div>
      </form>
    </div>
  );
};
export default FriendsAdd;
