import React, { FC, createRef, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { Mention, MentionsInput } from "react-mentions";
import { useSelector } from "react-redux";
import { usePostGuildMsgMutation } from "../../api/guildApi";
import { Msg } from "../../api/types/msg";
import { RootState } from "../../app/store";
import Button from "../buttonComponent";

const chatInputArea: FC = () => {
  /*const expendHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(
      e.target.scrollHeight,
      (screen.height - 16) / 4
    )}px`;
  };*/ //not needed any more
  const [value, setValue] = useState<string>("");
  const currentId = useSelector(
    (state: RootState) => state.client.currentChatMode === "dm" ? state.client.currentDM : state.client.currentGuild
  );
  const [sendMsg] = usePostGuildMsgMutation();
  function send() {
    if (currentId) {
      sendMsg({ id: currentId, msg: { content: value } as Msg });
      setValue("");
    }
  }
  return (
    <div className="min-h-16 shrink-0 px-4">
      <div className="min-h-14 flex w-full flex-row space-x-2 rounded bg-shade-2 px-4 ">
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
            console.log(v.target.value);
            setValue(v.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
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
            data={[
              { id: 1232, display: "Johnson" },
              { id: 1, display: "asdokjsa" },
              { id: 0, display: "everyone" },
            ]}
            className="rounded-sm bg-shade-5/50 py-1"
            renderSuggestion={(suggestion, search, highlightedDisplay) => (
              <div className="bg-shade-1 py-1 text-lg">
                @{highlightedDisplay}
              </div>
            )}
            displayTransform={(id, display) => {
              return `@${display}`;
            }}
            appendSpaceOnAdd={true}
          />
        </MentionsInput>
        <Button type="button" value="Send" className="my-auto" onClick={send}/>
      </div>
      <p className="min-h-2 shrink-0 pl-1 font-semibold leading-relaxed text-white">
        person is typing...
      </p>
    </div>
  );
};

export default chatInputArea;
