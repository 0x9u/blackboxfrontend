import { User } from './user';

export interface UnreadMsg {
    id : number;
    count : number;
    time : number;
};


export interface Attachment {
    id : number;
    filename : string;
}

export interface Msg {
    id : number;
    author : User;
    guildId : number;
    dmId : number;
    content : string;
    created : number;
    modified : number;
    msgSaved : boolean;
    requestId : string; //we randomize up to 5 char
    attachments : Attachment[];
};