import { useState, useEffect } from "react";
import { isFulfilled, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import { RootState, useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import {
  EditUserEmailForm,
  EditUserNameForm,
  EditUserPasswordForm,
  EditUserPictureForm,
  User,
} from "../types/user";
import {
  editUserEmail,
  editUserName,
  editUserPassword,
  editUserPicture,
  getBlocked,
  getFriends,
  getGuilds,
  getRequestedFriends,
  getSelf,
  sendFriendRequest,
  sendFriendRequestById,
} from "../userApi";
import { ErrorBody } from "../types/error";
import { Guild } from "../types/guild";
import { DmUser } from "../types/dm";

export const useEditUserEmail = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<ErrorBody | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "finished" | "failed"
  >("idle");
  const isAFulfilledAction = isFulfilled(editUserEmail);

  const callFunction = async (data: EditUserEmailForm) => {
    setStatus("loading");
    const result = await dispatch(editUserEmail(data));
    if (isAFulfilledAction(editUserEmail)) {
      //less goooooo
      console.log("Success");
      setStatus("finished");
      setError(null);
    } else {
      console.log("Failure");
      setStatus("failed");
      setError(result.payload ?? null);
    }
  };
  return { callFunction, error, status };
};

export const useEditUserPassword = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<ErrorBody | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "finished" | "failed"
  >("idle");
  const isAFulfilledAction = isFulfilled(editUserPassword);

  const callFunction = async (data: EditUserPasswordForm) => {
    setStatus("loading");
    const result = await dispatch(editUserPassword(data));
    if (isAFulfilledAction(editUserPassword)) {
      //less goooooo
      console.log("Success");
      setStatus("finished");
      setError(null);
    } else {
      console.log("Failure");
      setStatus("failed");
      setError(result.payload ?? null);
    }
  };
  return { callFunction, error, status };
};

export const useEditUserPicture = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<ErrorBody | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "finished" | "failed"
  >("idle");
  const isAFulfilledAction = isFulfilled(editUserPicture);

  const callFunction = async (data: EditUserPictureForm) => {
    setStatus("loading");
    const result = await dispatch(editUserPicture(data));

    if (isAFulfilledAction(editUserPicture)) {
      console.log("Success");
      setStatus("finished");
      setError(null);
    } else {
      console.log("Failure");
      setStatus("failed");
      setError(result.payload ?? null);
    }
  };
  return { callFunction, error, status };
};

export const useEditUserName = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<ErrorBody | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "finished" | "failed"
  >("idle");
  const isAFulfilledAction = isFulfilled(editUserName);

  const callFunction = async (data: EditUserNameForm) => {
    setStatus("loading");
    const result = await dispatch(editUserName(data));
    if (isAFulfilledAction(editUserName)) {
      //less goooooo
      console.log("Success");
      setStatus("finished");
      setError(null);
    } else {
      console.log("Failure");
      setStatus("failed");
      setError(result.payload ?? null);
    }
  };
  return { callFunction, error, status };
};

export const useGetSelfQuery = () => {
  const dispatch = useAppDispatch();

  const { userInfo, loaded } = useSelector((state: RootState) => ({
    userInfo:
      state.user.users[state.user.selfUser || ""] ??
      ({
        name: "Unavailable",
        imageId: "-1",
        email: "Unavailable",
        id: "-1",
      } as User),
    loaded: state.client.userSelfLoaded,
  }));
  useEffect(() => {
    if (!loaded) dispatch(getSelf());
  }, [dispatch, loaded]);

  return { userInfo, loaded };
};

export const useGetGuildDms = () => {
  const dispatch = useAppDispatch();
  const contents = useSelector((state: RootState) => ({
    guilds:
      state.guild.guildIds.map((id: string) => state.guild.guilds[id]) ??
      ([] as Guild[]),
    dms:
      state.guild.dmIds.map((id: string) => state.guild.dms[id]) ??
      ([] as DmUser[]),
    loaded: state.client.guildListLoaded,
    currentDM: state.client.currentDM,
    currentGuild: state.client.currentGuild,
    currentChatMode: state.client.currentChatMode,
    users: state.user.users,
  }));
  useEffect(() => {
    if (!contents.loaded) dispatch(getGuilds());
  }, [dispatch, contents.loaded]);
  return contents;
};

export const useGetFriendList = () => {
  const dispatch = useAppDispatch();
  const contents = useSelector((state: RootState) => ({
    friends: state.user.friendIds.map((id: string) => state.user.users[id]),
    loaded: state.client.friendListLoaded,
  }));
  useEffect(() => {
    if (!contents.loaded) dispatch(getFriends());
  }, [dispatch, contents.loaded]);
  return contents;
};

export const useGetRequestedFriendList = () => {
  const dispatch = useAppDispatch();
  const contents = useSelector((state: RootState) => ({
    requestedFriends: state.user.requestedFriendIds.map(
      (id: string) => state.user.users[id]
    ),
    pendingFriends: state.user.pendingFriendIds.map(
      (id: string) => state.user.users[id]
    ),
    loaded: state.client.requestedFriendListLoaded,
  }));
  useEffect(() => {
    if (!contents.loaded) dispatch(getRequestedFriends());
  }, [dispatch, contents.loaded]);
  return contents;
};

export const useGetBlockedList = () => {
  const dispatch = useAppDispatch();
  const contents = useSelector((state: RootState) => ({
    blockedList: state.user.blockedIds.map(
      (id: string) => state.user.users[id]
    ),
    loaded: state.client.blockedListLoaded,
  }));
  useEffect(() => {
    if (!contents.loaded) dispatch(getBlocked());
  }, [dispatch, contents.loaded]);
  return contents;
};

export const useAddFriend = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<ErrorBody | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "finished" | "failed"
  >("idle");
  const isAFulfilledAction = isFulfilled(sendFriendRequest);

  const callFunction = async (data: string) => {
    setStatus("loading");
    const result = await dispatch(sendFriendRequest(data));
    if (isAFulfilledAction(sendFriendRequest)) {
      //less goooooo
      console.log("Success");
      setStatus("finished");
      setError(null);
    } else {
      console.log("Failure");
      setStatus("failed");
      setError(result.payload ?? null);
    }
  };
  return { callFunction, error, status };
};

export const useAddFriendById = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<ErrorBody | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "finished" | "failed"
  >("idle");
  const isAFulfilledAction = isFulfilled(sendFriendRequestById);

  const callFunction = async (data: string) => {
    setStatus("loading");
    const result = await dispatch(sendFriendRequestById(data));
    if (isAFulfilledAction(sendFriendRequestById)) {
      //less goooooo
      console.log("Success");
      setStatus("finished");
      setError(null);
    } else {
      console.log("Failure");
      setStatus("failed");
      setError(result.payload ?? null);
    }
  };
  return { callFunction, error, status };
};
