import React, { FC } from "react";
import { MdOutlineEmojiPeople, MdPersonAdd, MdPerson } from "react-icons/md";
import NavbarItem from "../navItemComponent";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFriendsMode } from "../../app/slices/clientSlice";
import { RootState } from "../../app/store";

const FriendsMenu: FC = () => {
  const dispatch = useDispatch();
  const currentFriendsMode = useSelector(
    (state: RootState) => state.client.currentFriendsMode
  );

  return (
    <div className="list-scrollbar flex h-0 grow flex-col space-y-1 overflow-y-auto p-2">
      <NavbarItem
        onClick={() => dispatch(setCurrentFriendsMode("friends"))}
        selected={currentFriendsMode === "friends"}
      >
        <MdOutlineEmojiPeople className="h-12 w-12 shrink-0"></MdOutlineEmojiPeople>
        <p className="m-auto truncate pl-2 leading-relaxed">Friends</p>
      </NavbarItem>
      <NavbarItem
        onClick={() => dispatch(setCurrentFriendsMode("requests"))}
        selected={currentFriendsMode === "requests"}
      >
        <MdPersonAdd className="h-12 w-12 shrink-0"></MdPersonAdd>
        <p className="m-auto truncate pl-2 leading-relaxed">Friend Requests</p>
      </NavbarItem>
      <NavbarItem
        onClick={() => dispatch(setCurrentFriendsMode("add"))}
        selected={currentFriendsMode === "add"}
      >
        <MdPersonAdd className="h-12 w-12 shrink-0"></MdPersonAdd>
        <p className="m-auto truncate pl-2 leading-relaxed">Add Friend</p>
      </NavbarItem>
      <NavbarItem
        onClick={() => dispatch(setCurrentFriendsMode("blocked"))}
        selected={currentFriendsMode === "blocked"}
      >
        <MdPerson className="h-12 w-12 shrink-0"></MdPerson>
        <p className="m-auto truncate pl-2 leading-relaxed">Blocked</p>
      </NavbarItem>
    </div>
  );
};

export default FriendsMenu;
