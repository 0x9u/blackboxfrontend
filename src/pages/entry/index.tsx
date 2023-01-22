import React, {FC} from 'react';

import Input from '../../components/input/input';

const Entry : FC = () => {
    const [test, setTest] = React.useState<string>("");
    return (
        <div>
            <Input value={test} onChange={setTest}/>
        </div>)
}

export default Entry;