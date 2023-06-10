import React, { FC } from "react";
import { SkeletonLoaderUserList } from "../skeletonLoaderComponent";
import User from "./userComponent";
import { useGetGuildMembers } from "../../api/hooks/guildHooks";

const UserList: FC = () => {
  const { currentGuild, guildMembers, guildMembersOrder, loaded } =
    useGetGuildMembers();

  return (
    <div className="list-scrollbar relative flex h-full w-64 shrink-0 flex-col space-y-2 overflow-y-auto bg-shade-3 py-2">
      {!loaded && <SkeletonLoaderUserList />}
      {guildMembersOrder.map((id: string) => (
        <User
          key={currentGuild + "-" + id}
          userid={id}
          username={guildMembers[id]?.userInfo.name}
          userImageId={guildMembers[id]?.userInfo.imageId}
          owner={guildMembers[id]?.owner}
          admin={guildMembers[id]?.admin}
        />
      ))}
    </div>
  );
};

export default UserList;
