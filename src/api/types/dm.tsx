import { UnreadMsg } from "./msg";
import { User } from "./user";

export interface Dm {
    id: number;
    unread : UnreadMsg;
    userInfo : User;
}

export interface DmUser {
    id : number;
    unread : UnreadMsg;
    userId : number;
}