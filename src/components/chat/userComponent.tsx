import React, { FC, useState, useEffect } from "react";
import { MdBlock, MdPersonAdd } from "react-icons/md";

interface userProps {
  userid: string;
  username: string;
  userImageId: string;
  owner: boolean;
  admin: boolean;
}

const User: FC<userProps> = ({
  username,
  userid,
  userImageId,
  owner,
  admin,
}) => {
  const [test, setTest] = useState<boolean>(false);
  const myRef = React.useRef<HTMLDivElement>(null);
  const pos = myRef.current?.getBoundingClientRect();

  const imageURL =
    userImageId !== "-1"
      ? `http://localhost:8080/api/files/user/${userImageId}`
      : "./blackboxuser.jpg";
  return (
    <div>
      <div
        className="flex cursor-pointer flex-row space-x-4 px-4 py-1 hover:bg-black/25"
        onClick={(e) => {
          setTest(true);
        }}
        ref={myRef}
      >
        <img
          className="h-12 w-12 shrink-0 rounded-full border border-black select-none"
          src={imageURL}
        >
          {/* for pfp */}
        </img>
        <div className="flex flex-col">
          <p className="m-auto select-none text-lg font-semibold leading-relaxed text-white">
            {username}
            {owner ? "👑" : admin ? "🛡️" : ""}
          </p>
        </div>
      </div>
      {test && (
        <div className="fixed inset-0" onClick={() => setTest(false)}></div>
      )}
      {test && (
        <div
          className="h-34 fixed w-64 rounded-sm bg-shade-2"
          style={{
            top: `${pos?.top ?? 0}px`,
            left: `calc(${pos?.left ?? 0}px - 16rem - 0.5rem)`,
          }}
        >
          <div className="flex flex-col p-2">
            <div className="flex flex-row space-x-4">
              <img
                className="h-20 w-20 shrink-0 rounded-full border border-black"
                src={imageURL}
              ></img>
              <p className="my-auto text-ellipsis text-xl font-semibold text-white">
                {username}
              </p>
            </div>
            <div className=" ml-auto flex flex-row justify-end space-x-2 rounded bg-shade-3 p-1">
              <MdPersonAdd className="h-8 w-8 text-green hover:text-green/80 active:text-green/75" />
              <MdBlock className="h-8 w-8 text-red hover:text-red/80 active:text-red/75" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
