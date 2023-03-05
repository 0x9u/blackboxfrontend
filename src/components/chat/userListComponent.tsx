import React, { FC } from "react";
import User from "./userComponent";

const UserList: FC = () => {
  return (
    <div className="list-scrollbar flex h-full w-64 shrink-0 flex-col space-y-2 overflow-y-auto bg-shade-3 py-2">
      {[...Array(50)].map(() => (
        <User username="bob" />
      ))}
    </div>
  );
};

export default UserList;