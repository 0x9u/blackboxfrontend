import React, { FC } from "react";
import Button from "../buttonComponent";
import Modal from "../modal/modalComponent";
import { useAppDispatch } from "../../app/store";
import { setShowUserBlockedModal } from "../../app/slices/clientSlice";
import ModalBottom from "../modal/modalBottomComponent";

const UserBlockedModal: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Modal
      title={"Blocked"}
      exitFunc={() => {
        dispatch(setShowUserBlockedModal(false));
      }}
    >
      <div className="flex flex-row space-x-4">
        <p>User is blocked or User has blocked you</p>
      </div>
      <ModalBottom>
        <Button
          type="button"
          value="Ok"
          onClick={() => {
            dispatch(setShowUserBlockedModal(false));
          }}
        />
      </ModalBottom>
    </Modal>
  );
};

export default UserBlockedModal;
