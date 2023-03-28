import React, { FC } from "react";
import {
  MdOutlineEmojiPeople,
  MdPerson,
  MdPersonAdd,
  MdPersonRemove,
} from "react-icons/md";

import NavbarChild from "../../../components/navbarChildComponent";
import NavbarItem from "../../../components/navItemComponent";
import Page from "../../../components/pageComponent";

const Friends: FC = () => {
  return (
    <div className="flex min-h-full grow flex-row">
      <NavbarChild>
        <div className="list-scrollbar flex h-0 grow flex-col space-y-1 overflow-y-auto py-1 px-2">
          <NavbarItem onClick={() => console.log("clicked")}>
            <MdOutlineEmojiPeople className="h-12 w-12 shrink-0"></MdOutlineEmojiPeople>
            <p className="m-auto truncate pl-2 leading-relaxed">Friends</p>
          </NavbarItem>
          <NavbarItem onClick={() => console.log("clicked")}>
            <MdPersonAdd className="h-12 w-12 shrink-0"></MdPersonAdd>
            <p className="m-auto truncate pl-2 leading-relaxed">
              Friend Requests
            </p>
          </NavbarItem>
          <NavbarItem onClick={() => console.log("clicked")}>
            <MdPersonAdd className="h-12 w-12 shrink-0"></MdPersonAdd>
            <p className="m-auto truncate pl-2 leading-relaxed">Add Friend</p>
          </NavbarItem>
          <NavbarItem onClick={() => console.log("clicked")}>
            <MdPerson className="h-12 w-12 shrink-0"></MdPerson>
            <p className="m-auto truncate pl-2 leading-relaxed">Blocked</p>
          </NavbarItem>
        </div>
      </NavbarChild>
      <Page>
        <div className="flex flex-col p-8 space-y-4 h-0 grow overflow-auto">
          {[...Array(50)].map(() => (
            <div className="flex flex-row justify-between border-b border-gray pb-4">
              <div className="flex flex-row space-x-4">
                <div className="m-auto h-14 w-14 rounded-full border border-black"></div>
                <p className="m-auto text-xl font-semibold text-white">Bov</p>
              </div>
              <div>
                <MdPersonRemove className="m-auto h-12 w-12 text-white" />
              </div>
            </div>
          ))}
        </div>
      </Page>
    </div>
  );
};

export default Friends;
