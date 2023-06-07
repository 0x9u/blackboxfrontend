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
import { useGetGuildsQuery } from "../../api/userApi";
import { RootState } from "../../app/store";
import { SkeletonLoaderChatList } from "../skeletonLoaderComponent";

const ChatList: FC = () => {
  const dispatch = useDispatch();

  const guildListLoaded = useSelector(
    (state: RootState) => state.client.guildListLoaded
  );

  const { isLoading } = useGetGuildsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    skip: guildListLoaded,
  });

  const guilds = useSelector((state: RootState) => state.guild.guilds);
  const dms = useSelector((state: RootState) => state.guild.dms);
  const users = useSelector((state: RootState) => state.user.users);

  const dmIds = useSelector((state: RootState) => state.guild.dmIds);
  const guildIds = useSelector((state: RootState) => state.guild.guildIds);

  const currentChatMode = useSelector(
    (state: RootState) => state.client.currentChatMode
  );

  const currentGuild = useSelector(
    (state: RootState) => state.client.currentGuild
  );

  const currentDM = useSelector((state: RootState) => state.client.currentDM);

  const [firstRender, setFirstRender] = useState<boolean>(true);

  const lastGuildRef = useRef<HTMLDivElement>(null);
  const lastDMRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentChatMode === "guild") {
      if (firstRender && !isLoading) {
        setFirstRender(false);
        return;
      }
      lastGuildRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [guildIds.length]);

  useEffect(() => {
    if (currentChatMode === "dm") {
      if (firstRender && !isLoading) {
        setFirstRender(false);
        return;
      }
      lastDMRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [dmIds.length]);

  return (
    <div className="list-scrollbar flex h-0 grow flex-col space-y-1 overflow-y-auto py-1 px-2">
      <NavbarItem onClick={() => dispatch(setShowAddChatModal(true))}>
        <MdAdd className="h-12 w-12 shrink-0"></MdAdd>
        <p className="m-auto truncate px-2 leading-relaxed">Add Chat</p>
      </NavbarItem>
      {isLoading ? (
        <SkeletonLoaderChatList />
      ) : currentChatMode === "dm" ? (
        dmIds.map((id) => {
          const userImageId = users[dms[id].userId].imageId;
          const imageURL =
            userImageId !== "-1"
              ? `http://localhost:8080/api/files/user/${userImageId}`
              : "./blackboxuser.jpg";
          return (
            <NavbarItem
              onClick={() => dispatch(setCurrentDM(id))}
              selected={id === currentDM}
              key={id}
              innerRef={id === dmIds[dmIds.length - 1] ? lastDMRef : undefined}
            >
              <img
                className={`h-12 w-12 flex-shrink-0 rounded-full ${
                  guilds[id].unread.count > 0
                    ? "animate-pulse border-2"
                    : "border border-black"
                }`}
                src={imageURL}
              ></img>
              <p className="my-auto truncate px-2 leading-relaxed">
                {dms[id]
                  ? users[dms[id].userId].name ?? "user not found"
                  : "Non existant"}
              </p>
            </NavbarItem>
          );
        })
      ) : (
        guildIds.map((id) => (
          <NavbarItem
            onClick={() => dispatch(setCurrentGuild(id))}
            selected={id === currentGuild}
            key={id}
            innerRef={
              id === guildIds[guildIds.length - 1] ? lastGuildRef : undefined
            }
          >
            <img
              className={`h-12 w-12 flex-shrink-0 rounded-full  ${
                guilds[id].unread.count > 0
                  ? "border-2 border-white"
                  : "border border-black"
              }`}
              src={
                guilds[id].imageId !== "-1"
                  ? `http://localhost:8080/api/files/guild/${guilds[id].imageId}`
                  : `./blackboxuser.jpg`
              }
            />
            <p className="my-auto truncate px-2 leading-relaxed">
              {guilds[id] ? guilds[id].name : "Non existant"}
            </p>
            {guilds[id].unread.mentions > 0 && (
              <div className="absolute left-8 top-2 h-4 w-4 rounded-full bg-red text-center text-xs leading-relaxed text-white">
                {guilds[id].unread.mentions ?? 0}
              </div>
            )}
          </NavbarItem>
        ))
      )}
    </div>
  );
};

export default ChatList;
