import React, { FC } from "react";
import { MdClose } from "react-icons/md";

interface modalProps {
  children: React.ReactNode;
  title?: string;
  exitFunc: () => void;
}

const Modal: FC<modalProps> = ({ children, title, exitFunc }) => {
  return (
    <div className="fixed inset-0 z-10 flex w-full items-center justify-center overflow-y-auto bg-black/25 p-16">
      <div className="m-auto flex flex-col space-y-1 rounded-lg bg-white shadow-2xl min-[576px]:mx-auto min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]">
        <div className=" border-gray flex grow flex-row border-b-2 border-opacity-100 p-4">
          <div className="text-xl font-bold">{title}</div>
          <div className="flex grow flex-row justify-end">
              <MdClose className="cursor-pointer w-6 h-6 hover:opacity-75 focus:opacity-100" onClick={exitFunc}/>
          </div>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
