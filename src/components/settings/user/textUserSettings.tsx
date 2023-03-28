import React, { FC, useState } from "react";
import CheckBox from "../../checkBoxComponent";

const TextUserSettings: FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="mb-5 text-2xl text-white">Text & Images</h1>
      <div className="flex flex-row justify-between">
        <p className="text-white">Automatically play gifs</p>
        <CheckBox />
      </div>
    </div>
  );
};

export default TextUserSettings;
