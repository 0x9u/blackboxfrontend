import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import FriendAdd from "../../../components/friends/friendsAddComponent";
import FriendsBlocked from "../../../components/friends/friendsBlockedComponent";
import FriendsList from "../../../components/friends/friendsListComponent";
import FriendsMenu from "../../../components/friends/friendsMenuComponent";
import FriendsRequestList from "../../../components/friends/friendsRequestListComponent";

import NavbarChild from "../../../components/navbarChildComponent";

import Page from "../../../components/pageComponent";
const Friends: FC = () => {
  const currentFriendsMode = useSelector(
    (state: RootState) => state.client.currentFriendsMode
  );
  return (
    <div className="relative flex min-h-full grow flex-row">
      <NavbarChild>
        <FriendsMenu />
      </NavbarChild>
      <Page>
        {currentFriendsMode === "friends" ? (
          <FriendsList />
        ) : currentFriendsMode === "requests" ? (
          <FriendsRequestList />
        ) : currentFriendsMode === "add" ? (
          <FriendAdd />
        ) : currentFriendsMode === "blocked" ? (
          <FriendsBlocked />
        ) : null}
      </Page>
    </div>
  );
};

export default Friends;
