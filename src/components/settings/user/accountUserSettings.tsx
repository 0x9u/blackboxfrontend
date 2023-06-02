import React, { FC, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../api/types/user";
import { RootState } from "../../../app/store";
import Button from "../../buttonComponent";
import Input from "../../inputComponent";
import UploadPic from "../../uploadPicComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setShowEditPassModal } from "../../../app/slices/clientSlice";

type editAccountForm = {
  username: string;
  email: string;
  picture: FileList;
}

const AccountUserSettings: FC = () => {
  const userInfo = useSelector(
    (state: RootState) =>
      state.user.users[state.user.selfUser || ""] ?? ({} as User)
  );
  const imageURL =
    userInfo.imageId !== "-1"
      ? `http://localhost:8080/api/files/user/${userInfo.imageId}`
      : "./blackboxuser.jpg";

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<editAccountForm>({
    resolver: yupResolver(
      yup.object().shape({
        username: yup
          .string()
          .required("Username is required")
          .min(1, "too short")
          .max(32, "too long")
          .matches(/^[A-Za-z][A-Za-z0-9_]+$/, "Not valid character"),
        email: yup.string().email("Not a valid email"),
        picture: yup
          .mixed()
          .test(
            "filesize",
            "The file is too large (must be under 5MB)",
            (value) => {
              return (
                value.length === 0 || (value[0] && value[0].size <= 5000000)
              ); //5 MB max
            }
          )
          .test("filetype", "The file is not an image", (value) => {
            return (
              (value[0] &&
                (value[0].type === "image/jpeg" ||
                  value[0].type === "image/png" ||
                  value[0].type === "image/jpg" ||
                  value[0].type === "image/gif")) ||
              value.length === 0
            );
          }),
      })
    ),
  });


  return (
    <div className="space-y-8">
      <h1 className="mb-5 text-2xl text-white">My Account</h1>
      <div className="space-y-4 rounded-md bg-shade-2 p-4">
        <div className="flex flex-row space-x-8">
          <div className="flex h-24 w-24 shrink-0 flex-col">
            <UploadPic width="24" height="24" dark url={imageURL} />
          </div>
          <p className="my-auto text-2xl font-medium text-white">
            {userInfo.name}
          </p>
        </div>
        <div className="flex w-full flex-col rounded-lg bg-shade-4 p-4">
          <div className="flex flex-col">
            <Input label="username" className="!w-full" />
          </div>
          <div className="flex flex-col">
            <Input label="email" className="!w-full" />
          </div>
        </div>
      </div>
      <div>
        <h1 className="mb-5 text-2xl text-white">
          Password and Authentication
        </h1>
        <Button type="button" value="Change Password" onClick={() => dispatch(setShowEditPassModal(true))} />
      </div>
      <div>
        <h1 className="mb-5 text-xl text-white">Account Removal</h1>
        <Button type="button" value="Delete Account" red />
      </div>
    </div>
  );
};

export default AccountUserSettings;
