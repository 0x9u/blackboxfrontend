import React, { FC } from "react";
import { useSelector } from "react-redux";
import {
  useDeleteGuildBanMutation,
  useGetGuildBansQuery,
} from "../../../api/guildApi";
import { User } from "../../../api/types/user";
import { RootState } from "../../../app/store";
import Button from "../../buttonComponent";

const BansGuildSettings: FC = () => {
  const currentGuild = useSelector(
    (state: RootState) => state.client.currentGuild
  );

  const isBannedLoaded = useSelector((state: RootState) => {
    const guild = state.client.guildLoaded[currentGuild ?? ""];
    if (guild == undefined) {
      return false;
    }
    return guild.banned;
  });

  const { isLoading } = useGetGuildBansQuery(currentGuild ?? "", {
    skip: isBannedLoaded,
  });

  const bannedMembers = useSelector((state: RootState) => {
    var bannedMembers: User[] = [];
    const bannedMembersIds =
      state.user.guildBannedIds[currentGuild || ""] ?? [];
    for (const bannedMemberId of bannedMembersIds) {
      const bannedMember = state.user.users[bannedMemberId];
      if (bannedMember) {
        bannedMembers.push(bannedMember);
      }
    }
    return bannedMembers;
  });

  const [unbanUser] = useDeleteGuildBanMutation();

  return (
    <div>
      <h1 className="mb-5 text-2xl text-white">Bans</h1>
      <div className="flex h-96 flex-col border-b-2 border-t-2 border-gray p-2 text-white">
        <div className="col mb-2 flex flex-row justify-between text-lg font-medium">
          <p>Name</p>
        </div>
        <div className="h-full w-full space-y-2 overflow-auto">
          {isLoading ? (
            <div className="text-white">loading</div>
          ) : (
            bannedMembers.map((bannedMember) => (
              <div
                className="text-md flex flex-row justify-between"
                key={currentGuild + "-" + bannedMember.id}
              >
                <div className="flex flex-row space-x-2">
                  <div className="h-10 w-10 rounded-full border-2 border-black"></div>
                  <p className="m-auto text-lg text-white/75">
                    {bannedMember.name}
                  </p>
                </div>
                <div className="flex flex-row space-x-2">
                  <Button
                    value="Unban"
                    type="button"
                    className="m-auto h-8 w-16 px-0"
                    onClick={() =>
                      unbanUser({
                        id: currentGuild || "",
                        userId: bannedMember.id,
                      })
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BansGuildSettings;
