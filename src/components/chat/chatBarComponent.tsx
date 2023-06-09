//create empty component using FC
import React, { FC, Fragment, useState } from "react";
import {
  MdPeople,
  MdMail,
  MdSettings,
  MdMoreHoriz,
  MdOutlineExitToApp,
  MdClose,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowChatUserList,
  setShowCreateInviteModal,
  setShowGuildDMSettings,
} from "../../app/slices/clientSlice";
import { RootState } from "../../app/store";
import { leaveGuild } from "../../api/userApi";

const ChatBar: FC = () => {
  const dispatch = useDispatch();

  const [showMiniMenu, setShowMiniMenu] = useState<boolean>(false);

  const currentChatMode = useSelector(
    (state: RootState) => state.client.currentChatMode
  );

  const showChatUserList = useSelector(
    (state: RootState) => state.client.showChatUserList
  );

  const currentGuild = useSelector(
    (state: RootState) => state.client.currentGuild
  );

  const isOwner = useSelector(
    (state: RootState) =>
      state.guild.guilds[state.client.currentGuild || ""]?.ownerId ===
      state.user.selfUser
  );

  const isAdmin = useSelector(
    (state: RootState) =>
      state.user.guildAdminIds?.[state.client.currentGuild || ""]?.includes(
        state.user.selfUser || ""
      ) ?? false
  );

  const currentDM = useSelector((state: RootState) => state.client.currentDM);

  const currentGuildTitle = useSelector((state: RootState) =>
    currentChatMode === "dm"
      ? currentDM
        ? state.user.users[state.guild.dms[currentDM].userId]?.name
        : "Not Selected"
      : currentGuild
      ? state.guild.guilds[currentGuild]?.name
      : "Not Selected"
  );

  return (
    <div className="relative flex h-16 flex-row border-b border-black bg-shade-4 px-4 shadow-xl">
      <p className="m-auto w-0 grow truncate text-2xl font-bold text-white/90">
        {currentGuildTitle}
      </p>
      <div className="flex grow flex-row-reverse space-x-4 space-x-reverse">
        {currentChatMode === "guild" ? (
          <Fragment>
            <MdPeople
              className="my-auto h-10 w-10 shrink-0 cursor-pointer text-white/90 hover:text-white/75 active:text-white/50"
              onClick={() => dispatch(setShowChatUserList(!showChatUserList))}
            />
            <MdMoreHoriz
              className="my-auto h-10 w-10 shrink-0 cursor-pointer text-white/90 hover:text-white/75 active:text-white/50"
              onClick={() => setShowMiniMenu(!showMiniMenu)}
            />
            {showMiniMenu && (
              <div className="absolute top-16 z-20 flex w-44 flex-col space-y-2 rounded-b-sm bg-shade-2  p-2">
                <div
                  className="flex cursor-pointer select-none flex-row justify-between rounded p-2 text-white/90 hover:bg-white/50 hover:text-white/75 active:text-white/50"
                  onClick={() => {
                    dispatch(setShowCreateInviteModal(true));
                    setShowMiniMenu(false);
                  }}
                >
                  <label className="cursor-pointer">Invite</label>
                  <MdMail className="m-0 my-auto h-5 w-5 shrink-0" />
                </div>
                {(isOwner || isAdmin) && (
                  <div
                    className="flex cursor-pointer select-none flex-row justify-between rounded p-2 text-white/90 hover:bg-white/50 hover:text-white/75 active:text-white/50"
                    onClick={() => {
                      dispatch(setShowGuildDMSettings(true));
                      setShowMiniMenu(false);
                    }}
                  >
                    <label className="cursor-pointer">Room Settings</label>
                    <MdSettings className="my-auto h-5 w-5 shrink-0 " />
                  </div>
                )}
                {!isOwner && (
                  <div
                    className="flex cursor-pointer select-none flex-row justify-between rounded p-2 text-white/90 hover:bg-white/50 hover:text-white/75 active:text-white/50"
                    onClick={() => leaveGuild(currentGuild || "")}
                  >
                    <label className="cursor-pointer">Leave Room</label>
                    <MdOutlineExitToApp className="my-auto h-5 w-5 shrink-0" />
                  </div>
                )}
              </div>
            )}
            {showMiniMenu && (
              <div
                className="fixed inset-0 z-10 opacity-0"
                onClick={() => setShowMiniMenu(false)}
              />
            )}
          </Fragment>
        ) : (
          <Fragment>
            <MdClose className="my-auto h-10 w-10 shrink-0 cursor-pointer text-white/90 hover:text-white/75 active:text-white/50" />
            <label className="my-auto text-white">Close Direct Message</label>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ChatBar;
