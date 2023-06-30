import React, { FC } from "react";
import { MdClose } from "react-icons/md";

interface modalProps {
  children: React.ReactNode;
  title?: string;
  exitFunc?: () => void;
  noExit?: boolean;
}

const Modal: FC<modalProps> = ({ children, title, exitFunc, noExit }) => {
  return (
    <div className="fixed inset-0 z-10 flex w-full items-center justify-center overflow-y-auto bg-black/50 p-16">
      <div className="m-auto flex flex-col rounded-md bg-white shadow-2xl min-[576px]:mx-auto min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]">
        <div className=" flex grow flex-row border-b border-gray border-opacity-100 py-2 px-4">
          <div className="text-lg font-bold text-black">{title}</div>
          <div className="flex grow flex-row justify-end">
            {!noExit && (
              <MdClose
                className="h-6 w-6 cursor-pointer text-black hover:opacity-75 focus:opacity-100"
                onClick={exitFunc}
              />
            )}
          </div>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
