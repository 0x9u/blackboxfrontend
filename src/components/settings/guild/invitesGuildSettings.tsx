import React, { FC } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../app/store";
import { deleteGuildInvite } from "../../../api/guildApi";
import { useGetGuildInvites } from "../../../api/hooks/guildHooks";

const InvitesGuildSettings: FC = () => {
  const dispatch = useAppDispatch();

  const { currentGuild, guildInvites, loaded } = useGetGuildInvites();

  return (
    <div>
      <h1 className="mb-5 text-2xl text-white">Invites</h1>
      <div className="flex h-96 flex-col border-b-2 border-t-2 border-gray p-2 text-white">
        <div className="col mb-2 flex flex-row justify-between text-lg font-medium">
          <p>Invite Code</p>
        </div>
        <div className="h-full w-full space-y-2 overflow-auto">
          {!loaded ? (
            <div className="text-white">loading</div>
          ) : (
            guildInvites.map((invite) => (
              <div
                className="text-md flex flex-row justify-between"
                key={currentGuild + "-" + invite.invite}
              >
                <p className="text-white/75">{invite.invite}</p>
                <div className="flex flex-row space-x-2">
                  <MdDelete
                    className="h-8 w-8 cursor-pointer hover:text-white/75 active:text-white/50"
                    onClick={() =>
                      dispatch(
                        deleteGuildInvite({
                          id: currentGuild || "",
                          inviteId: invite.invite,
                        })
                      )
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

export default InvitesGuildSettings;
