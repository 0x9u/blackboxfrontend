import React, { FC } from "react";
import Button from "../buttonComponent";
import Input from "../inputComponent";
import Modal from "../modal/modalComponent";

import { useSelector } from "react-redux";
import { setShowCreateInviteModal } from "../../app/slices/clientSlice";
import { RootState, useAppDispatch } from "../../app/store";
import { useGetGuildInvites } from "../../api/hooks/guildHooks";
import { createGuildInvite } from "../../api/guildApi";

const InviteModal: FC = () => {
  const dispatch = useAppDispatch();

  const currentGuild = useSelector(
    (state: RootState) => state.client.currentGuild
  );

  const { guildInvites, loaded } = useGetGuildInvites();

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
          value={!loaded ? "Loading..." : guildInvites[guildInvites.length - 1]?.invite ?? "No Invite"}
          dark
          copyButton
        />
        <Button
          value="Generate"
          type="button"
          className="self-end"
          onClick={() => dispatch(createGuildInvite(currentGuild ?? ""))}
        />
      </div>
    </Modal>
  );
};

export default InviteModal;
