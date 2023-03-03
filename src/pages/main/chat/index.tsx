import React, { FC, useState } from "react";
import { MdSettings, MdPeople, MdOutlineAddCircle, MdGif } from "react-icons/md"
import Msg from "../../../components/msgComponent";
import NavbarChild from "../../../components/navbarChildComponent";
import NavbarItem from "../../../components/navItemComponent";
import Page from "../../../components/pageComponent";
import Button from "../../../components/buttonComponent";

const Chat: FC = () => {
  const [showUserList, setShowUserList] = useState<boolean>(false);
  return (
    <div className="flex grow flex-row min-h-full">
      <NavbarChild>
        <div className="flex flex-row space-x-4 px-5 text-white font-medium mb-2">
          {/*TODO: make cool transition for switch*/}
          <div className="border-b border-white hover:hover:bg-white/25 hover:rounded-full">
            Servers
          </div>
          <div>
            Direct Messages
          </div>
        </div>
        <NavbarItem onClick={() => console.log("clicked")}>
          <div className="w-12 h-12 flex-shrink-0 rounded-full border-black border"></div>
          <p className="truncate m-auto">Friend Namaaaaaaaaaaaaaaaaaa</p>
        </NavbarItem>
      </NavbarChild>
      <Page>
        {/* BAR */}
        <div className="flex flex-row h-16 border-b-2 border-black px-4">
          <p className="text-white text-xl font-bold m-auto grow truncate w-0">First server!</p>
          <div className="flex grow flex-row-reverse space-x-4 space-x-reverse">
            <MdPeople className="shrink-0 text-white h-10 w-10 my-auto" onClick={() => setShowUserList(!showUserList)} />
            <MdSettings className="shrink-0 text-white h-10 w-10 my-auto" />
          </div>
        </div>
        {/* CHAT */}
        <div className="flex grow flex-row">
          {/* CHAT HISTORY*/}
          <div className="flex grow flex-col">
            <div className="flex grow flex-col-reverse shrink-0 h-0 mx-4 py-5 overflow-y-auto space-y-reverse space-y-5">
              {[...Array(200)].map(() => <Msg content="hi" username="bob" created={111} modified={111} />)}
            </div>
            <div className="shrink-0 h-16 px-4">
              <div className="flex flex-row h-14 bg-shade-1 w-full rounded space-x-2 px-4 ">
                <MdOutlineAddCircle className="shrink-0 text-white h-10 w-10 my-auto" />
                {/* TODO: make textarea extend until certain height*/}
                <textarea rows={1} autoCorrect="off" placeholder="Type your message here!" className="block grow resize-none text-lg leading-relaxed text-white bg-shade-1 outline-0 my-1 p-2">
                </textarea>
                <Button type="button" value="Send" className="my-auto" />
              </div>
            </div>
          </div>
          {showUserList &&
            <div className="flex w-64 min-h-full flex-col bg-shade-2">
            </div>
          }
        </div>
      </Page>
    </div>
  );
};

export default Chat;
