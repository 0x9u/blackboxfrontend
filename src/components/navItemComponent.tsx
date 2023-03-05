import React, { FC } from "react";

interface navItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  selected? : boolean;
}

const navItem:  FC<navItemProps> = ({children, onClick, selected}) => {
  return (
    <div className={`flex flex-row shrink-0 font-bold text-base text-white leading-loose space-x-2 truncate rounded-lg px-1 py-2 active:bg-white-50 ${selected ? "bg-white/50 cursor-default" : "hover:bg-white/25 cursor-pointer"}`} onClick={onClick}>
        {children}
    </div>
  );
};

export default navItem;
