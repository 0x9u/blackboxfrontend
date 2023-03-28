import React, { FC, useState } from "react";
import {MdEdit} from "react-icons/md";
import UploadPic from "../../uploadPicComponent";

const AccountUserSettings: FC = () => {
  return (
    <div>
      <h1 className="mb-5 text-2xl text-white">My Account</h1>
      <div className="space-y-4 rounded-md bg-shade-2 p-4">
        <div className="flex flex-row space-x-8 ">
          <div className="flex flex-col space-y-2">
            <UploadPic width="24" height="24" dark />
          </div>
          <p className="my-auto text-2xl font-medium text-white">
            Random username
          </p>
        </div>
        <div className="flex w-full flex-col space-y-4 rounded-lg bg-shade-4 p-4">
          <div className="flex flex-col">
            <p className="text-sm uppercase text-white">Username</p>
            <div className="flex flex-row justify-between text-white font-semibold"><p>aaa</p><MdEdit className="h-6 w-6 cursor-pointer"/></div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm uppercase text-white">Password</p>
            <div className="flex flex-row justify-between text-white font-semibold"><p>aaa</p><MdEdit className="h-6 w-6 cursor-pointer"/></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountUserSettings;
