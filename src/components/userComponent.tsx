import React, { FC } from "react";

interface userProps {
  username: string;
}

const User: FC<userProps> = ({ username }) => {
  return (
    <div className="flex flex-row space-x-4 px-4 py-1 hover:bg-black/25">
      <div className="h-12 w-12 shrink-0 rounded-full border border-black">
        {/* for pfp */}
      </div>
      <div className="flex flex-col">
        <p className="text-lg font-semibold text-white leading-relaxed m-auto">{username}</p>
      </div>
    </div>
  );
};

export default User;
