import React, { FC } from "react";

interface barProps {
    children: React.ReactNode;
}

const Bar: FC<barProps> = ({ children }) => {
    return (
        <div className="flex flex-row h-16 border-b-2 border-black px-4">
            {children}
        </div>
    );
};

export default Bar;
