import React, { FC, useEffect } from "react";
import { setShowEditPassModal } from "../../../app/slices/clientSlice";
import Button from "../../buttonComponent";
import Input from "../../inputComponent";
import ModalBottom from "../../modal/modalBottomComponent";
import Modal from "../../modal/modalComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EditUserPasswordForm } from "../../../api/types/user";
import { useEditUserPassword } from "../../../api/hooks/userHooks";
import { useAppDispatch } from "../../../app/store";

type editPassForm = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

const EditPassModal: FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<editPassForm>({
    resolver: yupResolver(
      yup.object().shape({
        password: yup.string().required("Password is required"),
        newPassword: yup
          .string()
          .max(32, "Too long")
          .min(8, "Too short")
          .matches(/[A-Z]/, "must contain a uppercase letter")
          .matches(/\d/, "must contain a number")
          .matches(/[a-z]/, "must contain a lowercase letter")
          .required("New Password is required"),
        confirmNewPassword: yup
          .string()
          .oneOf([yup.ref("newPassword"), null], "Passwords must match")
          .required("Confirm New Password is required"),
      })
    ),
  });
  const {
    callFunction: editUserPassword,
    error,
    status,
  } = useEditUserPassword();
  useEffect(() => {
    if (error) {
      setError("password", {
        message: error?.error,
      });
    } else if (status.valueOf() === "finished") {
      dispatch(setShowEditPassModal(false));
    }
  }, [status, error]);
  return (
    <Modal
      title={"Edit Password"}
      exitFunc={() => {
        dispatch(setShowEditPassModal(false));
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          const body: EditUserPasswordForm = {
            password: data.password,
            newPassword: data.newPassword,
          };
          editUserPassword(body);
        })}
      >
        <div className="flex flex-col p-4 pt-0">
          <Input
            label="Password"
            type="password"
            dark
            register={register("password")}
            error={errors.password}
          />
          <Input
            label="New Password"
            type="password"
            dark
            register={register("newPassword")}
            error={errors.newPassword}
          />
          <Input
            label="Confirm New Password"
            type="password"
            dark
            register={register("confirmNewPassword")}
            error={errors.confirmNewPassword}
          />
        </div>
        <ModalBottom>
          <Button value="Finish" type="submit" />
        </ModalBottom>
      </form>
    </Modal>
  );
};

export default EditPassModal;
