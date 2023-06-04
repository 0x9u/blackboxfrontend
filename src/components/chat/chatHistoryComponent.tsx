import React, { FC } from "react";

import MsgElement from "./msgComponent";
import ChatInput from "./chatInputComponent";
import { useGetGuildMsgsQuery } from "../../api/guildApi";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Msg } from "../../api/types/msg";
import { SkeletonLoaderChatMsg } from "../skeletonLoaderComponent";

const ChatHistory: FC = () => {
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

  return (
    <div className="flex grow flex-col">
      <div className="flex h-0 shrink-0 grow flex-col-reverse space-y-5 space-y-reverse overflow-y-auto py-5">
        {msgHistory.map((msg) => (
          <MsgElement
            key={msg.id}
            content={msg.content}
            username={msg.author.name}
            created={msg.created}
            modified={msg.modified}
            userImageId={msg.author.imageId}
          />
        ))}
        {isFetching && <SkeletonLoaderChatMsg />}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatHistory;
