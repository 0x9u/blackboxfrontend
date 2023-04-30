import React, { FC } from "react";
import Button from "../buttonComponent";
import Input from "../inputComponent";
import Modal from "../modal/modalComponent";

import { useDispatch, useSelector } from "react-redux";
import { setShowCreateInviteModal } from "../../app/slices/clientSlice";
import {
  useGetGuildInvitesQuery,
  usePostGuildInviteMutation,
} from "../../api/guildApi";
import { RootState } from "../../app/store";

const InviteModal: FC = () => {
  const dispatch = useDispatch();

  const currentGuild = useSelector(
    (state: RootState) => state.client.currentGuild
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


  const invites = useSelector(
    (state: RootState) => state.guild.invites[currentGuild ?? ""] ?? []
  );


  const [createInvite] = usePostGuildInviteMutation();

  return (
    <Modal
      title={"Create Invite"}
      exitFunc={() => {
        dispatch(setShowCreateInviteModal(false));
      }}
    >
      <div className="flex flex-row space-x-4">
        <Input
          label="Invite Code"
          value={invites[invites.length - 1]?.invite ?? "No Invite"}
          dark
          copyButton
        />
        <Button value="Generate" type="button" className="self-end" onClick={() => createInvite(currentGuild ?? "")} />
      </div>
    </Modal>
  );
};

export default InviteModal;
