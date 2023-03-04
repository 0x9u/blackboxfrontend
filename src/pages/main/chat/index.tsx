import React, { FC, useState } from "react";
import { MdSettings, MdPeople, MdOutlineAddCircle } from "react-icons/md";
import Msg from "../../../components/msgComponent";
import NavbarChild from "../../../components/navbarChildComponent";
import NavbarItem from "../../../components/navItemComponent";
import Page from "../../../components/pageComponent";
import Button from "../../../components/buttonComponent";
import User from "../../../components/userComponent";

const Chat: FC = () => {
  const [showUserList, setShowUserList] = useState<boolean>(false);

  const expendHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(
      e.target.scrollHeight,
      (screen.height - 16) / 4
    )}px`;
  };

  return (
    <div className="flex min-h-full grow flex-row">
      <NavbarChild>
        <div className="mb-2 flex flex-row space-x-4 mx-auto font-medium text-white">
          {/*TODO: make cool transition for switch*/}
          <div className="border-b border-white hover:rounded-full hover:hover:bg-white/25">
            Servers
          </div>
          <div>Direct Messages</div>
        </div>
        <div className="flex flex-col h-0 pl-2 grow overflow-y-auto list-scrollbar">
          {[...Array(50)].map(() => (
            <NavbarItem onClick={() => console.log("clicked")}>
              <div className="h-12 w-12 flex-shrink-0 rounded-full border border-black"></div>
              <p className="m-auto truncate leading-relaxed">Friend Namaaaaaaaaaaaaaaaaaa</p>
            </NavbarItem>
          ))}
        </div>
      </NavbarChild>
      <Page>
        {/* BAR */}
        <div className="flex h-16 flex-row border-b-2 border-black px-4 bg-shade-4">
          <p className="m-auto w-0 grow truncate text-2xl font-bold text-white">
            First server!
          </p>
          <div className="flex grow flex-row-reverse space-x-4 space-x-reverse">
            <MdPeople
              className="my-auto h-10 w-10 shrink-0 text-white"
              onClick={() => setShowUserList(!showUserList)}
            />
            <MdSettings className="my-auto h-10 w-10 shrink-0 text-white" />
          </div>
        </div>
        {/* CHAT */}
        <div className="flex h-0 grow flex-row">
          {/* CHAT HISTORY*/}
          <div className="flex grow flex-col">
            <div className="flex h-0 shrink-0 grow flex-col-reverse space-y-5 space-y-reverse overflow-y-auto py-5">
              {[...Array(50)].map(() => (
                <Msg
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
                  username="bob"
                  created={111}
                  modified={111}
                />
              ))}
            </div>
            <div className="min-h-16 shrink-0 px-4">
              <div className="min-h-14 flex w-full flex-row space-x-2 rounded bg-shade-1 px-4 ">
                <MdOutlineAddCircle className="my-auto h-10 w-10 shrink-0 text-white" />
                <textarea
                  rows={1}
                  autoCorrect="off"
                  placeholder="Type your message here!"
                  onChange={expendHeight}
                  className="textbox-scrollbar my-1 block grow resize-none overflow-y-auto bg-shade-1 p-2 text-lg leading-relaxed text-white outline-0"
                ></textarea>
                <Button type="button" value="Send" className="my-auto" />
              </div>
              <p className="min-h-2 shrink-0 font-semibold text-white">
                person is typing...
              </p>
            </div>
          </div>
          {showUserList && (
            <div className="list-scrollbar flex h-full w-64 shrink-0 flex-col overflow-y-auto bg-shade-2 space-y-2">
              {[...Array(50)].map(() => (
                <User username="bob" />
              ))}
            </div>
          )}
        </div>
      </Page>
    </div>
  );
};

export default Chat;
