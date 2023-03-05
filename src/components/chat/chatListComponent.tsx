//make empty component with FC
import React, { FC } from "react";
import NavbarItem from "../navItemComponent";
import { MdAdd } from "react-icons/md";

const ChatList: FC = () => {
  return (
    <div className="list-scrollbar flex h-0 grow flex-col space-y-1 overflow-y-auto py-1 pl-2">
      <NavbarItem onClick={() => console.log("clicked")}>
        <MdAdd className="h-12 w-12 shrink-0"></MdAdd>
        <p className="m-auto truncate pl-2 leading-relaxed">Add Chat</p>
      </NavbarItem>
      {[...Array(50)].map(() => (
        <NavbarItem onClick={() => console.log("clicked")}>
          <div className="h-12 w-12 flex-shrink-0 rounded-full border border-black"></div>
          <p className="my-auto truncate pl-2 leading-relaxed">
            Friend Namaaaaaaaaaaaaaaaaaa
          </p>
        </NavbarItem>
      ))}
    </div>
  );
};

export default ChatList;
