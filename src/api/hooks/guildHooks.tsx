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
import { guildLoaded } from "../../app/slices/clientSlice";
import { RootState, useAppDispatch } from "../../app/store";
import { Invite } from "../types/guild";
import { Member } from "../types/user";
import { ErrorBody } from "../types/error";
import { isFulfilled } from "@reduxjs/toolkit";
import { Msg } from "../types/msg";
import { setGuildIntialMsgsLoaded } from "../../app/slices/clientSlice";
import { SuggestionDataItem } from "react-mentions";

export const loadGuildInfo = () => {
  const dispatch = useAppDispatch();
  const { currentId, currentChatMode, lastMsgTime, hasAuth, loaded } =
    useSelector((state: RootState) => {
      const currentChatMode = state.client.currentChatMode;
      const currentId =
        (currentChatMode === "guild"
          ? state.client.currentGuild
          : state.client.currentDM) ?? "";
      const guildMsgIds = state.msg.guildMsgIds[currentId] ?? [];
      const lastMsgTime = Math.floor(
        new Date(
          state.msg.msgs[guildMsgIds[guildMsgIds.length - 1] ?? ""]?.created ??
            0
        ).valueOf() / 1000
      );
      const selfUser = state.user.selfUser ?? "";
      const hasAuth =
        (state.user.guildAdminIds[currentId] ?? []).includes(selfUser) ||
        (state.guild.guilds[currentId]?.ownerId ?? "") === selfUser;
      return {
        currentId,
        currentChatMode,
        lastMsgTime,
        hasAuth,
        loaded:
          state.client.guildLoaded[currentId ?? ""] ?? ({} as guildLoaded),
      };
    });
  const { invites, members, banned, initialMsgs } = loaded;
  console.log("currentId", currentId, "loaded", loaded);
  useEffect(() => {
    if (currentChatMode === "guild" && currentId !== "" && !invites) {
      dispatch(getGuildInvites(currentId));
    }
  }, [currentChatMode, currentId, invites, dispatch]);
  useEffect(() => {
    if (currentChatMode === "guild" && currentId !== "" && !members) {
      dispatch(getGuildMembers(currentId));
    }
  }, [currentChatMode, currentId, members, dispatch]);
  useEffect(() => {
    if (currentChatMode === "guild" && hasAuth && currentId !== "" && !banned) {
      dispatch(getGuildBans(currentId));
    }
  }, [currentChatMode, currentId, banned, dispatch]);
  useEffect(() => {
    if (!initialMsgs && currentId !== "")
      dispatch(
        getGuildMsgs({
          id: currentId,
          time: lastMsgTime,
        })
      ).then(() => dispatch(setGuildIntialMsgsLoaded(currentId)));
  }, [currentChatMode, currentId, initialMsgs, dispatch]);
};

export const useGetGuildInvites = () => {
  const { currentGuild, guildInvites, loaded } = useSelector(
    (state: RootState) => ({
      currentGuild: state.client.currentGuild ?? "",
      guildInvites:
        state.guild.invites[state.client.currentGuild ?? ""] ??
        ([] as Invite[]),
      loaded: state.client.guildLoaded[state.client.currentGuild ?? ""].invites,
    })
  );

  return { currentGuild, guildInvites, loaded };
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
      currentId, //temp fix ?.
      currentChatMode: state.client.currentChatMode,
      loaded: state.client.guildLoaded?.[currentId].msgs ?? true,
      isInitialMsgsLoaded:
        state.client.guildLoaded?.[currentId].initialMsgs ?? true,
      isMsgsLoaded: state.client.guildLoaded?.[currentId].msgs ?? true,
      msgsLength: state.msg.guildMsgIds?.[currentId]?.length ?? 0,
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
