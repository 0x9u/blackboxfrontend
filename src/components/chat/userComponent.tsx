import React, { FC, useState } from "react";

interface userProps {
  username: string;
  userImageId: string;
  owner: boolean;
  admin: boolean;
}

const User: FC<userProps> = ({ username, userImageId, owner, admin }) => {
  const [test, setTest] = useState<boolean>(false);
  const imageURL =
    userImageId !== "-1"
      ? `http://localhost:8080/api/files/user/${userImageId}`
      : "./blackboxuser.jpg";
  return (
    <div
      className="flex cursor-pointer flex-row space-x-4 px-4 py-1 hover:bg-black/25"
      onClick={() => setTest(!test)}
    >
      <img
        className="h-12 w-12 shrink-0 rounded-full border border-black"
        src={imageURL}
      >
        {/* for pfp */}
      </img>
      <div className="flex flex-col">
        <p className="m-auto text-lg font-semibold leading-relaxed text-white">
          {username}{owner ? "👑" : admin ? "🛡️" : ""}
        </p>
      </div>
      {test && (
        <div className="w-22 absolute inset-0 -left-48 h-48 bg-white">
          testing
        </div>
      )}
    </div>
  );
};

export default User;
