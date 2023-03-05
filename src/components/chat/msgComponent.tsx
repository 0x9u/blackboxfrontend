import React, { FC } from "react";

interface msgProps {
    content: string;
    failed?: boolean;
    username: string;
    created: number;
    modified?: number;
}

const Msg: FC<msgProps> = ({ content, failed, username, created, modified }) => {
    return (<div className="flex flex-row space-x-4 px-4 py-1 hover:bg-black/25">
        <div className="h-12 w-12 rounded-full border-black border shrink-0">
            {/* for pfp */}
        </div>
        <div className="flex flex-col">
            <div className="flex flex-row space-x-2 items-center">
                <p className="text-lg font-semibold text-white leading-relaxed">
                    {username}
                </p>
                <p className="text-xs font-medium text-white leading-relaxed brightness-75">
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