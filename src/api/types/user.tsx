export interface User {
    id : number;
    name : string;
    email : string;
    imageId : number;
    flags : number;
    options : number;
}

export interface Member {
    guildId : number;
    userInfo : User;
}

export interface FriendRequest {
    requested : User[];
    pending : User[];
}