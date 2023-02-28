import React, { FC } from "react";

interface navItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const navItem:  FC<navItemProps> = ({children, onClick}) => {
  return (
    <div className="flex flex-row font-bold text-lg text-white" onClick={onClick}>
        {children}
    </div>
  );
};

export default navItem;
