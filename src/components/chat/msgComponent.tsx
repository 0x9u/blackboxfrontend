import React, { FC, createRef, useMemo, useState, useEffect } from "react";
import { MdDelete, MdEdit, MdRepeat } from "react-icons/md";
import { useSelector } from "react-redux";
import Linkify from "linkify-react";
import { RootState, useAppDispatch } from "../../app/store";
import {
  deleteGuildMsg,
  editGuildMsg,
  retryGuildMsg,
} from "../../api/guildApi";
import { useGetGuildMembersForMention } from "../../api/hooks/guildHooks";
import { User } from "../../api/types/user";
import { setCurrentEditMsgId } from "../../app/slices/clientSlice";
import { Mention, MentionsInput } from "react-mentions";
import { Attachment, Msg } from "../../api/types/msg";
import MsgAttachment from "./msgAttachmentComponent";
import { removeGuildMsg } from "../../app/slices/msgSlice";
import MsgLoadingAttachment from "./msgLoadingAttachmentComponent";

interface msgProps {
  id: string;
  content: string;
  authorid: string;
  username: string;
  userImageId: string;
  created: string;
  modified?: string;
  failed?: boolean;
  loading?: boolean;
  mentions: User[];
  combined: boolean;
  editing: boolean;
  requestId: string;
  attachments?: Attachment[];
  uploadId?: string[];
}

const Msg: FC<msgProps> = ({
  id,
  content,
  failed,
  loading,
  username,
  userImageId,
  authorid,
  created,
  modified,
  mentions,
  combined,
  editing,
  requestId,
  attachments,
  uploadId,
}) => {
  const dispatch = useAppDispatch();
  const formatedContent = content.split(/(\<\@(?:\d+|everyone)\>)/g);
  const imageURL =
    userImageId !== "-1"
      ? `${import.meta.env.VITE_API_ENDPOINT}/files/user/${userImageId}`
      : "./blackboxuser.jpg";

  //crappy replace later (temp)

  const currentGuild = useSelector(
    (state: RootState) =>
      (state.client.currentChatMode === "guild"
        ? state.client.currentGuild
        : state.client.currentDM) ?? ""
  );

  const admins = useSelector((state: RootState) =>
    state.client.currentChatMode === "guild"
      ? [
          ...(state.user.guildAdminIds[currentGuild ?? ""] ?? []),
          state.guild.guilds[currentGuild ?? ""].ownerId,
        ]
      : []
  );

  const { userListMention, userList } = useGetGuildMembersForMention();

  const selfUserId = useSelector((state: RootState) => state.user.selfUser);
  const mentionedSelfUser = useMemo(() => {
    const search = new RegExp(`\<\@(${selfUserId}|everyone)\>`);
    return search.test(content);
  }, [selfUserId, content]);

  const [value, setValue] = useState<string>(content);
  const [playAnimation, setPlayAnimation] = useState<boolean>(false);
  const editInput = createRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (editing && editInput.current) {
      editInput.current.setSelectionRange(value.length, value.length);
      editInput.current.focus();
    }
  }, [editing]);

  console.log(uploadId);

  return (
    <div
      className={`group relative box-border flex flex-row space-x-4 px-4 ${
        !combined ? "mt-4 pt-1" : ""
      } hover:bg-black/25 ${
        mentionedSelfUser
          ? "border-l-2 border-green bg-green/25 pr-4 pl-[calc(1rem-2px)] hover:bg-green/10"
          : ""
        //TODO: to be or not to be? - that is the question
        //whether 'tis nobler in the mind to leave this temporary fix in,
        //or to suffer the tediousness of researching a solution
        //and, by opposing, remove this.
      }`}
    >
      {!combined && (
        <img
          className="h-12 w-12 shrink-0 rounded-full border border-black"
          src={imageURL}
        ></img>
      )}
      <div
        className={`flex flex-grow ${
          !combined ? "flex-col" : "flex-row-reverse"
        }`}
      >
        {!combined && (
          <div
            className={`flex w-full flex-grow flex-row items-center space-x-2 whitespace-nowrap ${
              !combined ? "" : "justify-self-end"
            }`}
          >
            <p className="text-lg font-semibold leading-relaxed text-white">
              {username}
            </p>
            {!failed && !loading && (
              <p className="text-xs font-medium leading-relaxed text-white brightness-75">
                Created on {created} {modified && `and Edited at ${modified}`}
              </p>
            )}
          </div>
        )}
        {!editing ? (
          <div className={`${!combined ? "mr-28" : "ml-16 mr-4"} w-full`}>
            <Linkify
              as="p"
              className={`font-normal leading-relaxed [&>a]:text-shade-5 [&>a]:hover:underline ${
                !failed
                  ? loading
                    ? "text-white/50"
                    : "text-white"
                  : "text-red"
              }`}
            >
              {formatedContent.map((e: string, i: number) => {
                const mentionMatched = e.match(
                  /\<\@((?<userid>\d+)|(?<everyone>everyone))\>/
                );
                if (mentionMatched?.groups) {
                  return (
                    <span className="rounded-sm bg-shade-5/50 py-1" key={i}>
                      @
                      {mentions.find(
                        (user) =>
                          user.id === (mentionMatched.groups?.userid ?? "")
                      )?.name ?? mentionMatched.groups.everyone}
                    </span>
                  );
                } else {
                  return e;
                }
              })}
            </Linkify>
            <MsgAttachment attachments={attachments} />
            <MsgLoadingAttachment uploadIds={uploadId} failed={failed} />
          </div>
        ) : (
          <div
            className={`mb-2 flex flex-col ${
              !combined ? "mr-28" : "ml-16 mr-4"
            } w-full`}
          >
            <div
              className={`min-h-14 flex w-full flex-row space-x-2 rounded bg-shade-2 px-4 ${
                playAnimation ? "animate-shake" : ""
              }`}
              onAnimationEnd={() => setPlayAnimation(false)}
            >
              <MentionsInput
                rows={1}
                autoCorrect="off"
                placeholder="Type your message here!"
                value={value}
                onChange={(v) => {
                  console.log(v.target.value);
                  setValue(v.target.value);
                }}
                inputRef={editInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (value !== "") {
                      console.log(requestId, "fucking work 2");
                      if (requestId !== "") {
                        dispatch(
                          editGuildMsg({
                            id: currentGuild,
                            msgId: requestId,
                            msg: { content: value } as Msg,
                          })
                        );
                      } else {
                        dispatch(
                          editGuildMsg({
                            id: currentGuild,
                            msgId: id,
                            msg: { content: value } as Msg,
                          })
                        );
                      }
                      dispatch(setCurrentEditMsgId(null));
                      dispatch(setCurrentEditMsgId(null));
                    } else {
                      setPlayAnimation(true);
                    }
                  }
                }}
                forceSuggestionsAboveCursor={true}
                a11ySuggestionsListLabel={"People"}
                className={
                  "[&>div>textarea]:textbox-scrollbar my-4 block max-h-[25vh] w-0 grow overflow-y-auto bg-shade-2 text-lg leading-relaxed text-white"
                }
                style={{
                  input: {
                    overflow: "auto",
                    outline: 0,
                  },
                }}
              >
                <Mention /* TODO: somehow make suggestions menu rounded*/
                  trigger="@"
                  markup="<@__id__>"
                  data={userListMention}
                  className="rounded-sm bg-shade-5/50 py-1"
                  renderSuggestion={(
                    suggestion,
                    search,
                    highlightedDisplay
                  ) => (
                    <div className="bg-shade-1 py-1 text-lg">
                      @{highlightedDisplay}
                    </div>
                  )}
                  displayTransform={(id, display) => {
                    return `@${userList[display] ?? "everyone"}`;
                  }}
                  appendSpaceOnAdd={true}
                />
              </MentionsInput>
            </div>
            <p className="select-none whitespace-nowrap text-sm font-thin text-white">
              Press Enter to{" "}
              <a
                className=" cursor-pointer text-shade-5 hover:underline"
                onClick={() => {
                  if (value !== "") {
                    console.log(requestId, "fucking work 2");
                    if (requestId !== "") {
                      dispatch(
                        editGuildMsg({
                          id: currentGuild,
                          msgId: requestId,
                          msg: { content: value } as Msg,
                        })
                      );
                    } else {
                      dispatch(
                        editGuildMsg({
                          id: currentGuild,
                          msgId: id,
                          msg: { content: value } as Msg,
                        })
                      );
                    }
                    dispatch(setCurrentEditMsgId(null));
                  } else {
                    setPlayAnimation(true);
                  }
                }}
              >
                Save
              </a>
              {" • "}Press ESC to{" "}
              <a
                className=" cursor-pointer text-shade-5 hover:underline"
                onClick={() => dispatch(setCurrentEditMsgId(null))}
              >
                Cancel
              </a>
            </p>
          </div>
        )}
        <div className="group invisible absolute right-1 -top-4 z-50 !ml-auto mb-auto flex select-none flex-row space-x-2 rounded-sm bg-shade-2 p-1 group-hover:visible">
          {failed && (
            <MdRepeat
              className="h-6 w-6 cursor-pointer text-white hover:bg-white/25 active:bg-white/10"
              onClick={() => {
                console.log("retrying msg");
                dispatch(retryGuildMsg({ id: currentGuild, msgId: id }));
              }}
            />
          )}
          {!editing && !failed && !loading && selfUserId === authorid && (
            <MdEdit
              className="h-6 w-6 cursor-pointer text-white hover:bg-white/25 active:bg-white/10"
              onClick={() => {
                console.log("editing msg");
                dispatch(setCurrentEditMsgId(id));
              }}
            />
          )}
          {(selfUserId === authorid || admins.includes(selfUserId ?? "")) &&
            !loading && (
              <MdDelete
                className="h-6 w-6 cursor-pointer text-red hover:bg-white/25 active:bg-white/10"
                onClick={() => {
                  console.log("deleting msg");
                  console.log(id, "fucking work");
                  if (failed) {
                    dispatch(
                      removeGuildMsg({
                        id,
                        guildId: currentGuild,
                        failed: true,
                      } as Msg)
                    );
                  } else {
                    dispatch(deleteGuildMsg({ id: currentGuild, msgId: id }));
                  }
                  dispatch(setCurrentEditMsgId(null));
                }}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default Msg;
