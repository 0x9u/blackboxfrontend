import { asyncThunkAPI, requestAPI } from "./api";

export interface AuthRes {
  token: string;
  expires: number;
}

export interface RegisterReq {
  name: string;
  password: string;
  email: string;
  image: File | null;
}

export interface LoginReq {
  name: string;
  password: string;
}

export const postAuth = asyncThunkAPI<AuthRes, LoginReq>(
  "auth/postAuth",
  async (body: LoginReq, thunkAPI) => {
    return await requestAPI<AuthRes>("POST", "/users/auth", body, thunkAPI);
  }
);

export const createAccount = asyncThunkAPI<AuthRes, RegisterReq>(
  "auth/createAccount",
  async (body: RegisterReq, thunkAPI) => {
    if (body.image !== null) {
      console.log("image provided in register")
      const formData = new FormData();
      formData.append("body", JSON.stringify(body));
      const data = new Blob([body!.image], { type: body!.image.type });
      formData.append("image", data, body.image.name);
      return await requestAPI<AuthRes>("POST", "/users/", formData, thunkAPI);
    } else {
      const sentBody: Omit<RegisterReq, "image"> = {
        name: body.name,
        password: body.password,
        email: body.email,
      };
      return await requestAPI<AuthRes>("POST", "/users/", sentBody, thunkAPI);
    }
  }
);
