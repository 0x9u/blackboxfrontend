import React, { FC, useEffect, useState } from "react";
import { setShowEditEmailModal } from "../../../app/slices/clientSlice";
import Button from "../../buttonComponent";
import Input from "../../inputComponent";
import ModalBottom from "../../modal/modalBottomComponent";
import Modal from "../../modal/modalComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EditUserEmailForm } from "../../../api/types/user";
import { useEditUserEmail } from "../../../api/hooks/userHooks";
import { useAppDispatch } from "../../../app/store";

const EditEmailModal: FC = () => {
  const dispatch = useAppDispatch();

  const {callFunction : editUserEmail, error, status} = useEditUserEmail();



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
    if (status === "failed") {
      setError("password", {
        message: error?.error,
      });
    } else if (status === "finished") {
      dispatch(setShowEditEmailModal(false));
    }
  }, [error]);

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
          editUserEmail(data);
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
