import React, { FC } from "react";
import { MdClose } from "react-icons/md";

interface settingsPanelProps {
  children: React.ReactNode; //buttons
  closeFunc: () => void;
}

const SettingsPanel: FC<settingsPanelProps> = ({ children, closeFunc }) => {
  return (
    <div className="flex min-h-screen w-[calc(50%+520px)] min-w-[620px] bg-shade-4">
      <div className="w-[620px] flex flex-row pt-12 px-12 space-x-12">
        <div className="shrink-0 grow flex-col w-[600px] overflow-auto">{children}</div>
        <div className="my-2 h-12 w-10 space-y-0.5">
          <MdClose
            className="h-10 w-10 cursor-pointer p-1 rounded-full border-2 border-white/75 text-white/75 hover:bg-white/50 active:bg-white/25 hover:text-white/75 focus:opacity-100"
            onClick={closeFunc}
          />
          <p className="text-center text-sm font-semibold uppercase text-white/75">
            Exit
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
