import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useGetGuildMembersQuery } from "../../api/guildApi";
import { RootState } from "../../app/store";
import { SkeletonLoaderUserList } from "../skeletonLoaderComponent";
import User from "./userComponent";

const UserList: FC = () => {
  const currentGuild = useSelector(
    (state: RootState) => state.client.currentGuild
  );

  const isMembersLoaded = useSelector((state: RootState) => {
    const guild = state.client.guildLoaded[currentGuild ?? ""];
    if (guild == undefined) {
      return false;
    }
    return guild.members;
  }); //worst code of all time right here

  const { isLoading } = useGetGuildMembersQuery(currentGuild ?? "", {
    skip: isMembersLoaded,
  });

  const currentOwner = useSelector(
    (state: RootState) => state.guild.guilds[currentGuild ?? ""]?.ownerId ?? ""
  );

  const adminIds = useSelector(
    (state: RootState) => state.user.guildAdminIds[currentGuild ?? ""] ?? []
  );

  const members = useSelector((state: RootState) => {
    var members = [];
    const guildMemberIds = state.user.guildMembersIds[currentGuild ?? ""] ?? [];
    for (const memberId of guildMemberIds) {
      const member = state.user.users[memberId];
      if (member) {
        members.push(member);
      }
    }
    return members;
  });

  return (
    <div className="list-scrollbar relative flex h-full w-64 shrink-0 flex-col space-y-2 overflow-y-auto bg-shade-3 py-2">
      {isLoading && <SkeletonLoaderUserList/>}
      {members.map((member, index) => (
        <User
          key={currentGuild + "-" + member.id}
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
