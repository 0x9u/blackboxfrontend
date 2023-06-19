import React, { FC, useState, useEffect } from "react";
import Button from "../buttonComponent";
import CheckBox from "../checkBoxComponent";
import Input from "../inputComponent";
import Modal from "../modal/modalComponent";
import ModalBottom from "../modal/modalBottomComponent";
import UploadPic from "../uploadPicComponent";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setShowAddChatModal } from "../../app/slices/clientSlice";
import { Guild, GuildList, GuildUpload, Invite } from "../../api/types/guild";
import { useJoinGuild } from "../../api/hooks/guildHooks";
import { createGuild } from "../../api/guildApi";
import { useAppDispatch } from "../../app/store";

const ChatModal: FC = () => {
  const [chatModalMode, setChatModalMode] = useState<"Create" | "Join" | null>(
    null
  );

  const dispatch = useAppDispatch();

  const { callFunction: joinGuild, error, status } = useJoinGuild();

  interface createChatForm {
    name: string;
    save: boolean;
    picture: FileList;
  }

  const {
    register: registerCreate,
    handleSubmit: handleCreateSubmit,
    formState: { errors: errorsCreate },
  } = useForm<createChatForm>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup
          .string()
          .required("Name is required")
          .min(6, "Name must be 6 characters long")
          .max(16, "Name cannot exceed 16 characters"),
        save: yup.boolean(),
        picture: yup
          .mixed()
          .test(
            "filesize",
            "The file is too large (must be under 5MB)",
            (value) => {
              return (
                value.length === 0 || (value[0] && value[0].size <= 5000000)
              ); //5 MB max
            }
          )
          .test("filetype", "The file is not an image", (value) => {
            return (
              (value[0] &&
                (value[0].type === "image/jpeg" ||
                  value[0].type === "image/png" ||
                  value[0].type === "image/jpg" ||
                  value[0].type === "image/gif")) ||
              value.length === 0
            );
          }),
      })
    ),
  });

  const {
    register: registerInvite,
    handleSubmit: handleInviteSubmit,
    setError: setInviteError,
    formState: { errors: errorsInvite },
  } = useForm<{ invite: string }>({
    resolver: yupResolver(
      yup.object().shape({
        invite: yup
          .string()
          .required("Invite is required")
          .length(10, "Invite code must be 10 characters"),
      })
    ),
  });

  return (
    <Modal
      title={
        chatModalMode === null
          ? "Add Chat"
          : chatModalMode === "Create"
          ? "Create Chat"
          : "Join Chat"
      }
      exitFunc={() => {
        dispatch(setShowAddChatModal(false));
        setChatModalMode(null);
      }}
    >
      <div className="flex flex-row space-x-10">
        {chatModalMode === null ? (
          <div className="space-y-5 font-medium">
            <div className="flex flex-row space-x-4">
              <p className="my-auto grow">Want to create a new chat?</p>
              <Button
                value="Create Chat"
                type="button"
                onClick={() => setChatModalMode("Create")}
              />
            </div>

            <div className="flex flex-row space-x-4">
              <p className="my-auto grow">Or join an existing one?</p>
              <Button
                value="Join Chat"
                type="button"
                onClick={() => setChatModalMode("Join")}
              />
            </div>
          </div>
        ) : chatModalMode === "Create" ? (
          <form
            onSubmit={handleCreateSubmit((data) => {
              const picture = data.picture[0];
              const body: GuildUpload = {
                body: {
                  name: data.name,
                  saveChat: data.save,
                } as Guild,
                image: picture || null,
              };
              dispatch(createGuild(body));
              dispatch(setShowAddChatModal(false));
              setChatModalMode(null);
            })}
          >
            <div className="space-y-2">
              <div className="h-32 w-32 px-16">
                <UploadPic
                  width="32"
                  height="32"
                  register={registerCreate("picture")}
                />
              </div>
              <p className=" text-center text-sm font-medium text-red">
                {errorsCreate.picture?.message}
              </p>
              <Input
                label="Chat Name"
                dark
                register={registerCreate("name")}
                error={errorsCreate.name}
              />
              <div className="flex flex-row justify-between">
                <p className="my-auto text-sm font-semibold uppercase">
                  Save Chat
                </p>
                <CheckBox register={registerCreate("save")} />
              </div>
            </div>
            <div className="-mx-4 -mb-4 mt-4 flex flex-row justify-end space-x-2 border-t-2 border-gray py-2 px-2">
              <Button
                value="Cancel"
                type="button"
                gray
                onClick={() => setChatModalMode(null)}
              />
              <Button value="Create" type="submit" />
            </div>
          </form>
        ) : (
          <form
            className="-mt-4"
            onSubmit={handleInviteSubmit((d) => {
              joinGuild(d as Invite);
            })}
          >
            <Input
              label="Invite Code"
              dark
              register={registerInvite("invite")}
              error={errorsInvite.invite}
            />
            <ModalBottom>
              <Button
                value="Cancel"
                type="button"
                gray
                onClick={() => setChatModalMode(null)}
              />
              <Button value="Join" type="submit" />
            </ModalBottom>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default ChatModal;
