import React, { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { setShowDeleteAccountModal } from "../../../app/slices/clientSlice";
import Button from "../../buttonComponent";
import Input from "../../inputComponent";
import ModalBottom from "../../modal/modalBottomComponent";
import Modal from "../../modal/modalComponent";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { EditUserNameForm } from "../../../api/types/user";
import { useDeleteAccount } from "../../../api/hooks/userHooks";
import { useAppDispatch } from "../../../app/store";

const DeleteAccountModal: FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditUserNameForm>({
    resolver: yupResolver(
      yup.object().shape({
        password: yup.string().required("Password is required"),
      })
    ),
  });

  const { callFunction: deleteAccount, error, status } = useDeleteAccount();
  useEffect(() => {
    if (error) {
      setError("password", {
        message: error?.error,
      });
    } else if (status === "finished") {
      dispatch(setShowDeleteAccountModal(false));
    }
  }, [status, error]);
  return (
    <Modal
      title={"Delete Account"}
      exitFunc={() => {
        dispatch(setShowDeleteAccountModal(false));
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          deleteAccount(data);
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
        </div>
        <ModalBottom>
          <Button value="Delete" type="submit" />
        </ModalBottom>
      </form>
    </Modal>
  );
};

export default DeleteAccountModal;
