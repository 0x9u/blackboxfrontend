import React, { FC, useState, useEffect, Fragment } from "react";
import { MdBlock, MdMessage, MdPersonAdd } from "react-icons/md";
import { RootState, useAppDispatch } from "../../app/store";
import { openDM } from "../../api/userApi";
import { useSelector } from "react-redux";
import {
  setCurrentChatMode,
  setCurrentDM,
  setShowChatUserList,
  setUserDMtobeOpened,
} from "../../app/slices/clientSlice";

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
  const selfUserId = useSelector((state: RootState) => state.user.selfUser);

  const userDMId = useSelector(
    (state: RootState) => state.user.dmUserIds[userid] ?? ""
  );

  const dispatch = useAppDispatch();

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
          className="h-12 w-12 shrink-0 select-none rounded-full border border-black"
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
            <div className="flex flex-row justify-end ">
              <div className="my-auto flex shrink-0 grow flex-row px-1">
                <img
                  src="./blackboxowner.png"
                  className="group/ownerBadge h-6 w-6"
                ></img>
                <div className="bg-gray-900 tooltip dark:bg-gray-700 group/ownerBade-hover:visible invisible absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300">
                  Owner
                </div>
              </div>
              <div className="flex flex-row space-x-2 rounded bg-shade-3 p-1">
                {userid !== selfUserId && (
                  <Fragment>
                    <MdMessage
                      className="h-8 w-8 cursor-pointer text-white hover:text-white/80 active:text-white/75"
                      onClick={() => {
                        if (userDMId === "") {
                          dispatch(setUserDMtobeOpened(userid)); //ws too fast sometimes so it has to be like this
                          dispatch(openDM(userid)).then((res) => {
                            if (res.meta.requestStatus === "rejected") {
                              dispatch(setUserDMtobeOpened(null));
                            }
                          });
                        } else {
                          dispatch(setCurrentDM(userDMId));
                          dispatch(setCurrentChatMode("dm"));
                          dispatch(setShowChatUserList(false));
                        }
                      }}
                    />
                    <MdPersonAdd className="h-8 w-8 cursor-pointer text-green hover:text-green/80 active:text-green/75" />
                    <MdBlock className="h-8 w-8 cursor-pointer text-red hover:text-red/80 active:text-red/75" />
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
