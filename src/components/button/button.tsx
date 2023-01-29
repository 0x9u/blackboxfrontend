import React, {FC} from 'react';

type ButtonProps = {
    onClick : () => void;
    value : string;
    disabled? : boolean;
    width? : string;
    height? : string;
}

const Input : FC<ButtonProps> = ({value, onClick, disabled, width,height}) => {
    return (
        <input className="relative bg-shade-5 hover:brightness-90 active:brightness-75 disabled:opacity-50 rounded w-22 h-10 text-white font-bold px-4" 
        type="button" value={value} onClick={onClick} width={width} height={height} disabled={disabled}/>
    )
}

export default Input;