export interface User {
    UserId : number;
    Name : string;
    Email : string;
    Icon : number;
    Flags : number;
}

export interface Member {
    GuildId : number;
    UserInfo : User;
}