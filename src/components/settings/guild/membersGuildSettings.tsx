import React, { FC } from "react";
import { useSelector } from "react-redux";
import {
  banGuildMember,
  createGuildAdmin,
  deleteGuildAdmin,
  kickGuildMember,
  makeOwner,
} from "../../../api/guildApi";
import { RootState, useAppDispatch } from "../../../app/store";
import Button from "../../buttonComponent";
import { useGetGuildMembers } from "../../../api/hooks/guildHooks";

const MembersGuildSettings: FC = () => {
  const dispatch = useAppDispatch();
  const userIsOwner = useSelector(
    (state: RootState) =>
      state.guild.guilds[state.client.currentGuild ?? ""]?.ownerId ===
      state.user.selfUser
  );

  const userIsAdmin = useSelector(
    (state: RootState) =>
      state.user.guildAdminIds[state.client.currentGuild ?? ""]?.includes(
        state.user.selfUser ?? ""
      ) ?? false
  );

  const { currentGuild, guildMembers, guildMembersOrder, loaded } =
    useGetGuildMembers();

  return (
    <div>
      <h1 className="mb-5 text-2xl text-white">Members</h1>
      <div className="flex h-96 flex-col border-b-2 border-t-2 border-gray p-2 text-white">
        <div className="col mb-2 flex flex-row justify-between text-lg font-medium">
          <p>Name</p>
          <p className="mr-6">Actions</p>
        </div>
        <div className="h-full w-full space-y-2 overflow-auto">
          {guildMembersOrder.map((id: string) => (
            <div
              className="text-md flex flex-row justify-between"
              key={`${currentGuild}-${id}`}
            >
              <div className="flex flex-row space-x-2">
                <img
                  className="h-10 w-10 rounded-full border-2 border-black"
                  src={
                    guildMembers[id]?.userInfo.imageId !== "-1"
                      ? `http://localhost:8080/api/files/user/${guildMembers[id]?.userInfo.imageId}`
                      : "./blackboxuser.jpg"
                  }
                ></img>
                <p className="m-auto text-lg text-white/75">
                  {guildMembers[id]?.userInfo.name}
                  {guildMembers[id]?.owner
                    ? "👑"
                    : guildMembers[id]?.admin
                    ? "🛡️"
                    : ""}
                </p>
              </div>
              <div className="flex flex-row space-x-2">
                {!guildMembers[id]?.owner &&
                  !guildMembers[id]?.admin &&
                  userIsOwner && (
                    <Button
                      value="Make Admin"
                      type="button"
                      className="m-auto h-8 w-28 px-0"
                      onClick={() =>
                        dispatch(
                          createGuildAdmin({
                            id: currentGuild || "",
                            userId: id,
                          })
                        )
                      }
                    />
                  )}
                {!guildMembers[id]?.owner &&
                  guildMembers[id]?.admin &&
                  userIsOwner && (
                    <Button
                      value="Remove Admin"
                      type="button"
                      className="m-auto h-8 w-32 px-0"
                      onClick={() =>
                        dispatch(
                          deleteGuildAdmin({
                            id: currentGuild || "",
                            userId: id,
                          })
                        )
                      }
                    />
                  )}
                {!guildMembers[id]?.owner && userIsOwner && (
                  <Button
                    value="Make Owner"
                    type="button"
                    className="m-auto h-8 w-28 px-0"
                    onClick={() =>
                      dispatch(
                        makeOwner({
                          id: currentGuild || "",
                          userId: id,
                        })
                      )
                    }
                  />
                )}
                {!guildMembers[id]?.owner &&
                  !guildMembers[id]?.admin &&
                  (userIsAdmin || userIsOwner) && (
                    <Button
                      value="Kick"
                      type="button"
                      gray
                      className="m-auto h-8 w-12 px-0"
                      onClick={() =>
                        dispatch(
                          kickGuildMember({
                            id: currentGuild || "",
                            userId: id,
                          })
                        )
                      }
                    />
                  )}
                {!guildMembers[id]?.owner &&
                  !guildMembers[id]?.admin &&
                  (userIsAdmin || userIsOwner) && (
                    <Button
                      value="Ban"
                      type="button"
                      className="m-auto h-8 w-12 px-0"
                      onClick={() =>
                        dispatch(
                          banGuildMember({
                            id: currentGuild || "",
                            userId: id,
                          })
                        )
                      }
                    />
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersGuildSettings;
