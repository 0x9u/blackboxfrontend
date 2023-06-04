import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setShowEditEmailModal,
  setShowEditProfilePictureModal,
} from "../../../app/slices/clientSlice";
import Button from "../../buttonComponent";
import Input from "../../inputComponent";
import ModalBottom from "../../modal/modalBottomComponent";
import Modal from "../../modal/modalComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UploadPic from "../../uploadPicComponent";
import { EditUserPictureForm } from "../../../api/types/user";
import { patchGuild } from "../../../api/guildApi";
import {
  patchUserPicture,
  usePatchUserPictureMutation,
} from "../../../api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

type editPictureForm = {
  picture: FileList;
  password: string;
};

const EditProfilePictureModal: FC = () => {
  const dispatch = useDispatch();

  const [patchUser, { error: patchUserError, status: patchUserStatus }] =
    usePatchUserPictureMutation();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<editPictureForm>({
    resolver: yupResolver(
      yup.object().shape({
        picture: yup
          .mixed()
          .required("Picture is required")
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
        password: yup.string().required("Password is required"),
      })
    ),
  });
  useEffect(() => {
    if (
      patchUserError &&
      (patchUserError as FetchBaseQueryError).status === 401
    ) {
      setError("password", {
        message: "Incorrect password",
      });
    } else if (
      patchUserError &&
      (patchUserError as FetchBaseQueryError).status === 400
    ) {
      setError("password", {
        message: "An error occured in the server",
      });
    } else if (patchUserStatus.valueOf() === "fulfilled") {
      dispatch(setShowEditProfilePictureModal(false));
    }
  }, [patchUserStatus, patchUserError]);
  return (
    <Modal
      title={"Edit Profile Picture"}
      exitFunc={() => {
        dispatch(setShowEditProfilePictureModal(false));
      }}
    >
      <form
        autoComplete="off"
        onSubmit={handleSubmit((data) => {
          const picture = data.picture[0];
          const body: EditUserPictureForm = {
            image: picture,
            password: data.password,
          };
          patchUser(body);
        })}
      >
        <div className="flex flex-col p-4 pt-0">
          <div className="h-32 w-32 px-16">
            <UploadPic width="32" height="32" register={register("picture")} />
            <p className=" text-center text-sm font-medium text-red">
              {errors.picture?.message}
            </p>
          </div>
          <Input
            label="Password"
            type="password"
            dark
            register={register("password")}
            error={errors.password}
          />
        </div>
        <ModalBottom>
          <Button value="Finish" type="submit" />
        </ModalBottom>
      </form>
    </Modal>
  );
};

export default EditProfilePictureModal;
