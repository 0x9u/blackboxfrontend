import React, { FC, useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form/dist/types";

import Modal from "./modal/modalComponent";
import CropPic from "./cropPicComponent";

interface cropImageModalProps {
  exitFunc: () => void;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
}

const CropImageModal: FC<cropImageModalProps> = ({
  exitFunc,
  getValues,
  setValue,
}) => {
  return (
    <Modal title="Crop Image" noExit>
      <CropPic setValue={setValue} getValues={getValues} onFinish={exitFunc} />
    </Modal>
  );
};

export default CropImageModal;
