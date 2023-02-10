import { UnreadMsg } from "./msg";
import { User } from "./user";

export interface DmUser {
    DmId: number;
    Unread : UnreadMsg;
    UserInfo : User;
}

export interface Dm {
    DmId: number;
    Unread : UnreadMsg;
    UserId : number;
}