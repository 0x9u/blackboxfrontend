import React, { FC, Fragment } from "react";
import { MdDelete, MdEdit, MdRepeat } from "react-icons/md";

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
  combined
}) => {
  const formatedContent = content.split(/(\<\@\w+\:\d+\>)/g);
  const imageURL = userImageId !== "-1" ? `http://localhost:8080/api/files/user/${userImageId}` : "./blackboxuser.jpg";
  return (
    <div className={`group relative flex flex-row space-x-4 px-4 ${!combined ? "pt-8" : ""} hover:bg-black/25`}>
      {
        !combined &&
        <img className="h-12 w-12 shrink-0 rounded-full border border-black" src={imageURL}>
          {/* for pfp */}
        </img>
      }
      <div className={`flex ${!combined ? "flex-col" : "flex-row-reverse flex-grow"}`}>
        <div className={`flex flex-row items-center space-x-2 ${!combined ? "" : "justify-self-end"}`}>
          {
            !combined &&
            <Fragment>
              < p className="text-lg font-semibold leading-relaxed text-white">
                {username}
              </p>
              <p className="text-xs font-medium leading-relaxed text-white brightness-75">
                Created on {created} {modified && `and Edited at ${modified}`}
              </p></Fragment>
          }
          <div className="hidden flex-row space-x-2 group-hover:flex">
            <MdRepeat className="h-6 w-6 cursor-pointer text-white" />
            <MdEdit className="h-6 w-6 cursor-pointer text-white" />
            <MdDelete className="h-6 w-6 cursor-pointer text-red" />
          </div>
        </div>
        <div className={`${!combined ? "" : "mx-16 flex-grow"}`}>
          <p className="font-normal text-white leading-relaxed">
            {formatedContent.map((e: string) => {
              const mention = e.match(/\<\@(?<username>\w+)\:(?<userid>\d+)\>/);
              if (mention?.groups) {
                return (
                  <span className="rounded-sm bg-shade-5/50 py-1">
                    @{mention.groups["username"]}
                  </span>
                );
              } else {
                return e;
              }
            })}
          </p>
        </div>
      </div>
    </div >
  );
};

export default Msg;
