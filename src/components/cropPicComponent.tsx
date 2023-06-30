import React, { FC, useState, useEffect, useRef } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import "@pqina/pintura/pintura.css";
import {
  PinturaDefaultImageWriterResult,
  getEditorDefaults,
} from "@pqina/pintura";
import { PinturaEditor } from "@pqina/react-pintura";

interface cropPicProps {
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  onFinish?: () => void;
}

const editorConfig = getEditorDefaults({
  imageWriter: {
    targetSize: {
      width: 128,
      height: 128,
    },
  },
  imageCropMinSize: {
    width: 128,
    height: 128,
  },
  imageCropMaxSize: {
    width: 1024,
    height: 1024,
  },
});

const CropPic: FC<cropPicProps> = ({ getValues, setValue, onFinish }) => {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    //temp - worst code of all time
    const reader = new FileReader();
    const file = getValues("picture")![0];
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImage(reader.result as string);
    };
  }, [getValues]);

  const handleEditorProcess = (imageState: PinturaDefaultImageWriterResult) => {
    setValue("picture", [imageState.dest]);
    onFinish?.();
  };

  return (
    <div className="flex h-96 w-96 flex-row">
      <PinturaEditor
        className="h-full w-full"
        {...editorConfig}
        src={image}
        imageCropAspectRatio={1}
        onProcess={handleEditorProcess}
      ></PinturaEditor>
    </div>
  );
};

export default CropPic;
