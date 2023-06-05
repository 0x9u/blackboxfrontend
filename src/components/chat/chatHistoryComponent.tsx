import React, { FC } from "react";

import MsgElement from "./msgComponent";
import ChatInput from "./chatInputComponent";
import {
  useGetGuildMsgsQuery,
  useReadGuildMsgMutation,
} from "../../api/guildApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Msg } from "../../api/types/msg";
import { SkeletonLoaderChatMsg } from "../skeletonLoaderComponent";
import { Guild } from "../../api/types/guild";
import { MdMessage } from "react-icons/md";
import { clearUnreadMsg } from "../../app/slices/guildSlice";

const ChatHistory: FC = () => {
  const dispatch = useDispatch();
  const currentID = useSelector((state: RootState) => {
    return state.client.currentChatMode === "dm"
      ? state.client.currentDM
      : state.client.currentGuild;
  });

  const isMsgsLoaded = useSelector((state: RootState) => {
    const guild = state.client.guildLoaded[currentID ?? ""];
    if (guild == undefined) {
      return false;
    }
    return guild.msgs;
  });

  const unreadMsgs = useSelector((state: RootState) => {
    const guild = state.guild.guilds[currentID ?? ""] ?? ({} as Guild);
    return guild.unread;
  });

  const [readMsg] = useReadGuildMsgMutation();

  const { isFetching } = useGetGuildMsgsQuery(
    { id: currentID ?? "", time: 0 },
    {
      skip: isMsgsLoaded,
    }
  );

  const msgHistory = useSelector((state: RootState) => {
    const msgHistoryOrder = state.msg.guildMsgIds[currentID ?? ""] ?? [];
    var msgHistoryz: Msg[] = [];
    for (const msgId of msgHistoryOrder) {
      const msg = state.msg.msgs[msgId];
      if (msg == undefined) {
        continue;
      }

      msgHistoryz.push(msg);
    }
    return msgHistoryz;
  });

  const lastReadTime = new Date(unreadMsgs.time).toLocaleString();

  return (
    <div className="relative flex grow flex-col">
      <div className="flex h-0 shrink-0 grow flex-col-reverse space-y-reverse overflow-y-auto py-5">
        {msgHistory.map((msg, index, msgs) => {
          const createdDate = new Date(msg.created);
          const modifiedDate = new Date(msg.modified);
          const beforeCreatedDate = new Date(msgs[index + 1]?.created ?? Infinity);
          //const beforeModifiedDate = new Date(msgs[index - 1]?.modified ?? 0);
          return (
            <MsgElement
              key={msg.id
              }
              content={msg.content}
              username={msg.author.name}
              created={createdDate.toLocaleString()}
              modified={modifiedDate.toLocaleString()}
              userImageId={msg.author.imageId}
              combined={(Math.abs(createdDate.getTime() - beforeCreatedDate.getTime()) < 60000)}
            />)
        }
        )}
        {isFetching && <SkeletonLoaderChatMsg />}
      </div>
      {unreadMsgs.count > 0 && (
        <div className="absolute w-full px-4">
          <div className="rounded-b-md bg-shade-2 px-4 py-1 font-medium text-white">
            <p>
              <MdMessage className="inline-block h-6 w-6" /> Unread Msgs:{" "}
              {unreadMsgs.count} Last Read: {lastReadTime}{" "}
              <a
                className="cursor-pointer select-none justify-self-end font-semibold text-gray hover:underline active:text-gray/75"
                onClick={() => {
                  dispatch(clearUnreadMsg(currentID ?? ""));
                  readMsg(currentID ?? "");
                }}
              >
                Mark as read
              </a>
            </p>
          </div>
        </div>
      )}
      <ChatInput />
    </div>
  );
};

export default ChatHistory;
