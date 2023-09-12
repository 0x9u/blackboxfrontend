import React, { FC } from "react";
import { MdChat, MdPersonRemove } from "react-icons/md";
import { useGetFriendList } from "../../api/hooks/userHooks";
import { SkeletonLoaderUserList } from "../skeletonLoaderComponent";
import { openDM, removeFriend } from "../../api/userApi";
import { useAppDispatch } from "../../app/store";
import {
  setCurrentChatMode,
  setCurrentDM,
  setCurrentMode,
  setShowChatUserList,
  setUserDMtobeOpened,
} from "../../app/slices/clientSlice";

const FriendsList: FC = () => {
  const dispatch = useAppDispatch();

  const { loaded, friends, openDms } = useGetFriendList();
  return (
    <div className="flex h-0 grow flex-col space-y-4 overflow-auto p-8">
      {friends.map((friend) => (
        <div
          className="flex flex-row justify-between border-b border-gray pb-4"
          key={friend.id}
        >
          <div className="flex flex-row space-x-4">
            <img
              className="m-auto h-14 w-14 rounded-full border border-black"
              src={
                friend.imageId !== "-1"
                  ? `${import.meta.env.VITE_API_ENDPOINT}/files/user/${friend.imageId}`
                  : "./blackboxuser.jpg"
              }
            />
            <p className="m-auto text-xl font-semibold text-white">
              {friend.name}
            </p>
          </div>
          <div className="flex flex-row space-x-4">
            <MdChat
              className="m-auto h-12 w-12 cursor-pointer text-white/75 hover:text-white/50 active:text-white/25"
              onClick={() => {
                const userDMId = openDms[friend.id];
                console.log("userdmid", userDMId)
                if (userDMId === undefined) {
                  dispatch(setUserDMtobeOpened(friend.id)); //ws too fast sometimes so it has to be like this
                  dispatch(openDM(friend.id)).then((res) => {
                    if (res.meta.requestStatus === "rejected") {
                      dispatch(setUserDMtobeOpened(null));
                    }
                  });
                } else {
                  dispatch(setCurrentDM(userDMId));
                  dispatch(setCurrentMode("chat"));
                  dispatch(setCurrentChatMode("dm"));
                  dispatch(setShowChatUserList(false));
                }
              }}
            />
            <MdPersonRemove
              className="m-auto h-12 w-12 cursor-pointer text-white/75 hover:text-white/50 active:text-white/25"
              onClick={() => {
                dispatch(removeFriend(friend.id));
              }}
            />
          </div>
        </div>
      ))}
      {!loaded && <SkeletonLoaderUserList />}
    </div>
  );
};

export default FriendsList;
