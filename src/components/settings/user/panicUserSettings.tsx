import React, { FC, useState } from "react";
import CheckBox from "../../checkBoxComponent";
import Input from "../../inputComponent";

const PanicUserSettings: FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="mb-5 text-4xl text-white">Panic Mode</h1>
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg text-white">About Panic Mode</h2>
        <p className="text-white">
          Woried someone might peek over? No need to worry, Panic Mode is here!<br/>
          Pressing the keybind redirects you to the URL you put in the link
          input.
        </p>
      </div>

      <Input label="Link" />
      <div className="flex flex-row justify-between">
        <p className="text-white">Turn on panic button (CTRL + K)</p>
        <CheckBox />
      </div>
    </div>
  );
};

export default PanicUserSettings;
