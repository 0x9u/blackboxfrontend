import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowEditUsernameModal } from "../../../app/slices/clientSlice";
import Button from "../../buttonComponent";
import Input from "../../inputComponent";
import ModalBottom from "../../modal/modalBottomComponent";
import Modal from "../../modal/modalComponent";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { usePatchUserNameMutation } from "../../../api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { EditUserNameForm } from "../../../api/types/user";

const EditUsernameModal: FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditUserNameForm>({
    resolver: yupResolver(
      yup.object().shape({
        username: yup
          .string()
          .min(1, "too short")
          .max(32, "too long")
          .matches(/^[A-Za-z][A-Za-z0-9_]+$/, "Not valid character")
          .required("Username is required"),
        password: yup.string().required("Password is required"),
      })
    ),
  });
  const [patchUserName, { error: patchUserError, status: patchUserStatus }] =
    usePatchUserNameMutation();

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
      (patchUserError as FetchBaseQueryError).status === 409
    ) {
      setError("username", {
        message: "Username already taken",
      });
    } else if (
      patchUserError &&
      (patchUserError as FetchBaseQueryError).status === 400
    ) {
      setError("password", {
        message: "An error occured in the server",
      });
    } else if (patchUserStatus.valueOf() === "fulfilled") {
      dispatch(setShowEditUsernameModal(false));
    }
  }, [patchUserStatus, patchUserError]);

  return (
    <Modal
      title={"Edit Username"}
      exitFunc={() => {
        dispatch(setShowEditUsernameModal(false));
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          patchUserName(data);
        })}
      >
        <div className="flex flex-col p-4 pt-0">
          <Input
            label="Username"
            type="text"
            dark
            register={register("username")}
            error={errors.username}
          />
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

export default EditUsernameModal;
