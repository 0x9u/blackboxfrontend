//create empty component using FC
import React, { FC, Fragment, useState } from "react";
import { MdPeople, MdMail, MdSettings, MdMoreHoriz, MdOutlineExitToApp, MdClose } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import { setShowChatUserList, setShowCreateInviteModal, setShowGuildDMSettings } from "../../app/slices/clientSlice";
import { RootState } from "../../app/store";

const ChatBar: FC = () => {
  const dispatch = useDispatch();

  const [showMiniMenu, setShowMiniMenu] = useState<boolean>(false);

  const currentChatMode = useSelector(
    (state: RootState) => state.client.currentChatMode
  );

  const showChatUserList = useSelector((state: RootState) => state.client.showChatUserList);

  return (
    <div className="relative flex h-16 flex-row border-b border-black bg-shade-4 px-4 shadow-xl">
      <p className="m-auto w-0 grow truncate text-2xl font-bold text-white/90">
        First server!
      </p>
      <div className="flex grow flex-row-reverse space-x-4 space-x-reverse">
        {currentChatMode === "guild" ?
          <Fragment><MdPeople
            className="my-auto h-10 w-10 shrink-0 text-white/90 hover:text-white/75 cursor-pointer active:text-white/50"
            onClick={() => dispatch(setShowChatUserList(!showChatUserList))}
          />
            <MdMoreHoriz className="my-auto h-10 w-10 shrink-0 text-white/90 hover:text-white/75 cursor-pointer active:text-white/50" onClick={() => setShowMiniMenu(!showMiniMenu)} />
            {showMiniMenu &&
              < div className="flex flex-col z-20 absolute bg-shade-2 top-16 w-44 space-y-2 p-2  rounded-b-sm">
                <div className="flex flex-row justify-between select-none text-white/90 hover:text-white/75 hover:bg-white/50 rounded p-2 active:text-white/50 cursor-pointer" onClick={() => { dispatch(setShowCreateInviteModal(true)); setShowMiniMenu(false); }} >
                  <label className="cursor-pointer">Invite</label>
                  <MdMail className="my-auto m-0 h-5 w-5 shrink-0" />
                </div>
                <div className="flex flex-row justify-between select-none text-white/90 hover:text-white/75 hover:bg-white/50 rounded p-2 active:text-white/50 cursor-pointer" onClick={() => { dispatch(setShowGuildDMSettings(true)); setShowMiniMenu(false); }} >
                  <label className="cursor-pointer">Room Settings</label>
                  <MdSettings className="my-auto h-5 w-5 shrink-0 " /></div>
                <div className="flex flex-row justify-between select-none text-white/90 hover:text-white/75 hover:bg-white/50 rounded p-2 active:text-white/50 cursor-pointer">
                  <label className="cursor-pointer">Leave Room</label>
                  <MdOutlineExitToApp className="my-auto h-5 w-5 shrink-0" />
                </div>
              </div>
            }
            {showMiniMenu && <div className="fixed inset-0 z-10 opacity-0" onClick={() => setShowMiniMenu(false)} />}
          </Fragment>
          : <Fragment><MdClose className="my-auto h-10 w-10 shrink-0 text-white/90 hover:text-white/75 cursor-pointer active:text-white/50" /><label className="my-auto text-white">Close Direct Message</label></Fragment>}
      </div>
    </div >
  )
}

export default ChatBar;