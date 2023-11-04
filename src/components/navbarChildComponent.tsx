import React, { FC } from "react";
import { MdSettings } from "react-icons/md";
import { useDispatch } from "react-redux";

import { setShowUserSettings } from "../app/slices/clientSlice";
import { useGetSelfQuery } from "../api/hooks/userHooks";

interface navbarChildProps {
  children: React.ReactNode; //buttons
}

const navbarChild: FC<navbarChildProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { userInfo, loaded } = useGetSelfQuery();

  const imageURL =
    userInfo.imageId !== "-1"
      ? `${import.meta.env.VITE_API_ENDPOINT}/api/files/user/${userInfo.imageId}`
      : "./blackboxuser.jpg";

  return (
    <div className="flex min-h-screen w-64 flex-col bg-shade-3">
      <div className="flex h-0 grow flex-col space-y-1">{children}</div>
      <div className="flex h-16 flex-row border-t border-shade-4 bg-shade-2 py-2 px-4">
        <img
          className="my-auto h-10 w-10 shrink-0 rounded-full border border-black"
          src={imageURL}
        ></img>
        <p className="m-auto ml-4 truncate text-lg font-bold leading-relaxed text-white">
          {!loaded ? "Loading..." : userInfo.name}
        </p>
        <MdSettings
          className="m-auto ml-10 h-8 w-8 shrink-0 cursor-pointer leading-relaxed text-white/90 hover:text-white/75 active:text-white/50"
          onClick={() => dispatch(setShowUserSettings(true))}
        />
      </div>
    </div>
  );
};

export default navbarChild;
