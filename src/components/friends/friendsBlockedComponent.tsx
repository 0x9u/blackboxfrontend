import React, { FC } from "react";
import { MdPersonRemove } from "react-icons/md";
import { useGetBlockedList } from "../../api/hooks/userHooks";
import { SkeletonLoaderUserList } from "../skeletonLoaderComponent";
import { useAppDispatch } from "../../app/store";
import { unblockUser } from "../../api/userApi";
const FriendsBlocked: FC = () => {
  const dispatch = useAppDispatch();
  const { loaded, blockedList } = useGetBlockedList();
  return (
    <div className="flex h-0 grow flex-col space-y-4 overflow-auto p-8">
      {blockedList.map((blocked) => (
        <div
          className="flex flex-row justify-between border-b border-gray pb-4"
          key={blocked.id}
        >
          <div className="flex flex-row space-x-4">
            <img
              className="m-auto h-14 w-14 rounded-full border border-black"
              src={
                blocked.imageId !== "-1"
                  ? `${import.meta.env.VITE_API_ENDPOINT}/files/user/${blocked.imageId}`
                  : "./blackboxuser.jpg"
              }
            />
            <p className="m-auto text-xl font-semibold text-white">
              {blocked.name}
            </p>
          </div>
          <div>
            <MdPersonRemove
              className="m-auto h-12 w-12 cursor-pointer text-white/75 hover:text-white/50 active:text-white/25"
              onClick={() => {
                dispatch(unblockUser(blocked.id));
              }}
            />
          </div>
        </div>
      ))}
      {!loaded && <SkeletonLoaderUserList />}
    </div>
  );
};
export default FriendsBlocked;
