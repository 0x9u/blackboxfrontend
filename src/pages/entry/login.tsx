import React , {FC} from 'react';

import Input from '../../components/input/input';
import Button from '../../components/button/button';

type LoginProps = {
    changeMode : () => void;
}

const Login : FC<LoginProps> = ({changeMode}) => {
    return (
        <div className=' flex rounded-xl flex-col shadow-xl mx-auto bg-shade-3 py-10 px-16'>
            <div className='mx-auto flex flex-col pb-10'>
                <p className='uppercase text-white font-bold my-2 text-2xl'>Create an account</p>
            </div>
            <div className='mx-auto flex flex-col'>
                <p className='uppercase text-white font-bold my-2 text-xs'>username</p>
                <Input value="" onChange={(value) => console.log(value)}/>
            </div>
            <div className='mx-auto flex flex-col'>
            <p className='uppercase text-white font-bold my-2 text-xs'>email</p>
                <Input value="" onChange={(value) => console.log(value)}/>
            </div>    
            <div className='mx-auto flex flex-col'>
            <p className='uppercase text-white font-bold my-2 text-xs'>password</p>
                <Input value="" onChange={(value) => console.log(value)}/>
            </div>
            <div className='mx-auto flex flex-col'>
            <p className='uppercase text-white font-bold my-2 text-xs'>confirm password</p>
                <Input value="" onChange={(value) => console.log(value)}/>
            </div>
            <div className='flex flex-col py-4 pl-32 pr-5'>
                <Button value="Register" onClick={() => console.log("Register")}/>
            </div>
            <div className='flex flex-col text-sm pl-5 mb-16'>
                <a className=" text-shade-5 font-medium cursor-pointer hover:underline" onClick={changeMode}>Already have an account?</a>
            </div>
        </div>)
}

export default Login;