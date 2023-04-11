import React, { FC, useState } from "react";
import NavbarItem from "../navItemComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setCurrentAdminMode } from "../../app/slices/clientSlice";
import {MdPeople, MdMessage, MdViewList} from "react-icons/md"

const AdminList: FC = () => {
  const dispatch = useDispatch();
  const currentAdminMode = useSelector(
    (state: RootState) => state.client.currentAdminMode
  );

  return (
    <div className="list-scrollbar flex h-0 grow flex-col space-y-1 overflow-y-auto p-2">
      <NavbarItem
        onClick={() => dispatch(setCurrentAdminMode("guilds"))}
        selected={currentAdminMode === "guilds"}
      >
        <MdMessage className="h-12 w-12 shrink-0"></MdMessage>
        <p className="m-auto truncate pl-2 leading-relaxed">Rooms</p>
      </NavbarItem>
      <NavbarItem
        onClick={() => dispatch(setCurrentAdminMode("users"))}
        selected={currentAdminMode === "users"}
      >
        <MdPeople className="h-12 w-12 shrink-0"></MdPeople>
        <p className="m-auto truncate pl-2 leading-relaxed">Users</p>
      </NavbarItem>
      <NavbarItem
        onClick={() => dispatch(setCurrentAdminMode("server"))}
        selected={currentAdminMode === "server"}
      >
        <MdViewList className="h-12 w-12 shrink-0"></MdViewList>
        <p className="m-auto truncate pl-2 leading-relaxed">Server</p>
      </NavbarItem>
    </div>
  );
};

export default AdminList;
