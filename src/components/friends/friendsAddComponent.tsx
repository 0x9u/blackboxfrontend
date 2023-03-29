import React, { FC } from "react";
import Button from "../buttonComponent";
import Input from "../inputComponent";
const FriendsAdd: FC = () => {
  return (
    <div className="m-auto flex h-full w-full flex-col items-center ">
      <form className="m-auto space-y-2">
        <h1 className="text-2xl text-white">Add a Friend!</h1>
        <p className="font-medium italic text-gray">
          Usernames are case sensitive!
        </p>
        <div className="flex flex-row space-x-4">
          <Input label="Username" />
          <Button type="submit" className="place-self-end"/>
        </div>
      </form>
    </div>
  );
};
export default FriendsAdd;
