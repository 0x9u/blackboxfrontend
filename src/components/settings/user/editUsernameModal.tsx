import React, { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { setShowEditUsernameModal } from "../../../app/slices/clientSlice";
import Button from "../../buttonComponent";
import Input from "../../inputComponent";
import ModalBottom from "../../modal/modalBottomComponent";
import Modal from "../../modal/modalComponent";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { EditUserNameForm } from "../../../api/types/user";
import { useEditUserName } from "../../../api/hooks/userHooks";
import { useAppDispatch } from "../../../app/store";

const EditUsernameModal: FC = () => {
  const dispatch = useAppDispatch();
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

  const { callFunction: editUserName, error, status } = useEditUserName();
  useEffect(() => {
    if (error) {
      setError("password", {
        message: error?.error,
      });
    } else if (status === "finished") {
      dispatch(setShowEditUsernameModal(false));
    }
  }, [status, error]);
  return (
    <Modal
      title={"Edit Username"}
      exitFunc={() => {
        dispatch(setShowEditUsernameModal(false));
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          editUserName(data);
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
