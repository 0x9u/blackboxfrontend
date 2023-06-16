import React, { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MsgElement from "./msgComponent";
import ChatInput from "./chatInputComponent";
import { getGuildMsgs, readGuildMsg } from "../../api/guildApi";
import { RootState, useAppDispatch } from "../../app/store";
import { SkeletonLoaderChatMsg } from "../skeletonLoaderComponent";
import { MdMessage } from "react-icons/md";
import { clearUnreadMsg } from "../../app/slices/guildSlice";
import { useGetGuildMsgInfo } from "../../api/hooks/guildHooks";
import { useSelector } from "react-redux";

const ChatHistory: FC = () => {
  const dispatch = useAppDispatch();

  const {
    currentGuild,
    msgsHistory,
    msgsLength,
    msgsUnread,
    isMsgsLoaded,
    lastTime,
    currentEditMsgId,
  } = useGetGuildMsgInfo();

  const lastReadTime = new Date(msgsUnread.time).toLocaleString();

  const userInfo = useSelector(
    (state: RootState) => state.user.users[state.user.selfUser ?? ""]
  );

  return (
    <div className="relative flex grow flex-col">
      <div
        id="chatHistory"
        className="flex h-0 shrink-0 grow flex-col-reverse space-y-reverse overflow-y-auto py-5"
      >
        <InfiniteScroll
          style={{ display: "flex", flexDirection: "column-reverse" }}
          scrollableTarget="chatHistory"
          inverse
          dataLength={msgsLength}
          loader={<SkeletonLoaderChatMsg />}
          endMessage={
            <p className="mx-4 mt-4 font-bold text-white">
              This is the beginning of this chat
            </p>
          }
          hasMore={!isMsgsLoaded}
          next={() => {
            dispatch(getGuildMsgs({ id: currentGuild ?? "", time: lastTime }));
          }}
        >
          {msgsHistory.map((msg, index, msgs) => {
            const createdDate = new Date(msg.created);
            const modifiedDate = new Date(msg.modified);
            const beforeCreatedDate = new Date(
              msgs[index + 1]?.created ?? Infinity
            );
            const beforeAuthor = msgs[index + 1]?.author?.id ?? "";
            //const beforeModifiedDate = new Date(msgs[index - 1]?.modified ?? 0);

            return (
              <MsgElement
                key={msg.id}
                id={msg.id}
                content={msg.content}
                authorid={!msg.failed ? msg.author.id : userInfo.id}
                username={!msg.failed ? msg.author.name : userInfo.name}
                created={createdDate.toLocaleString()}
                modified={modifiedDate.toLocaleString()}
                userImageId={
                  !msg.failed ? msg.author.imageId : userInfo.imageId
                }
                mentions={msg.mentions ?? []}
                combined={
                  Math.abs(
                    createdDate.getTime() - beforeCreatedDate.getTime()
                  ) < 60000 &&
                  !msg.failed &&
                  beforeAuthor === msg.author.id
                }
                editing={msg.id === currentEditMsgId}
                failed={msg.failed}
              />
            );
          })}
        </InfiniteScroll>
      </div>
      {msgsUnread.count > 0 && (
        <div className="absolute w-full px-4">
          <div className="whitespace-nowrap rounded-b-md bg-shade-2 px-4 py-1 font-medium text-white">
            <p>
              <MdMessage className="inline-block h-6 w-6" /> Unread Msgs:{" "}
              {msgsUnread.count} Last Read: {lastReadTime}{" "}
              <a
                className="cursor-pointer select-none justify-self-end font-semibold text-gray hover:underline active:text-gray/75"
                onClick={() => {
                  dispatch(readGuildMsg(currentGuild ?? ""));
                  dispatch(clearUnreadMsg(currentGuild ?? ""));
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
