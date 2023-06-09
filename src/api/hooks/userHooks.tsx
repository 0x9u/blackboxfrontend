import { useState, useEffect } from "react";
import { isFulfilled } from "@reduxjs/toolkit";
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
  getGuilds,
  getSelf,
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

  const callFunction = async (data: EditUserEmailForm) => {
    setStatus("loading");
    const result = await dispatch(editUserEmail(data));
    if (isFulfilled(editUserEmail)) {
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

  const callFunction = async (data: EditUserPasswordForm) => {
    setStatus("loading");
    const result = await dispatch(editUserPassword(data));
    if (isFulfilled(editUserEmail)) {
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

  const callFunction = async (data: EditUserPictureForm) => {
    setStatus("loading");
    const result = await dispatch(editUserPicture(data));
    if (isFulfilled(editUserEmail)) {
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

export const useEditUserName = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<ErrorBody | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "finished" | "failed"
  >("idle");

  const callFunction = async (data: EditUserNameForm) => {
    setStatus("loading");
    const result = await dispatch(editUserName(data));
    if (isFulfilled(editUserEmail)) {
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

  const [loaded, setLoaded] = useState<boolean>(false);
  const userInfo = useSelector(
    (state: RootState) =>
      state.user.users[state.user.selfUser || ""] ??
      ({
        name: "Unavailable",
        imageId: "-1",
        email: "Unavailable",
        id: "-1",
      } as User)
  );
  useEffect(() => {
    dispatch(getSelf()).then(() => {
      setLoaded(true);
    });
  }, [dispatch]);

  return { userInfo, loaded };
};

export const useGetGuildDms = () => {
  const dispatch = useAppDispatch();
  const { guilds, dms, loaded } = useSelector((state: RootState) => ({
    guilds:
      state.guild.guildIds.map((id) => state.guild.guilds[id]) ??
      ([] as Guild[]),
    dms: state.guild.dmIds.map((id) => state.guild.dms[id]) ?? ([] as DmUser[]),
    loaded: state.client.guildListLoaded,
  }));
  useEffect(() => {
    if (!loaded) dispatch(getGuilds());
  }, [dispatch]);
  return { guilds, dms, loaded };
};