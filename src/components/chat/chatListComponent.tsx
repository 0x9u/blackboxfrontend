//make empty component with FC
import React, { FC, useEffect, useRef, useState } from "react";
import NavbarItem from "../navItemComponent";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentDM,
  setCurrentGuild,
  setShowAddChatModal,
} from "../../app/slices/clientSlice";
import { SkeletonLoaderChatList } from "../skeletonLoaderComponent";
import { useGetGuildDms } from "../../api/hooks/userHooks";
import { loadGuildMembers } from "../../api/hooks/guildHooks";

const ChatList: FC = () => {
  const dispatch = useDispatch();

  const {
    guilds,
    dms,
    loaded,
    users,
    currentChatMode,
    currentDM,
    currentGuild,
  } = useGetGuildDms();

  loadGuildMembers();
  

  const [firstRender, setFirstRender] = useState<boolean>(true);

  const lastGuildRef = useRef<HTMLDivElement>(null);
  const lastDMRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentChatMode === "guild") {
      if (firstRender && loaded) {
        setFirstRender(false);
        return;
      }
      lastGuildRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [guilds.length]);

  useEffect(() => {
    if (currentChatMode === "dm") {
      if (firstRender && loaded) {
        setFirstRender(false);
        return;
      }
      lastDMRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [dms.length]);

  return (
    <div className="list-scrollbar flex h-0 grow flex-col space-y-1 overflow-y-auto py-1 px-2">
      <NavbarItem onClick={() => dispatch(setShowAddChatModal(true))}>
        <MdAdd className="h-12 w-12 shrink-0"></MdAdd>
        <p className="m-auto truncate px-2 leading-relaxed">Add Chat</p>
      </NavbarItem>
      {!loaded ? (
        <SkeletonLoaderChatList />
      ) : currentChatMode === "dm" ? (
        dms.map((dm) => {
          const userImageId = users[dm.userId].imageId;
          const imageURL =
            userImageId !== "-1"
              ? `http://localhost:8080/api/files/user/${userImageId}`
              : "./blackboxuser.jpg";
          return (
            <NavbarItem
              onClick={() => dispatch(setCurrentDM(dm.id))}
              selected={dm.id === currentDM}
              key={dm.id}
              innerRef={
                dm.id === dms[dms.length - 1].id ? lastDMRef : undefined
              }
            >
              <img
                className={`h-12 w-12 flex-shrink-0 rounded-full ${
                  dm.unread.count > 0
                    ? "animate-pulse border-2"
                    : "border border-black"
                }`}
                src={imageURL}
              ></img>
              <p className="my-auto truncate px-2 leading-relaxed">
                {dm.id
                  ? users[dm.userId].name ?? "user not found"
                  : "Non existant"}
              </p>
            </NavbarItem>
          );
        })
      ) : (
        guilds.map((guild) => (
          <NavbarItem
            onClick={() => dispatch(setCurrentGuild(guild.id))}
            selected={guild.id === currentGuild}
            key={guild.id}
            innerRef={
              guild.id === guilds[guilds.length - 1].id
                ? lastGuildRef
                : undefined
            }
          >
            <img
              className={`h-12 w-12 flex-shrink-0 rounded-full  ${
                guild.unread.count > 0
                  ? "border-2 border-white"
                  : "border border-black"
              }`}
              src={
                guild.imageId !== "-1"
                  ? `http://localhost:8080/api/files/guild/${guild.imageId}`
                  : `./blackboxuser.jpg`
              }
            />
            <p className="my-auto truncate px-2 leading-relaxed">
              {guild.name}
            </p>
            {guild.unread.mentions > 0 && (
              <div className="absolute left-8 top-2 h-4 w-4 rounded-full bg-red text-center text-xs leading-relaxed text-white">
                {guild.unread.mentions ?? 0}
              </div>
            )}
          </NavbarItem>
        ))
      )}
    </div>
  );
};

export default ChatList;
