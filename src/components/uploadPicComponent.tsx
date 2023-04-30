import React, { FC, useState, Ref } from "react";
import { UseFormRegisterReturn } from "react-hook-form/dist/types";

import { MdUpload, MdCameraAlt } from "react-icons/md";

interface uploadPicProps {
  width: string;
  height: string;
  register?: UseFormRegisterReturn<any>;
  dark?: boolean;
  url?: string;
}

const UploadPic: FC<uploadPicProps> = ({
  width,
  height,
  register,
  dark,
  url,
}) => {
  //  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const photoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files![0];
    console.log(file.name);
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/gif"
    ) {
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    register?.onChange(e);
  };
  return (
    <div
      className={`relative rounded-full border-2 w-${width} h-${height} overflow-hidden`}
    >
      <input
        id="image-upload"
        type="file"
        className="hidden"
        {...register}
        onChange={photoUpload}
      />
      <img
        src={preview ?? url}
        className={`absolute inset-0 h-full w-full object-fill object-center ${
          !(preview || url) ? "mix-blend-multiply" : ""
        }`}
      />
      {!(preview || url) && (
        <div
          className={`absolute inset-0 flex flex-row items-center justify-center space-x-2 text-lg ${
            dark ? "text-white/95" : "text-black"
          }`}
        >
          <p>Upload</p>
          <MdCameraAlt />
        </div>
      )}
      <label
        htmlFor="image-upload"
        className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-white opacity-0 duration-300 ease-in-out hover:opacity-100 "
      >
        <MdUpload className="h-[75%] w-[75%]" />
      </label>
    </div>
  );
};

export default UploadPic;
