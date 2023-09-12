import { User } from "./user";

export interface UnreadMsg {
  id: string;
  count: number;
  time: string;
  mentions: number;
}

export interface Attachment {
  id: string;
  filename: string;
  type: string;
}

/*
export interface Upload {
  id: string;
  filename: string;
  dataURL: string;
  type: string;
  progress: number;
}
*/

export interface AttachmentUpload {
  filename: string;
  base64: string; //base64 encoded string
}

export interface Msg {
  id: string;
  author: User;
  guildId: string;
  content: string;
  created: string;
  modified: string;
  msgSaved: boolean;
  requestId: string; //{AUTHOR_ID}-{MSG_ID}
  attachments: Attachment[];
  mentions: User[];
  mentionsEveryone: boolean;
  failed?: boolean;
  loading?: boolean;
}
