import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../api/types/user";
import { RootState } from "../../../app/store";
import Button from "../../buttonComponent";
import {
  setShowEditEmailModal,
  setShowEditPassModal,
  setShowEditProfilePictureModal,
  setShowEditUsernameModal,
} from "../../../app/slices/clientSlice";



const AccountUserSettings: FC = () => {
  const userInfo = useSelector(
    (state: RootState) =>
      state.user.users[state.user.selfUser || ""] ?? ({} as User)
  );
  const [formEdited, setFormEdited] = useState<boolean>(false);
  const imageURL =
    userInfo.imageId !== "-1"
      ? `http://localhost:8080/api/files/user/${userInfo.imageId}`
      : "./blackboxuser.jpg";

  const dispatch = useDispatch();



  return (
    <div className="space-y-8">
      <h1 className="mb-5 text-4xl text-white">My Account</h1>
      <form
        className="space-y-4 rounded-md bg-shade-2 p-4"
        onChange={() => setFormEdited(true)}
      >
        <div className="flex flex-row gap-8">
          <img
            className="h-28 w-28 shrink-0 rounded-full object-cover border-black border"
            src={imageURL}
          />
          <p className="my-auto text-2xl font-medium text-white">
            {userInfo.name}
          </p>
          <Button
            className="my-auto ml-auto"
            type="button"
            value="Edit Profile Picture"
            onClick={() => dispatch(setShowEditProfilePictureModal(true))}
            gray
          />
        </div>
        <div className="flex w-full flex-col space-y-4 rounded-lg bg-shade-4 p-4">
          <div className="flex flex-row">
            <p className="flex-grow text-lg text-white">
              Username: {userInfo.name}
            </p>
            <Button
              value="Edit"
              className=" flex-grow-0"
              type="button"
              gray
              onClick={() => dispatch(setShowEditUsernameModal(true))}
            />
          </div>
          <div className="flex flex-row">
            <p className="flex-grow text-lg text-white">
              Email: {userInfo.email}
            </p>
            <Button
              value="Edit"
              className=" flex-grow-0"
              type="button"
              gray
              onClick={() => dispatch(setShowEditEmailModal(true))}
            />
          </div>
        </div>
      </form>
      <div>
        <h1 className="mb-5 text-2xl text-white">
          Password and Authentication
        </h1>
        <Button
          type="button"
          value="Change Password"
          onClick={() => dispatch(setShowEditPassModal(true))}
        />
      </div>
      <div>
        <h1 className="mb-5 text-xl text-white">Account Removal</h1>
        <Button type="button" value="Delete Account" red />
      </div>
      <div
        className={`fixed w-[620px] bg-shade-2 ${
          formEdited ? "-translate-y-4" : "translate-y-16"
        } bottom-0 flex h-12 flex-row rounded-md px-4 text-white transition duration-200`}
      >
        <p className="my-auto">You made some changes</p>
        <div className="my-auto flex grow flex-row justify-end space-x-2">
          <Button
            value="Cancel"
            type="button"
            gray
            className="h-8"
            onClick={() => {
              setFormEdited(false);
            }}
          />
          <Button value="Submit" type="submit" className="h-8" />
        </div>
      </div>
    </div>
  );
};

export default AccountUserSettings;
