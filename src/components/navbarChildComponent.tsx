import React, { FC } from "react";
import { MdSettings } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import { useGetSelfQuery } from "../api/userApi";
import { setShowUserSettings } from "../app/slices/clientSlice";
import { RootState } from "../app/store";

interface navbarChildProps {
  children: React.ReactNode; //buttons
}

const navbarChild: FC<navbarChildProps> = ({ children }) => {
  const dispatch = useDispatch();
  const {isLoading} = useGetSelfQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const username = useSelector((state: RootState) => state.user.users[state.user.selfUser || ""]?.name ?? "Unavailable");
  const userImageId = useSelector((state: RootState) => state.user.users[state.user.selfUser || ""]?.imageId ?? "-1");
  const imageURL = userImageId !== "-1" ? `http://localhost:8080/api/files/user/${userImageId}` : "./blackboxuser.jpg";
  return (
    <div className="flex min-h-screen w-64 flex-col bg-shade-3">
      {/* got it working after 1 hour of debugging css*/}
      <div className="flex flex-col grow h-0 space-y-1">{children}</div>
      <div className="flex h-16 flex-row border-shade-4 border-t py-2 px-4 bg-shade-2">
        <img className="h-10 w-10 my-auto shrink-0 border-black border rounded-full" src={imageURL}>
        </img>
        <p className="text-lg text-white truncate font-bold m-auto ml-4 leading-relaxed">
          {
            isLoading ? "Loading..." : username
          }
          </p>
        <MdSettings className="m-auto shrink-0 text-white/90 hover:text-white/75 active:text-white/50 cursor-pointer h-8 w-8 ml-10 leading-relaxed" onClick={() => dispatch(setShowUserSettings(true))}/>
      </div>
    </div>
  );
};

export default navbarChild;
