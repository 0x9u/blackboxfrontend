import React, { FC } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  useDeleteGuildInviteMutation,
  useGetGuildInvitesQuery,
} from "../../../api/guildApi";
import { RootState } from "../../../app/store";

const InvitesGuildSettings: FC = () => {
  const currentGuild = useSelector(
    (state: RootState) => state.client.currentGuild
  );
  const invites = useSelector(
    (state: RootState) => state.guild.invites[currentGuild || ""] ?? []
  );
  const isInvitesLoaded = useSelector((state: RootState) => {
    const guild = state.client.guildLoaded[currentGuild ?? ""];
    if (guild == undefined) {
      return false;
    }
    return guild.invites;
  });

  const { isLoading } = useGetGuildInvitesQuery(currentGuild ?? "", {
    skip: isInvitesLoaded,
  });
  const [deleteInvite] = useDeleteGuildInviteMutation();
  return (
    <div>
      <h1 className="mb-5 text-2xl text-white">Invites</h1>
      <div className="flex h-96 flex-col border-b-2 border-t-2 border-gray p-2 text-white">
        <div className="col mb-2 flex flex-row justify-between text-lg font-medium">
          <p>Invite Code</p>
          {/*<p className="mr-8">Created By</p>*/}
        </div>
        <div className="h-full w-full space-y-2 overflow-auto">
          {isLoading ? 
          <div className="text-white">loading</div>
          :invites.map((invite) => (
            <div className="text-md flex flex-row justify-between" key={currentGuild+"-"+invite.invite}>
              <p className="text-white/75">{invite.invite}</p>
              <div className="flex flex-row space-x-2">
                {/*
                  <div className="h-8 w-8 rounded-full border-2 border-black"></div>
                  <p className="m-auto">Bob</p>*/}
                <MdDelete
                  className="h-8 w-8 cursor-pointer hover:text-white/75 active:text-white/50"
                  onClick={() =>
                    deleteInvite({
                      id: currentGuild || "",
                      invite: invite.invite,
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvitesGuildSettings;
