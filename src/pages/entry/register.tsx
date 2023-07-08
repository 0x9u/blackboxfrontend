import React, { FC, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import Input from "../../components/inputComponent";
import Button from "../../components/buttonComponent";
import { createAccount, postAuth, RegisterReq } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import UploadPic from "../../components/uploadPicComponent";
import CropImageModal from "../../components/cropImageModalComponent";
import { ErrorBody } from "../../api/types/error";

interface RegisterProps {
  changeMode: () => void;
}

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  picture: FileList;
};

const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required("Username is required")
      .min(1, "too short")
      .max(32, "too long")
      .matches(/^[A-Za-z][A-Za-z0-9_]+$/, "Not valid character"),
    email: yup.string().email("Not a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .max(32, "Too long")
      .min(8, "Too short")
      .matches(/[A-Z]/, "must contain a uppercase letter")
      .matches(/\d/, "must contain a number")
      .matches(/[a-z]/, "must contain a lowercase letter"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    picture: yup
      .mixed()
      .test(
        "filesize",
        "The file is too large (must be under 5MB)",
        (value) => {
          return value.length === 0 || (value[0] && value[0].size <= 5000000); //5 MB max
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
  .required();
const Register: FC<RegisterProps> = ({ changeMode }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showCrop, setShowCrop] = useState<boolean>(false);

  return (
    <form
      className=" mx-auto flex flex-col rounded-xl bg-shade-3 py-4 px-8 shadow-2xl"
      onSubmit={handleSubmit((data) => {
        const body: RegisterReq = {
          name: data.username,
          password: data.password,
          email: data.email,
          image: data.picture?.[0] ?? null,
        };
        console.log(body);
        dispatch(createAccount(body)).then((action) => {
          if (action.type === createAccount.fulfilled.type) {
            navigate("/main");
          } else if (action.type === createAccount.rejected.type) {
            setError("username", {
              type: "manual",
              message: (action.payload as ErrorBody).error,
            });
          }
        });
      })}
    >
      <div className="flex flex-col py-4">
        <p className="mx-auto text-4xl font-bold text-white">
          Create an account
        </p>
      </div>
      <div className="mx-auto py-4">
        <div className="h-32 w-32 px-16">
          <UploadPic
            width="32"
            height="32"
            dark
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
        <Input
          error={errors.username}
          register={register("username")}
          label="username"
        />
        <Input
          label="email"
          error={errors.email}
          register={register("email")}
        />
        <Input
          type="password"
          label="password"
          error={errors.password}
          register={register("password")}
        />
        <Input
          type="password"
          label="confirm password"
          error={errors.confirmPassword}
          register={register("confirmPassword")}
        />
      </div>
      <div className="flex flex-col py-2 px-6">
        <Button type="submit" value="Register" />
      </div>
      <div className="flex flex-col py-4 text-sm">
        <a
          className="cursor-pointer text-center font-medium text-shade-5 hover:underline"
          onClick={changeMode}
        >
          Already have an account?
        </a>
      </div>
      {showCrop && (
        <CropImageModal
          exitFunc={() => setShowCrop(false)}
          getValues={getValues}
          setValue={setValue}
        />
      )}
    </form>
  );
};

export default Register;
