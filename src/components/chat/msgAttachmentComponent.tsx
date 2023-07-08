import React, { FC } from "react";
import { Attachment } from "../../api/types/msg";
import { MdDownload } from "react-icons/md";

interface msgAttachmentProps {
  attachments?: Attachment[];
  loading?: boolean;
}

const MsgAttachment: FC<msgAttachmentProps> = ({ attachments, loading }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {attachments?.map((attachment) => {
        const type = attachment.type.split("/")[0];
        return type === "image" ? (
          <img
            key={attachment.id}
            src={`http://localhost:8080/api/files/msg/${attachment.id}`}
          ></img>
        ) : type === "video" ? (
          <video controls className="max-w-96 max-h-96" key={attachment.id}>
            <source
              src={`http://localhost:8080/api/files/msg/${attachment.id}`}
              type={attachment.type}
            ></source>
          </video>
        ) : type === "audio" ? (
          <audio controls key={attachment.id}>
            <source
              src={`http://localhost:8080/api/files/msg/${attachment.id}`}
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
              href={`http://localhost:8080/api/files/msg/${attachment.id}`}
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
