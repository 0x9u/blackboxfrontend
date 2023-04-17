import { UnreadMsg } from "./msg";
import {User} from "./user";

export interface UserGuild {
    guildId : number;
    userId : number;
    userData : User;
};

export interface Guild {
    id : number;
    name : string;
    imageId : number;
    unread : UnreadMsg;
    saveChat : boolean;
};

export interface Invite {
    guildId : number;
    invite: string;
}