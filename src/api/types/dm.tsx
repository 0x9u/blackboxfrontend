import { UnreadMsg } from "./msg";
import { User } from "./user";

export interface Dm {
    DmId: number;
    Unread : UnreadMsg;
    UserInfo : User;
}