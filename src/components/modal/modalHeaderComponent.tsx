import React, { FC } from "react";

interface modalHeaderProps {
    title?: string;
}

const ModalHeader: FC<modalHeaderProps> = ({ title }) => {
    return (
        <div className="flex grow flex-row bg-shade-4">
            <div>
                {title}
            </div>
            <div>

            </div>
        </div>
    );
};

export default ModalHeader;
