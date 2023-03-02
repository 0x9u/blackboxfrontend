import React, { FC } from "react";
import Bar from "../../../components/BarComponent";
import NavbarChild from "../../../components/navbarChildComponent";
import NavbarItem from "../../../components/navItemComponent";
import Page from "../../../components/pageComponent";

const Chat: FC = () => {
  return (
    <div className="flex grow flex-row min-h-full">
      <NavbarChild>
        <NavbarItem onClick={() => console.log("clicked")}>
          <div className="w-12 h-12 flex-shrink-0 rounded-full border-black border"></div>
          <p className="truncate m-auto">Friend Namaaaaaaaaaaaaaaaaaa</p>
        </NavbarItem>
      </NavbarChild>
      <Page>
        <div>
          <Bar>
            <p className="text-white text-xl font-bold m-auto grow truncate w-0">First server!</p>
          </Bar>
        </div>
      </Page>
    </div>
  );
};

export default Chat;
