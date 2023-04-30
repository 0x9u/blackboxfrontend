import { UnreadMsg } from "./msg";
import { User } from "./user";

export interface Dm {
    id: string;
    unread : UnreadMsg;
    userInfo : User;
}

export interface DmUser {
    id : string;
    unread : UnreadMsg;
    userId : string;
}