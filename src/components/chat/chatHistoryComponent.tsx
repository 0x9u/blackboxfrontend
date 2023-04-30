import React, { FC } from "react";

import MsgElement from "./msgComponent";
import ChatInput from "./chatInputComponent";
import { useGetGuildMsgsQuery } from "../../api/guildApi";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Msg } from "../../api/types/msg";

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

  const { isLoading } = useGetGuildMsgsQuery(
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
        {isLoading && (
          <div className="flex flex-grow flex-col items-center justify-center">
            <div className="text-3xl font-bold text-white">Loading...</div>
          </div>
        )}
        {/*[...Array(15)].map(() => (
        <Msg
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
          username="bob"
          created={111}
          modified={111}
        />
      ))*/}
        {/*[...Array(15)].map(() => (
        <Msg
          content="<@bruhmomento:23> <@bruhmomentasdas:23> <@basdasd:23>"
          username="bob"
          created={111}
          modified={111}
        />
      ))*/}
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
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatHistory;
