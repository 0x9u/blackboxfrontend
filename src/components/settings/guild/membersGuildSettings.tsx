import React, { FC } from "react";
import { useSelector } from "react-redux";
import {
  useDeleteGuildAdminMutation,
  useDeleteGuildMemberMutation,
  useGetGuildMembersQuery,
  useMakeOwnerMutation,
  usePutGuildAdminMutation,
  usePutGuildBanMutation,
} from "../../../api/guildApi";
import { User } from "../../../api/types/user";
import { RootState } from "../../../app/store";
import Button from "../../buttonComponent";

const MembersGuildSettings: FC = () => {
  const currentGuild = useSelector(
    (state: RootState) => state.client.currentGuild
  );
  const currentOwner = useSelector(
    (state: RootState) => state.guild.guilds[currentGuild || ""]?.ownerId ?? ""
  );
  const selfUserId = useSelector(
    (state: RootState) => state.user.selfUser ?? ""
  );

  const adminIds = useSelector(
    (state: RootState) =>
      state.user.guildAdminIds[currentGuild || ""] ?? new Set()
  );
  const members = useSelector((state: RootState) => {
    var members: User[] = [];
    const memberIds = state.user.guildMembersIds[currentGuild || ""] ?? [];
    for (const memberId of memberIds) {
      if (!state.user.users[memberId]) {
        continue;
      }
      members.push(state.user.users[memberId]);
    }
    return members;
  });

  const [makeAdmin] = usePutGuildAdminMutation();
  const [removeAdmin] = useDeleteGuildAdminMutation();
  const [makeOwner] = useMakeOwnerMutation();
  const [banUser] = usePutGuildBanMutation();
  const [kickUser] = useDeleteGuildMemberMutation();

  return (
    <div>
      <h1 className="mb-5 text-2xl text-white">Members</h1>
      <div className="flex h-96 flex-col border-b-2 border-t-2 border-gray p-2 text-white">
        <div className="col mb-2 flex flex-row justify-between text-lg font-medium">
          <p>Name</p>
          <p className="mr-6">Actions</p>
        </div>
        <div className="h-full w-full space-y-2 overflow-auto">
          {members.map((user) => (
            <div
              className="text-md flex flex-row justify-between"
              key={`${currentGuild}-${user.id}`}
            >
              <div className="flex flex-row space-x-2">
                <img
                  className="h-10 w-10 rounded-full border-2 border-black"
                  src={
                    user.imageId !== "-1"
                      ? `http://localhost:8080/api/files/user/${user.imageId}`
                      : "./blackboxuser.jpg"
                  }
                ></img>
                <p className="m-auto text-lg text-white/75">
                  {user.name}
                  {user.id === currentOwner
                    ? "👑"
                    : adminIds.includes(user.id)
                    ? "🛡️"
                    : ""}
                </p>
              </div>
              <div className="flex flex-row space-x-2">
                {user.id !== currentOwner &&
                  !adminIds.includes(user.id) &&
                  currentOwner === selfUserId && (
                    <Button
                      value="Make Admin"
                      type="button"
                      className="m-auto h-8 w-28 px-0"
                      onClick={() =>
                        makeAdmin({ id: currentGuild || "", userId: user.id })
                      }
                    />
                  )}
                {user.id !== currentOwner &&
                  adminIds.includes(user.id) &&
                  currentOwner === selfUserId && (
                    <Button
                      value="Remove Admin"
                      type="button"
                      className="m-auto h-8 w-32 px-0"
                      onClick={() =>
                        removeAdmin({
                          id: currentGuild || "",
                          userId: user.id,
                        })
                      }
                    />
                  )}
                {user.id !== currentOwner && currentOwner === selfUserId && (
                  <Button
                    value="Make Owner"
                    type="button"
                    className="m-auto h-8 w-28 px-0"
                    onClick={() =>
                      makeOwner({ id: currentGuild || "", userId: user.id })
                    }
                  />
                )}
                {user.id !== currentOwner &&
                  (!adminIds.includes(user.id) ||
                    currentOwner === selfUserId) && (
                    <Button
                      value="Kick"
                      type="button"
                      gray
                      className="m-auto h-8 w-12 px-0"
                      onClick={() =>
                        kickUser({ id: currentGuild || "", userId: user.id })
                      }
                    />
                  )}
                {user.id !== currentOwner &&
                  (!adminIds.includes(user.id) ||
                    currentOwner === selfUserId) && (
                    <Button
                      value="Ban"
                      type="button"
                      className="m-auto h-8 w-12 px-0"
                      onClick={() =>
                        banUser({ id: currentGuild || "", userId: user.id })
                      }
                    />
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersGuildSettings;
