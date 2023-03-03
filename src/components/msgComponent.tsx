import React, { FC } from "react";

interface msgProps {
    content: string;
    failed?: boolean;
    username: string;
    created: number;
    modified?: number;
}

const Msg: FC<msgProps> = ({ content, failed, username, created, modified }) => {
    return (<div className="flex flex-row space-x-4">
        <div className="h-14 w-14 rounded-full border-black border shrink-0">
            {/* for pfp */}
        </div>
        <div>
            <div className="flex flex row space-x-3  items-center">
                <p className="text-lg font-semibold text-white">
                    {username}
                </p>
                <p className="text-xs font-medium text-white brightness-75">
                    Created on {created} {modified && `and Edited at ${modified}`}
                </p>
            </div>
            <div className="mx-1">
                <p className="text-white font-normal">
                    {content}
                </p>
            </div>
        </div>
    </div>)
}

export default Msg;