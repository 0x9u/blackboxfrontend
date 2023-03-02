import React, { FC } from "react";

interface navItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  selected? : boolean;
}

const navItem:  FC<navItemProps> = ({children, onClick, selected}) => {
  return (
    <div className={`flex flex-row shrink-0 font-bold text-base text-white leading-loose space-x-2 truncate rounded-lg px-1 py-2 ${selected ? "bg-white/50" : "hover:bg-white/25"}`} onClick={onClick}>
        {children}
    </div>
  );
};

export default navItem;
