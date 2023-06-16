import React, { FC } from "react";
import Button from "../buttonComponent";
import Modal from "../modal/modalComponent";
import { useAppDispatch } from "../../app/store";
import { setShowCooldownModal } from "../../app/slices/clientSlice";
import ModalBottom from "../modal/modalBottomComponent";

const CooldownModal: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Modal
      title={"You are on cooldown!"}
      exitFunc={() => {
        dispatch(setShowCooldownModal(false));
      }}
    >
      <div className="flex flex-row space-x-4">
        <p>You are on cooldown! Please wait 10 seconds before typing again</p>
      </div>
      <ModalBottom>
        <Button
          type="button"
          value="Ok"
          onClick={() => {
            dispatch(setShowCooldownModal(false));
          }}
        />
      </ModalBottom>
    </Modal>
  );
};

export default CooldownModal;
