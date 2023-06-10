export interface User {
  id: string;
  name: string;
  email: string;
  imageId: string;
  flags: number;
  options: number;
  permissions?: Permissions;
}

export interface EditUserPasswordForm {
  password: string;
  newPassword: string;
}

export interface EditUserEmailForm {
  email: string;
  password: string;
}

export interface EditUserNameForm {
  username: string;
  password: string;
}

export interface EditUserPictureForm {
  image: File;
  password: string;
}

export interface Member {
  guildId: string;
  userInfo: User;
  admin: boolean;
  owner: boolean;
}

export interface FriendRequest {
  requested: User[];
  pending: User[];
}

export interface Permissions {
  guild: {
    delete: boolean;
    edit: boolean;
    get: boolean;
  };
  user: {
    delete: boolean;
    edit: boolean;
    get: boolean;
  };
  banIP: boolean;
  admin: boolean;
}
