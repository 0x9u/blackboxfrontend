import React, { FC } from "react";
import { useSelector } from "react-redux";
import { unbanGuildMember } from "../../../api/guildApi";
import { Member, User } from "../../../api/types/user";
import { RootState } from "../../../app/store";
import Button from "../../buttonComponent";
import { useGetGuildBannedMembers } from "../../../api/hooks/guildHooks";

const BansGuildSettings: FC = () => {
  const { currentGuild, guildBannedMembers, loaded } =
    useGetGuildBannedMembers();

  return (
    <div>
      <h1 className="mb-5 text-2xl text-white">Bans</h1>
      <div className="flex h-96 flex-col border-b-2 border-t-2 border-gray p-2 text-white">
        <div className="col mb-2 flex flex-row justify-between text-lg font-medium">
          <p>Name</p>
        </div>
        <div className="h-full w-full space-y-2 overflow-auto">
          {!loaded ? (
            <div className="text-white">loading</div>
          ) : (
            guildBannedMembers.map((bannedMember: Member) => (
              <div
                className="text-md flex flex-row justify-between"
                key={currentGuild + "-" + bannedMember.userInfo.id}
              >
                <div className="flex flex-row space-x-2">
                  <div className="h-10 w-10 rounded-full border-2 border-black"></div>
                  <p className="m-auto text-lg text-white/75">
                    {bannedMember.userInfo.name}
                  </p>
                </div>
                <div className="flex flex-row space-x-2">
                  <Button
                    value="Unban"
                    type="button"
                    className="m-auto h-8 w-16 px-0"
                    onClick={() =>
                      unbanGuildMember({
                        id: currentGuild || "",
                        userId: bannedMember.userInfo.id,
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
