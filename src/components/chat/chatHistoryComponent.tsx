import React, { FC, useEffect, useMemo, useRef, useState } from "react";
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
    currentId,
    msgsHistory,
    msgsLength,
    msgsUnread,
    isMsgsLoaded,
    lastTime,
    isInitialMsgsLoaded,
    currentEditMsgId,
  } = useGetGuildMsgInfo();

  console.log(msgsUnread);

  const lastReadTime = new Date(msgsUnread.time).toLocaleString();

  const scrollIntoView = useRef<HTMLDivElement>(null);

  const userInfo = useSelector(
    (state: RootState) => state.user.users[state.user.selfUser ?? ""]
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          if (scrollIntoView.current) {
            scrollIntoView.current.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    const config = { childList: true };

    if (scrollIntoView.current) {
      observer.observe(scrollIntoView.current, config);
    }
    return () => observer.disconnect();
  }, [msgsHistory]);

  return (
    <div className="relative flex grow flex-col">
      <div
        id="chatHistory"
        className="flex h-0 shrink-0 grow flex-col-reverse space-y-reverse overflow-y-auto py-5"
      >
        {!isInitialMsgsLoaded && <SkeletonLoaderChatMsg />}
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
            dispatch(
              getGuildMsgs({
                id: currentId,
                time: lastTime,
              })
            );
          }}
        >
          <div ref={scrollIntoView}></div>
          {msgsHistory.map((msg, index, msgs) => {
            const createdDate = new Date(msg.created);
            const modifiedDate = new Date(msg.modified);
            const beforeCreatedDate = new Date(
              msgs[index + 1]?.created ?? Infinity
            );
            const beforeAuthor = msgs[index + 1]?.author?.id ?? "";

            return (
              <MsgElement
                key={msg.id}
                
                id={msg.id}
                content={msg.content}
                authorid={
                  !msg.failed && !msg.loading ? msg.author.id : userInfo.id
                }
                username={
                  !msg.failed && !msg.loading ? msg.author.name : userInfo.name
                }
                created={createdDate.toLocaleString()}
                modified={
                  msg.modified !== "0001-01-01T00:00:00Z"
                    ? modifiedDate.toLocaleString()
                    : ""
                }
                userImageId={
                  !msg.failed && !msg.loading
                    ? msg.author.imageId
                    : userInfo.imageId
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
                loading={msg.loading}
                attachments={msg.attachments}
                requestId={msg.requestId}
                uploadId={msg.uploadIds}
              />
            );
          })}
        </InfiniteScroll>
      </div>
      {msgsUnread.count > 0 && (
        <div className="absolute w-full px-4">
          <div className="break-words rounded-b-md bg-shade-2 px-4 py-1 font-medium text-white">
            <MdMessage className="inline-block h-6 w-6" /> Unread Msgs:{" "}
            {msgsUnread.count} Last Read: {lastReadTime}{" "}
            <a
              className="cursor-pointer select-none justify-self-end font-semibold text-gray hover:underline active:text-gray/75"
              onClick={() => {
                dispatch(readGuildMsg(currentId));
                dispatch(clearUnreadMsg(currentId));
              }}
            >
              Mark as read
            </a>
          </div>
        </div>
      )}
      <ChatInput />
    </div>
  );
};

export default ChatHistory;
