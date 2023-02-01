import { UnreadMsg } from "./msg";
import {User} from "./user";

export interface UserGuild {
    GuildId : number;
    UserId : number;
    UserData : User;
};

export interface Guild {
    GuildId : number;
    Name : string;
    Icon : number;
    Unread : UnreadMsg;
    SaveChat : boolean;
};

export interface Invite {
    Invite : string;
    GuildId : number;
};
