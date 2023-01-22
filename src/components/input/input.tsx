import React, {FC} from 'react';
import styles from './input.module.scss';

type InputProps = {
    value : string;
    onChange : (value : string) => void;
}

const Input : FC<InputProps> = ({value, onChange}) => {
    return (
        <input className={styles.InputDefault} type="text" value={value} onChange={(e) => onChange(e.target.value)}/>
    )
}

export default Input;