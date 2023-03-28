import React, { FC } from "react";

interface modalBottomProps {
  children: React.ReactNode; //buttons
}

const ModalBottom: FC<modalBottomProps> = ({ children }) => {
  return (
    <div className="-mx-4 -mb-4 mt-4 flex flex-row justify-end space-x-2 border-t-2 border-gray py-2 px-2">
      {children}
    </div>
  );
};

export default ModalBottom;
