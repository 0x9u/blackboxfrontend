import React, { FC, useState } from "react";
import CheckBox from "../../checkBoxComponent";

const FriendUserSettings: FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="mb-5 text-4xl text-white">Friend Requests</h1>
      <h2 className="text-xl text-white">Who can friend you</h2>
      <div className="flex flex-row justify-between">
        <p className="text-white">Anyone in same chat</p>
        <CheckBox />
      </div>
      <div className="flex flex-row justify-between ">
        <p className="text-white">Friends of friends</p>
        <CheckBox />
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-white">Everyone</p>
        <CheckBox />
      </div>
    </div>
  );
};

export default FriendUserSettings;
