import React, { FC } from "react";
import { MdPersonRemove } from "react-icons/md";
import { useGetFriendList } from "../../api/hooks/userHooks";
import { SkeletonLoaderUserList } from "../skeletonLoaderComponent";

const FriendsList: FC = () => {
  const { loaded, friends } = useGetFriendList();
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
                  ? `http://localhost:8080/api/files/user/${friend.imageId}`
                  : "./blackboxuser.jpg"
              }
            />
            <p className="m-auto text-xl font-semibold text-white">
              {friend.name}
            </p>
          </div>
          <div>
            <MdPersonRemove className="m-auto h-12 w-12 cursor-pointer text-white/75 hover:text-white/50 active:text-white/25" />
          </div>
        </div>
      ))}
      {!loaded && <SkeletonLoaderUserList />}
    </div>
  );
};

export default FriendsList;
