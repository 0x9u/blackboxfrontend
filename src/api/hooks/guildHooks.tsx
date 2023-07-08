import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getGuildBans,
  getGuildInvites,
  getGuildMembers,
  getGuildMsgs,
  joinGuildInvite,
  userIsTyping,
} from "../guildApi";
import { RootState, useAppDispatch } from "../../app/store";
import { Invite } from "../types/guild";
import { Member } from "../types/user";
import { ErrorBody } from "../types/error";
import { isFulfilled } from "@reduxjs/toolkit";
import { Msg } from "../types/msg";
import { setGuildIntialMsgsLoaded } from "../../app/slices/clientSlice";
import { SuggestionDataItem } from "react-mentions";

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

export const loadGuildMembers = () => {
  const dispatch = useAppDispatch();

  const { currentGuild, loaded } = useSelector((state: RootState) => ({
    currentGuild: state.client.currentGuild ?? "",
    loaded:
      state.client.guildLoaded[state.client.currentGuild ?? ""]?.members ??
      true,
  }));

  useEffect(() => {
    console.log("useGetGuildMembers", currentGuild, loaded);
    if (!loaded) dispatch(getGuildMembers(currentGuild));
  }, [dispatch, currentGuild]);
};

export const useGetGuildMembers = () => {
  return useSelector((state: RootState) => {
    const members: Record<string, Member> = {};
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
      members[member.userInfo.id] = member;
    }
    return {
      currentGuild: state.client.currentGuild ?? "",
      guildMembers: members ?? ({} as Record<string, Member>),
      guildMembersOrder:
        state.user.guildMembersIds[state.client.currentGuild ?? ""] ??
        ([] as string[]),
      loaded:
        state.client.guildLoaded[state.client.currentGuild ?? ""].members ??
        true,
    };
  });
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
          true,
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
  const isAFulfilledAction = isFulfilled(joinGuildInvite);

  const callFunction = async (data: Invite) => {
    setStatus("loading");
    const result = await dispatch(joinGuildInvite(data));
    if (isAFulfilledAction(joinGuildInvite)) {
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

export const useGetGuildMsgInfo = () => {
  const dispatch = useAppDispatch();
  const contents = useSelector((state: RootState) => {
    const currentChatMode = state.client.currentChatMode;
    const currentId =
      (currentChatMode === "guild"
        ? state.client.currentGuild
        : state.client.currentDM) ?? "";

    const msgsHistory: Msg[] = [];
    for (const msgId of state.msg.guildMsgIds[currentId] ?? []) {
      const msg = state.msg.msgs[msgId];
      if (msg === undefined) {
        continue;
      }
      msgsHistory.push(msg);
    }

    const guildMsgIds = state.msg.guildMsgIds[currentId] ?? [];
    const lastTime = Math.floor(
      new Date(
        state.msg.msgs[guildMsgIds[guildMsgIds.length - 1] ?? ""]?.created ?? 0
      ).valueOf() / 1000
    );
    return {
      currentGuild: state.client.currentGuild ?? "",
      currentDm: state.client.currentDM ?? "",
      currentChatMode: state.client.currentChatMode,
      loaded: state.client.guildLoaded[currentId].msgs ?? true,
      isIntialMsgsLoaded:
        state.client.guildLoaded[currentId].initialMsgs ?? true,
      isMsgsLoaded: state.client.guildLoaded[currentId].msgs ?? true,
      msgsLength: state.msg.guildMsgIds[currentId]?.length ?? 0,
      lastTime,
      msgsUnread:
        (currentChatMode === "guild"
          ? state.guild.guilds[currentId]
          : state.guild.dms[currentId]
        )?.unread ?? 0,
      currentEditMsgId: state.client.currentEditMsgId,
      msgsHistory,
    };
  });
  useEffect(() => {
    //temp fix cause skill issue
    if (!contents.isIntialMsgsLoaded)
      dispatch(
        getGuildMsgs({
          id:
            contents.currentChatMode === "guild"
              ? contents.currentGuild
              : contents.currentDm,
          time: contents.lastTime,
        })
      ).then(() =>
        dispatch(
          setGuildIntialMsgsLoaded(
            contents.currentChatMode === "guild"
              ? contents.currentGuild
              : contents.currentDm
          )
        )
      );
  }, [contents.currentGuild, contents.currentDm, contents.currentChatMode]);
  return contents;
};

export const useGetGuildMembersForMention = () => {
  return useSelector((state: RootState) => {
    const userListMention: SuggestionDataItem[] = [];
    const currentChatMode = state.client.currentChatMode;
    const userList: Record<string, string> = {};
    if (currentChatMode === "dm") {
      const currentDM = state.client.currentDM;
      const userId = state.guild.dms[currentDM ?? ""]?.userId ?? "";
      const username = state.user.users[userId]?.name ?? "";
      userListMention.push({ id: userId, display: username });
      userList[userId] = username;
    } else {
      const userIds =
        state.user.guildMembersIds[state.client.currentGuild ?? ""] ?? [];
      for (const userId of userIds) {
        if (state.user.users[userId] !== undefined) {
          const user: SuggestionDataItem = {
            id: userId,
            display: state.user.users[userId].name,
          };
          userListMention.push(user);
          userList[userId] = state.user.users[userId].name;
        }
      }
    }
    userListMention.push({ id: "everyone", display: "everyone" });
    return { userListMention, userList };
  });
};

export const useUserIsTyping = (value: string) => {
  const dispatch = useAppDispatch();
  const [isTyping, setIsTyping] = useState(false);
  const { currentId } = useSelector((state: RootState) => {
    const currentChatMode = state.client.currentChatMode;
    const currentId =
      (currentChatMode === "guild"
        ? state.client.currentGuild
        : state.client.currentDM) ?? "";

    return {
      currentId,
    };
  });
  useEffect(() => {
    if (!isTyping && value !== "") {
      //typing delay 5 seconds to prevent spam (redo later kinda shitty)
      setIsTyping(true);
      dispatch(userIsTyping(currentId));
      setTimeout(() => {
        setIsTyping(false);
      }, 5000);
    }
  }, [value]);
  useEffect(() => {
    setIsTyping(false);
  }, [currentId]);
};