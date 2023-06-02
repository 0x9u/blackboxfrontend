import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { setShowEditPassModal } from "../../../app/slices/clientSlice";
import Button from "../../buttonComponent";
import Input from "../../inputComponent";
import ModalBottom from "../../modal/modalBottomComponent";
import Modal from "../../modal/modalComponent";

type editPassForm = {
    password: string;
    confirmPassword: string;
}

const EditPassModal: FC = () => {
    const dispatch = useDispatch();
    return (
        <Modal title={"Edit Password"} exitFunc={() => {
            dispatch(setShowEditPassModal(false));
        }}>
                <div className="flex flex-col p-4">
                    <Input
                        label="Password"
                        dark
                    />
                    <Input
                        label="Confirm Password"
                        dark
                    />
                </div>
                <ModalBottom>
                    <Button value="Finish" type="button" onClick={() => { }} />
                </ModalBottom>
        </Modal>
    );
}

export default EditPassModal;