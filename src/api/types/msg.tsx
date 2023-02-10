import { User } from './user';

export interface UnreadMsg {
    Id : number;
    Count : number;
    Time : number;
};

export interface Msg {
    MsgId : number;
    Author : User;
    GuildId : number;
    DmId : number;
    Content : string;
    Created : number;
    Modified : number;
    MsgSaved : boolean;
    RequestId : string; //we randomize up to 5 char
};