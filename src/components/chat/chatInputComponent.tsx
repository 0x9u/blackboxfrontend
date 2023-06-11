import React, { FC, createRef, useEffect, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { Mention, MentionsInput, SuggestionDataItem } from "react-mentions";
import { useSelector } from "react-redux";
import { Msg } from "../../api/types/msg";
import { RootState, useAppDispatch } from "../../app/store";
import Button from "../buttonComponent";
import { createGuildMsg } from "../../api/guildApi";
import {
  useGetGuildMembers,
  useGetGuildMembersForMention,
  useUserIsTyping,
} from "../../api/hooks/guildHooks";

const chatInputArea: FC = () => {
  const [value, setValue] = useState<string>("");
  const [playAnimation, setPlayAnimation] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const currentId = useSelector((state: RootState) =>
    state.client.currentChatMode === "dm"
      ? state.client.currentDM
      : state.client.currentGuild
  );

  const { userListMention, userList } = useGetGuildMembersForMention();

  const userListTyping = useSelector((state: RootState) => {
    const userList = state.guild.userIsTyping[currentId ?? ""] ?? [];
    return userList.map((id) => {
      const user = state.user.users[id];
      if (user) return { id, username: user.name };
      else return { id, username: "Loading..." };
    });
  });

  useUserIsTyping(value);

  function send() {
    if (currentId) {
      dispatch(
        createGuildMsg({ id: currentId, msg: { content: value } as Msg })
      );
      setValue("");
    }
  }

  return (
    <div className="min-h-16 shrink-0 px-4">
      <div
        className={`min-h-14 flex w-full flex-row space-x-2 rounded bg-shade-2 px-4 ${
          playAnimation ? "animate-shake" : ""
        }`}
        onAnimationEnd={() => setPlayAnimation(false)}
      >
        <div className="my-auto shrink-0">
          <input id="file-upload" type="file" className="hidden h-10 w-10" />
          <label htmlFor="file-upload">
            <MdOutlineAddCircle className="h-10 w-10 cursor-pointer text-white/90 hover:text-white" />
          </label>
        </div>
        <MentionsInput
          rows={1}
          autoCorrect="off"
          placeholder="Type your message here!"
          value={value}
          onChange={(v) => {
            setValue(v.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (value !== "") {
                send();
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
            renderSuggestion={(suggestion, search, highlightedDisplay) => (
              <div className="bg-shade-1 py-1 text-lg">
                @{highlightedDisplay}
              </div>
            )}
            displayTransform={(id, display) => {
              //crap
              return `@${userList[display] ?? "everyone"}`;
            }}
            appendSpaceOnAdd={true}
          />
        </MentionsInput>
        <Button type="button" value="Send" className="my-auto" onClick={send} />
      </div>
      <div className="h-6 shrink-0 pl-1">
        <p className="font-semibold text-white">
          {userListTyping?.length > 0 &&
            `${
              userListTyping.length < 5
                ? userListTyping.map((val, index, array) => {
                    return `${val.username}${array[index + 1] ? ", " : ""}`;
                  }) + " is"
                : "Multiple people are"
            } typing`}
        </p>
      </div>
    </div>
  );
};

export default chatInputArea;
