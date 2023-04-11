import React, { FC } from "react";
import Button from "../buttonComponent";
import CheckBox from "../checkBoxComponent";
import Input from "../inputComponent";
import UploadPic from "../uploadPicComponent";
const AdminServer: FC = () => {
    return (
        <div className="flex h-full w-full justify-center">
            <form className="flex flex-row m-auto space-x-4">
                <div className="flex flex-col space-y-4">
                    <Input label="IP" />
                    <Button type="submit" value="Ban IP" />
                    <label className="uppercase text-white font-semibold text-sm">SQL query</label>
                    <textarea className="bg-shade-1 text-white"></textarea>
                    <Button type="submit" value="Submit Query" />
                    <Button type="submit" value="Reset Server" red />
                </div>
                <div className="flex flex-col overflow-auto space-y-2">
                    <label className="uppercase text-white font-semibold text-sm">SQL Results</label>
                    <table className="table-auto text-white border-separate border border-white">
                        <thead>
                            <tr>
                                <th>
                                    Test
                                </th>
                                <th>
                                    Test
                                </th>
                                <th>
                                    Test
                                </th>
                                <th>
                                    Test
                                </th>
                                <th>
                                    Test
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Test
                                </td>
                                <td>
                                    Test
                                </td>
                                <td>
                                    Test
                                </td>
                                <td>
                                    Test
                                </td>
                                <td>
                                    Test
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );
};
export default AdminServer;
