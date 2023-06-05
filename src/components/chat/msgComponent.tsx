import React, { FC, Fragment } from "react";
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
  return (
    <div
      className={`group relative flex flex-row space-x-4 px-4 ${
        !combined ? "pt-8" : ""
      } hover:bg-black/25`}
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
        className={`flex ${
          !combined ? "flex-col" : "flex-grow flex-row-reverse"
        }`}
      >
        <div
          className={`flex flex-row items-center space-x-2 ${
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
          <div className="hidden flex-row space-x-2 group-hover:flex">
            <MdRepeat className="h-6 w-6 cursor-pointer text-white" />
            <MdEdit className="h-6 w-6 cursor-pointer text-white" />
            <MdDelete className="h-6 w-6 cursor-pointer text-red" />
          </div>
        </div>
        <div className={`${!combined ? "" : "mx-16 flex-grow"}`}>
          <p className="font-normal leading-relaxed text-white">
            {formatedContent.map((e: string) => {
              const mention = e.match(/\<\@(?<userid>\d+)\>/);
              if (mention?.groups) {
                return (
                  <span className="rounded-sm bg-shade-5/50 py-1">
                    @{userList[mention.groups.userid]}
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
