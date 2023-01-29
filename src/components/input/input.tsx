import React, {FC} from 'react';

type InputProps = {
    value : string;
    onChange : (value : string) => void;
}

const Input : FC<InputProps> = ({value, onChange}) => {
    return (
        <input className="relative bg-shade-1 outline-offset-2 outline-shade-5  rounded w-56 h-10" type="text" value={value} onChange={(e) => onChange(e.target.value)}/>
    )
}

export default Input;