import React, { FC, Fragment, useMemo, useState } from "react";
import { MdDelete, MdEdit, MdRepeat } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface msgProps {
  content: string;
  failed?: boolean;
  username: string;
  userImageId: string;
  created: string;
  modified?: string;
  combined: boolean;
}

const Msg: FC<msgProps> = ({
  content,
  failed,
  username,
  userImageId,
  created,
  modified,
  combined,
}) => {
  const formatedContent = content.split(/(\<\@\w+\:\d+\>)/g);
  const imageURL =
    userImageId !== "-1"
      ? `http://localhost:8080/api/files/user/${userImageId}`
      : "./blackboxuser.jpg";
  const userList = useSelector((state: RootState) => {
    const users =
      state.user.guildMembersIds[state.client.currentGuild ?? ""] ?? [];
    const userInfo: Record<string, string> = {};
    for (const user of users) {
      const data = state.user.users[user];
      if (data !== undefined) {
        userInfo[data.id] = data.name;
      }
    }
    return userInfo;
  });
  const selfUserId = useSelector((state: RootState) => state.user.selfUser);
  const mentionedSelfUser = useMemo(() => {
    const search = new RegExp(`\<\@(${selfUserId}|everyone)\>`);
    return search.test(content);
  }, [selfUserId, content]);

  return (
    <div
      className={`group relative flex flex-row space-x-4 px-4 ${
        !combined ? "mt-8 pt-2" : ""
      } hover:bg-black/25 ${
        mentionedSelfUser
          ? " border-l-2 border-green bg-green/50 hover:bg-green/25"
          : ""
      }`}
    >
      {!combined && (
        <img
          className="h-12 w-12 shrink-0 rounded-full border border-black"
          src={imageURL}
        >
          {/* for pfp */}
        </img>
      )}
      <div
        className={`flex flex-grow ${
          !combined ? "flex-col" : "flex-row-reverse"
        }`}
      >
        <div
          className={`flex w-full flex-grow flex-row items-center space-x-2 whitespace-nowrap ${
            !combined ? "" : "justify-self-end"
          }`}
        >
          {!combined && (
            <Fragment>
              <p className="text-lg font-semibold leading-relaxed text-white">
                {username}
              </p>
              <p className="text-xs font-medium leading-relaxed text-white brightness-75">
                Created on {created} {modified && `and Edited at ${modified}`}
              </p>
            </Fragment>
          )}
          <div className="group invisible absolute right-1 -top-4 z-50 !ml-auto mb-auto flex select-none flex-row space-x-2 rounded-sm bg-shade-1 p-1 group-hover:visible">
            <MdRepeat className="h-6 w-6 cursor-pointer text-white hover:bg-white/25 active:bg-white/10" />
            <MdEdit className="h-6 w-6 cursor-pointer text-white hover:bg-white/25 active:bg-white/10" />
            <MdDelete className="h-6 w-6 cursor-pointer text-red hover:bg-white/25 active:bg-white/10" />
          </div>
        </div>
        <div className={`${!combined ? "mr-28" : "ml-16 mr-4"}`}>
          <p className="font-normal leading-relaxed text-white">
            {formatedContent.map((e: string) => {
              const mention = e.match(
                /\<\@((?<userid>\d+)|(?<everyone>everyone))\>/
              );
              if (mention?.groups) {
                return (
                  <span className="rounded-sm bg-shade-5/50 py-1">
                    @
                    {mention.groups?.everyone ??
                      userList[mention.groups.userid]}
                  </span>
                );
              } else {
                return e;
              }
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Msg;
