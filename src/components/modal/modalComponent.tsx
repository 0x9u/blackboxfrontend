import React, { FC } from "react";

interface modalProps {
  children: React.ReactNode;
}

const Modal: FC<modalProps> = ({ children }) => {
  return (
    <div className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden">
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <p>hi</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
