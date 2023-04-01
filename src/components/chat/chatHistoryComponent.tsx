import React, { FC } from "react";


import Msg from "./msgComponent";
import ChatInput from "./chatInputComponent";


const ChatHistory: FC = () => {
  return (
    <div className="flex grow flex-col">
    <div className="flex h-0 shrink-0 grow flex-col-reverse space-y-5 space-y-reverse overflow-y-auto py-5">
      {[...Array(15)].map(() => (
        <Msg
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
          username="bob"
          created={111}
          modified={111}
        />
      ))}
      {[...Array(15)].map(() => (
        <Msg
          content="<@bruhmomento:23> <@bruhmomentasdas:23> <@basdasd:23>"
          username="bob"
          created={111}
          modified={111}
        />
      ))}
    </div>
    <ChatInput/>
  </div>
  );
};

export default ChatHistory;
