import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { SkeletonLoaderUserList } from "../skeletonLoaderComponent";
import User from "./userComponent";
import { useGetGuildMembers } from "../../api/hooks/guildHooks";

const UserList: FC = () => {
  const { currentGuild, guildMembers, loaded } = useGetGuildMembers();

  const currentOwner = useSelector(
    (state: RootState) => state.guild.guilds[currentGuild ?? ""]?.ownerId ?? ""
  );

  const adminIds = useSelector(
    (state: RootState) => state.user.guildAdminIds[currentGuild ?? ""] ?? []
  );

  return (
    <div className="list-scrollbar relative flex h-full w-64 shrink-0 flex-col space-y-2 overflow-y-auto bg-shade-3 py-2">
      {!loaded && <SkeletonLoaderUserList />}
      {guildMembers.map(({ userInfo: member }) => (
        <User
          key={currentGuild + "-" + member.id}
          userid={member.id}
          username={member.name}
          userImageId={member.imageId}
          owner={member.id === currentOwner}
          admin={adminIds.includes(member.id)}
        />
      ))}
    </div>
  );
};

export default UserList;
