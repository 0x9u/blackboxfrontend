import React, { FC, useState } from "react";

interface userProps {
  username: string;
}

const User: FC<userProps> = ({ username }) => {
  const [test, setTest] = useState<boolean>(false);
  return (
    <div className="flex flex-row space-x-4 px-4 py-1 hover:bg-black/25 cursor-pointer" onClick={() => setTest(!test)}>
      <div className="h-12 w-12 shrink-0 rounded-full border border-black">
        {/* for pfp */}
      </div>
      <div className="flex flex-col">
        <p className="text-lg font-semibold text-white leading-relaxed m-auto">{username}</p>
      </div>
      {test && <div className="absolute inset-0 -left-48 w-22 h-48 bg-white">
        testing
      </div>}
    </div>
  );
};

export default User;
