import React, { FC } from "react";
import Button from "../buttonComponent";
import CheckBox from "../checkBoxComponent";
import Input from "../inputComponent";
import UploadPic from "../uploadPicComponent";
const AdminGuilds: FC = () => {
    return (
        <div className="flex h-full w-full justify-center">
            <form className="flex flex-row m-auto space-x-4">
                <div className="flex flex-col space-y-4">
                    <select>
                        <option selected hidden>Select Room</option>
                        <option>test</option>
                        <option>test</option>
                        <option>test</option>
                    </select>
                    <div className="h-32 m-auto"><UploadPic height="32" width="32" dark /> </div>
                    <div><Input label="Name" /></div>
                    <div className="flex flex-row justify-between"><label className="text-white">Save Chat?</label><CheckBox /></div>

                    <div className="flex flex-row justify-between">
                        <Button type="submit" value="Delete" />
                        <Button type="submit" value="Edit" />
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <select>
                        <option selected hidden>Select Member</option>
                        <option>test</option>
                        <option>test</option>
                        <option>test</option>
                    </select>
                    <div className="flex flex-row justify-between">
                        <Button type="submit" value="Ban" />
                        <Button type="submit" value="Kick" />
                    </div>
                    <Button type="submit" value="Make Owner" />
                </div>

                <div className="flex flex-col space-y-4">
                    <select>
                        <option selected hidden>Select Banned Member</option>
                        <option>test</option>
                        <option>test</option>
                        <option>test</option>
                    </select>
                    <div className="flex flex-row justify-between">
                        <Button type="submit" value="UnBan" />
                    </div>
                </div>
            </form>
        </div>
    );
};
export default AdminGuilds;
