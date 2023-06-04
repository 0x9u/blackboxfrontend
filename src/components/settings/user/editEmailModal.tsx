import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowEditEmailModal } from "../../../app/slices/clientSlice";
import Button from "../../buttonComponent";
import Input from "../../inputComponent";
import ModalBottom from "../../modal/modalBottomComponent";
import Modal from "../../modal/modalComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EditUserEmailForm } from "../../../api/types/user";
import { usePatchUserEmailMutation } from "../../../api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

const EditEmailModal: FC = () => {
  const dispatch = useDispatch();
  const [patchUser, { error: patchUserError, status: patchUserStatus }] =
    usePatchUserEmailMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditUserEmailForm>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required("Email is required")
          .email("Email is invalid"),
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
      dispatch(setShowEditEmailModal(false));
    }
  }, [patchUserStatus, patchUserError]);
  return (
    <Modal
      title={"Edit Email"}
      exitFunc={() => {
        dispatch(setShowEditEmailModal(false));
      }}
    >
      <form
        autoComplete="off"
        onSubmit={handleSubmit((data) => {
          patchUser(data);
        })}
      >
        <div className="flex flex-col p-4 pt-0">
          <Input
            label="Email"
            dark
            register={register("email")}
            error={errors.email}
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

export default EditEmailModal;
