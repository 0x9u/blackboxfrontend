import React, { FC, useState } from "react";
import Button from "../buttonComponent";
import CheckBox from "../checkBoxComponent";
import Input from "../inputComponent";
import Modal from "../modal/modalComponent";
import ModalBottom from "../modal/modalBottomComponent";
import UploadPic from "../uploadPicComponent";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  setShowAddChatModal,
  setShowCreateInviteModal,
} from "../../app/slices/clientSlice";

const InviteModal: FC = () => {
  const dispatch = useDispatch();

  return (
    <Modal
      title={"Create Invite"}
      exitFunc={() => {
        dispatch(setShowCreateInviteModal(false));
      }}
    >
      <div className="flex flex-row space-x-4">
        <Input label="Invite Code" value="123" dark />
        <Button value="Generate" type="button" className="self-end"/>
      </div>
    </Modal>
  );
};

export default InviteModal;
