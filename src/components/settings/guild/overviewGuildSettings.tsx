import React, { FC, useState, useEffect } from "react";
import UploadPic from "../../uploadPicComponent";
import Input from "../../inputComponent";
import CheckBox from "../../checkBoxComponent";
import Button from "../../buttonComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Guild, GuildUpload } from "../../../api/types/guild";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usePatchGuildMutation } from "../../../api/guildApi";

const OverviewGuildSettings: FC = () => {
  const [formEdited, setFormEdited] = useState<boolean>(false);
  const currentGuild = useSelector(
    (state: RootState) => state.client.currentGuild
  );
  const guildInfo = useSelector(
    (state: RootState) =>
      state.guild.guilds[currentGuild || ""] || ({} as Guild)
  );
  const guildImageURL =
    guildInfo.imageId !== "-1"
      ? `http://localhost:8080/api/files/guild/${guildInfo.imageId}`
      : `./blackboxuser.jpg`;


  const [editGuild] = usePatchGuildMutation();

  interface editChatForm {
    name: string;
    save: boolean;
    picture: FileList;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<editChatForm>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup
          .string()
          .required("Name is required")
          .min(6, "Name must be 6 characters long")
          .max(64, "Name cannot exceed 64 characters"),
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

  useEffect(() => {
    setValue("name", guildInfo.name);
    setValue("save", guildInfo.saveChat);
  }, [guildInfo]);

  return (
    <form
      onChange={(e) => setFormEdited(true)}
      onSubmit={handleSubmit((data) => {
        const picture = data.picture[0];
        const body: GuildUpload = {
          body: {
            name: data.name,
            saveChat: data.save,
          } as Guild,
          image: picture || null,
        };
        editGuild({id : currentGuild || "",body});
        setFormEdited(false);
      })}
      className="relative h-full"
    >
      <h1 className="mb-5 text-2xl text-white">Room Overview</h1>
      <div className="flex flex-row space-x-32 border-b-2 border-gray pb-12">
        <div className="space-y-2">
          <UploadPic
            width="32"
            height="32"
            dark
            url={guildImageURL}
            register={register("picture")}
          />
          <p className="text-center text-xs text-white/75">
            Minimum size 128x128
          </p>
        </div>
        <div className="my-auto">
          <Input label="server name" register={register("name")} />
        </div>
      </div>
      <div className="flex flex-row justify-between py-4 px-2">
        <p className="text-lg text-white">Save Chat?</p>
        <CheckBox register={register("save")} checked={guildInfo.saveChat} />
      </div>
      <div
        className={`fixed w-[620px] bg-shade-2 ${
          formEdited ? "-translate-y-4" : "translate-y-16"
        } bottom-0 flex h-12 flex-row rounded-md px-4 text-white transition duration-200`}
      >
        <p className="my-auto">You made some changes</p>
        <div className="my-auto flex grow flex-row justify-end space-x-2">
          <Button
            value="Cancel"
            type="button"
            gray
            className="h-8"
            onClick={() => {
              setFormEdited(false);
            }}
          />
          <Button value="Submit" type="submit" className="h-8" />
        </div>
      </div>
    </form>
  );
};

export default OverviewGuildSettings;
