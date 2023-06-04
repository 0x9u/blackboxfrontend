import React, { FC, useState } from "react";
import CheckBox from "../../checkBoxComponent";

const PrivacyUserSettings: FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="mb-5 text-4xl text-white">Privacy & Safety</h1>
      <div className="flex flex-row justify-between">
        <p className="text-white">Allow direct messages from chat members</p>
        <CheckBox />
      </div>
    </div>
  );
};

export default PrivacyUserSettings;
