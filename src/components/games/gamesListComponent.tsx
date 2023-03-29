import React, { FC, useState } from "react";
import NavbarItem from "../navItemComponent";
import { MdVideogameAsset } from "react-icons/md";

const GamesList: FC = () => {
  return (
    <div className="list-scrollbar flex h-0 grow flex-col space-y-1 overflow-y-auto py-1 pl-2">
      {[...Array(50)].map(() => (
        <NavbarItem onClick={() => console.log("clicked")}>
          <MdVideogameAsset className="h-12 w-12 flex-shrink-0 rounded-full text-white" />
          <p className="my-auto truncate pl-2 leading-relaxed">Game Name</p>
        </NavbarItem>
      ))}
    </div>
  );
};

export default GamesList;
