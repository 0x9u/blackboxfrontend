import React, {FC} from "react";

import Input from '../../components/input/input';
import Button from '../../components/button/button';

type RegisterProps = {
    changeMode : () => void;
}

const Register : FC<RegisterProps> = ({changeMode}) => {
    return (
        <div className=' flex rounded-xl flex-col shadow-xl mx-auto bg-shade-3 py-10 px-16'>
            <div className='mx-auto flex flex-col pb-10'>
                <p className='uppercase text-white font-bold my-2 text-3xl'>Welcome back!</p>
            </div>
            <div className='mx-auto flex flex-col'>
                <p className='uppercase text-white font-bold my-2 text-xs'>username</p>
                <Input value="" onChange={(value) => console.log(value)}/>
            </div>
            <div className='mx-auto flex flex-col'>
            <p className='uppercase text-white font-bold my-2 text-xs'>password</p>
                <Input value="" onChange={(value) => console.log(value)}/>
            </div>
            <div className='flex flex-col py-4 pl-32 pr-5'>
                <Button value="Login" onClick={() => console.log("Login")}/>
            </div>
            <div className='flex flex-col text-sm pl-5 mb-16 space-y-2'>
                <a className=" text-shade-5 font-medium cursor-pointer hover:underline" onClick={changeMode}>Create an account</a>
                <a className=" text-shade-5 font-medium cursor-pointer hover:underline" onClick={changeMode}>Reset my password</a>
            </div>
        </div>)
}

export default Register;