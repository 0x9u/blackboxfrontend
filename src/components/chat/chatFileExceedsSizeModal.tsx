import React, { FC } from "react";
import Button from "../buttonComponent";
import Modal from "../modal/modalComponent";
import { useAppDispatch } from "../../app/store";
import { setShowFileExceedsSizeModal } from "../../app/slices/clientSlice";
import ModalBottom from "../modal/modalBottomComponent";

const FileExceedsSizeModal: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Modal
      title={"Attachment exceeds 15 MB"}
      exitFunc={() => {
        dispatch(setShowFileExceedsSizeModal(false));
      }}
    >
      <div className="flex flex-row space-x-4">
        <p>Please upload a file less than 15MB</p>
      </div>
      <ModalBottom>
        <Button
          type="button"
          value="Ok"
          onClick={() => {
            dispatch(setShowFileExceedsSizeModal(false));
          }}
        />
      </ModalBottom>
    </Modal>
  );
};

export default FileExceedsSizeModal;
