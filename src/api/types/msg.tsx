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
}

export interface Msg {
  id: string;
  author: User;
  guildId: string;
  dmId: string;
  content: string;
  created: string;
  modified: string;
  msgSaved: boolean;
  requestId: string; //we randomize up to 5 char
  attachments: Attachment[];
  mentions : User[];
  mentionsEveryone : boolean;
}
