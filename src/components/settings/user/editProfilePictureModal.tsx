import React, { FC, useEffect, useState } from "react";
import { setShowEditProfilePictureModal } from "../../../app/slices/clientSlice";
import Button from "../../buttonComponent";
import Input from "../../inputComponent";
import ModalBottom from "../../modal/modalBottomComponent";
import Modal from "../../modal/modalComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UploadPic from "../../uploadPicComponent";
import { EditUserPictureForm } from "../../../api/types/user";
import { useEditUserPicture } from "../../../api/hooks/userHooks";
import { useAppDispatch } from "../../../app/store";
import CropPic from "../../cropPicComponent";

type editPictureForm = {
  picture: FileList;
  password: string;
};

const EditProfilePictureModal: FC = () => {
  const dispatch = useAppDispatch();
  const [showCrop, setShowCrop] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    trigger,
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
  const { callFunction: editUserPicture, error, status } = useEditUserPicture();
  useEffect(() => {
    if (status === "failed") {
      setError("password", {
        message: error?.error,
      });
    } else if (status === "finished") {
      dispatch(setShowEditProfilePictureModal(false));
    }
  }, [status]);
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
          editUserPicture(body);
        })}
      >
        {showCrop ? (
          <CropPic
            setValue={setValue}
            getValues={getValues}
            onFinish={() => {
              setShowCrop(false);
              trigger("picture");
            }}
          />
        ) : (
          <div className="flex flex-col p-4 pt-0">
            <div className="h-32 w-32 px-16">
              <UploadPic
                width="32"
                height="32"
                image={getValues("picture")?.[0]}
                register={register("picture", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    var img = new Image();
                    var file = e.target.files![0];
                    if (file) {
                      img = new Image();
                      var objectURL = URL.createObjectURL(file);
                      img.onload = function () {
                        if (img.width !== img.height) {
                          console.log("square");
                          setShowCrop(true);
                        }
                        URL.revokeObjectURL(objectURL);
                      };
                      img.src = objectURL;
                    }
                  },
                })}
              />
            </div>
            <p className=" text-center text-sm font-medium text-red">
              {errors.picture?.message}
            </p>
            <Input
              label="Password"
              type="password"
              dark
              register={register("password")}
              error={errors.password}
            />
          </div>
        )}
        <ModalBottom>
          <Button value="Finish" type="submit" disabled={showCrop} />
        </ModalBottom>
      </form>
    </Modal>
  );
};

export default EditProfilePictureModal;
