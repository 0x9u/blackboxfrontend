import React, { FC } from "react";
import { Upload } from "../../api/types/msg";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface msgLoadingAttachmentProps {
  uploadIds?: string[];
}

const MsgLoadingAttachment: FC<msgLoadingAttachmentProps> = ({ uploadIds }) => {
  const uploads = useSelector((state: RootState) => {
    const uploadsList: Upload[] = [];
    for (const uploadId of uploadIds ?? []) {
      const upload = state.client.uploadData[uploadId];
      uploadsList.push(upload);
    }
    return uploadsList;
  });
  return (
    <div className="flex flex-wrap gap-4">
      {uploads?.map((upload) => {
        const type = upload.type.split("/")[0];
        return (
          <div className="text-white">
            Upload Progress: {upload.progress}
            {type === "image" ? (
              <img key={upload.id} src={upload.dataURL}></img>
            ) : type === "video" ? (
              <video controls className="max-w-96 max-h-96" key={upload.id}>
                <source src={upload.dataURL} type={upload.type}></source>
              </video>
            ) : type === "audio" ? (
              <audio controls key={upload.id}>
                <source src={upload.dataURL} type={upload.type}></source>
              </audio>
            ) : (
              <div
                key={upload.id}
                className="flex flex-row items-center space-x-2 rounded-sm bg-shade-2 p-4 py-1"
              >
                <p className="text-white">{upload.filename}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MsgLoadingAttachment;
