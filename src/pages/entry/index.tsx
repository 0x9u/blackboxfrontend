import React, {FC} from 'react';

import Login from './login';
import Register from './register';


const Entry : FC = () => {
    const [test, setTest] = React.useState<string>("");
    const [mode, setMode] = React.useState<string>("login");
    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-shade-2 sm:py-12 ">
            <div className='relative mx-auto text-white py-16'>
                <p className="font-bold text-7xl ">BlackBox ;)</p>
                <p className='font-bold sm:-rotate-12 sm:absolute sm:-right-20 sm:top-36'>We are fucking back at it again!</p>
            </div>
            {mode === "login" ? <Login changeMode={() => setMode("register")}/> : <Register changeMode={() => setMode("login")}/>}
        </div>)
}

export default Entry;