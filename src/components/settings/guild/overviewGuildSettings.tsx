import React, { FC, useState } from "react";
import UploadPic from "../../uploadPicComponent";
import Input from "../../inputComponent";
import CheckBox from "../../checkBoxComponent";
import Button from "../../buttonComponent";

const OverviewGuildSettings: FC = () => {
  const [formEdited, setFormEdited] = useState<boolean>(false);
  return (
    <form onChange={(e) => setFormEdited(true)} className="relative h-full">
      <h1 className="mb-5 text-2xl text-white">Server Overview</h1>
      <div className="flex flex-row space-x-32 border-b-2 border-gray pb-12">
        <div className="space-y-2">
          <UploadPic width="32" height="32" dark />
          <p className="text-center text-xs text-white/75">
            Minimum size 128x128
          </p>
        </div>
        <div className="my-auto">
          <Input label="server name" />
        </div>
      </div>
      <div className="flex flex-row justify-between py-4 px-2">
        <p className="text-lg text-white">Save Chat?</p>
        <CheckBox />
      </div>
      <div className={`absolute w-full bg-shade-2 ${formEdited ? "-translate-y-4": "translate-y-16"} bottom-0 h-12 transition duration-200 rounded-md text-white px-4 flex flex-row`}>
        <p className="my-auto">You made some changes</p>
        <div className="grow my-auto flex flex-row justify-end space-x-2">
            <Button value="Cancel" type="button" gray className="h-8" onClick={() => {setFormEdited(false);}}/>
            <Button value="Submit" type="submit" className="h-8"/>
        </div>
      </div>
    </form>
  );
};

export default OverviewGuildSettings;
