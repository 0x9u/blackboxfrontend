import React, { FC, useState } from "react";
import { Attachment } from "../../api/types/msg";
import { MdDownload } from "react-icons/md";

interface msgAttachmentProps {
  attachments?: Attachment[];
}

const MsgAttachment: FC<msgAttachmentProps> = ({ attachments }) => {
  const [imageError, setImageError] = useState<boolean>(false);
  return (
    <div className="flex flex-wrap gap-4">
      {attachments?.map((attachment) => {
        const type = attachment.type.split("/")[0];
        return imageError ? (
          <div className="flex h-32 w-32 items-center justify-center rounded-sm bg-shade-2 text-white">
            <p className="text-center">Failed to load attachment</p>
          </div>
        ) : type === "image" ? (
          <img
            key={attachment.id}
            src={`${import.meta.env.VITE_API_ENDPOINT}/files/msg/${
              attachment.id
            }`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              setImageError(true);
            }}
          ></img>
        ) : type === "video" ? (
          <video
            controls
            className="max-w-96 max-h-96"
            key={attachment.id}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              setImageError(true);
            }}
          >
            <source
              src={`${import.meta.env.VITE_API_ENDPOINT}/files/msg/${
                attachment.id
              }`}
              type={attachment.type}
            ></source>
          </video>
        ) : type === "audio" ? (
          <audio
            controls
            key={attachment.id}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              setImageError(true);
            }}
          >
            <source
              src={`${import.meta.env.VITE_API_ENDPOINT}/files/msg/${
                attachment.id
              }`}
              type={attachment.type}
            ></source>
          </audio>
        ) : (
          <div
            key={attachment.id}
            className="flex flex-row items-center space-x-2 rounded-sm bg-shade-2 p-4 py-1"
          >
            <p className="text-white">{attachment.filename}</p>
            <a
              href={`${import.meta.env.VITE_API_ENDPOINT}/files/msg/${
                attachment.id
              }`}
              target="_blank"
              download
            >
              <MdDownload className="h-5 w-5 text-white/90 hover:text-white/75" />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default MsgAttachment;