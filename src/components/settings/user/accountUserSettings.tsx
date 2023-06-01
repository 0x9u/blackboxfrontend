import React, { FC, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { User } from "../../../api/types/user";
import { RootState } from "../../../app/store";
import Button from "../../buttonComponent";
import Input from "../../inputComponent";
import UploadPic from "../../uploadPicComponent";

const AccountUserSettings: FC = () => {
  const userInfo = useSelector(
    (state: RootState) =>
      state.user.users[state.user.selfUser || ""] ?? ({} as User)
  );
  const imageURL =
    userInfo.imageId !== "-1"
      ? `http://localhost:8080/api/files/user/${userInfo.imageId}`
      : "./blackboxuser.jpg";
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
            <Input label="username" className="w-full"/>
          </div>
          <div className="flex flex-col">
            <Input label="email" />
          </div>
        </div>
      </div>
      <div>
        <h1 className="mb-5 text-2xl text-white">
          Password and Authentication
        </h1>
        <Button type="button" value="Change Password" />
      </div>
      <div>
        <h1 className="mb-5 text-xl text-white">Account Removal</h1>
        <Button type="button" value="Delete Account" red />
      </div>
    </div>
  );
};

export default AccountUserSettings;
