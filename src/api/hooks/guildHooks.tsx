import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createGuild,
  getGuildBans,
  getGuildInvites,
  getGuildMembers,
  joinGuildInvite,
} from "../guildApi";
import { RootState, useAppDispatch } from "../../app/store";
import { Guild, GuildUpload, Invite } from "../types/guild";
import { Member } from "../types/user";
import { getGuilds } from "../userApi";
import { ErrorBody } from "../types/error";
import { isFulfilled } from "@reduxjs/toolkit";

export const useGetGuildInvites = () => {
  const dispatch = useAppDispatch();

  const { currentGuild, guildInvites, loaded } = useSelector(
    (state: RootState) => ({
      currentGuild: state.client.currentGuild ?? "",
      guildInvites:
        state.guild.invites[state.client.currentGuild ?? ""] ??
        ([] as Invite[]),
      loaded: state.client.guildLoaded[state.client.currentGuild ?? ""].invites,
    })
  );

  useEffect(() => {
    if (!loaded) dispatch(getGuildInvites(currentGuild));
  }, [dispatch, currentGuild]);

  return { currentGuild, guildInvites, loaded };
};

export const useGetGuildMembers = () => {
  const dispatch = useAppDispatch();

  const { currentGuild, guildMembers, loaded } = useSelector(
    (state: RootState) => {
      const members: Member[] = [];
      for (const userid of state.user.guildMembersIds[
        state.client.currentGuild ?? ""
      ] ?? []) {
        const member = {} as Member;
        member.userInfo = state.user.users[userid];
        member.admin =
          state.user.guildAdminIds[state.client.currentGuild ?? ""]?.includes(
            userid
          ) ?? false;
        member.owner =
          state.guild.guilds[state.client.currentGuild ?? ""]?.ownerId ===
            userid ?? false;
        member.guildId = state.client.currentGuild ?? "";
        members.push(member);
      }
      return {
        currentGuild: state.client.currentGuild ?? "",
        guildMembers: members ?? ([] as Member[]),
        loaded:
          state.client.guildLoaded[state.client.currentGuild ?? ""].members,
      };
    }
  );

  useEffect(() => {
    if (!loaded) dispatch(getGuildMembers(currentGuild));
  }, [dispatch, currentGuild]);

  return { currentGuild, guildMembers, loaded };
};

export const useGetGuildBannedMembers = () => {
  const dispatch = useAppDispatch();
  const { currentGuild, guildBannedMembers, loaded } = useSelector(
    (state: RootState) => {
      const members: Member[] = [];
      for (const userid of state.user.guildBannedIds[
        state.client.currentGuild ?? ""
      ] ?? []) {
        const member = {} as Member;
        member.userInfo = state.user.users[userid];
        member.admin =
          state.user.guildAdminIds[state.client.currentGuild ?? ""]?.includes(
            userid
          ) ?? false;
        member.owner =
          state.guild.guilds[state.client.currentGuild ?? ""]?.ownerId ===
            userid ?? false;
        member.guildId = state.client.currentGuild ?? "";
        members.push(member);
      }
      return {
        currentGuild: state.client.currentGuild ?? "",
        guildBannedMembers: members ?? ([] as Member[]),
        loaded:
          state.client.guildLoaded[state.client.currentGuild ?? ""].banned ??
          false,
      };
    }
  );
  useEffect(() => {
    if (!loaded) dispatch(getGuildBans(currentGuild));
  }, [dispatch, currentGuild]);
  return { currentGuild, guildBannedMembers, loaded };
};

export const useJoinGuild = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<ErrorBody | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "finished" | "failed"
  >("idle");

  const callFunction = async (data: Invite) => {
    setStatus("loading");
    const result = await dispatch(joinGuildInvite(data));
    if (isFulfilled(joinGuildInvite)) {
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
