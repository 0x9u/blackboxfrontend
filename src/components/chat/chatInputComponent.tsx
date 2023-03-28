import React, { FC } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import Button from "../buttonComponent";

const chatInputArea: FC = () => {
  const expendHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(
      e.target.scrollHeight,
      (screen.height - 16) / 4
    )}px`;
  };
  return (
    <div className="min-h-16 shrink-0 px-4">
      <div className="min-h-14 flex w-full flex-row space-x-2 rounded bg-shade-2 px-4 ">
        <div className="my-auto shrink-0">
          <input id="file-upload" type="file" className="hidden h-10 w-10" />
          <label htmlFor="file-upload">
            <MdOutlineAddCircle className="h-10 w-10 text-white/90 hover:text-white cursor-pointer" />
          </label>
        </div>
        <textarea
          rows={1}
          autoCorrect="off"
          placeholder="Type your message here!"
          onChange={expendHeight}
          className="textbox-scrollbar my-1 block grow resize-none overflow-y-auto bg-shade-2 p-2 text-lg  text-white outline-0"
        ></textarea>
        <Button type="button" value="Send" className="my-auto" />
      </div>
      <p className="min-h-2 shrink-0 pl-1 font-semibold leading-relaxed text-white">
        person is typing...
      </p>
    </div>
  );
};

export default chatInputArea;
