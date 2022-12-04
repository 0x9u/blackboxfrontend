import React from 'react';

//support onscreen keyboard later

//props : addkey, deletekey, submit, winLose
function KeyHandler(props) {
    const regex = /^[a-zA-Z]{1}$/;
    function handleKeyDown(e) {
        if (props.winLose) return;
        if (e.key === 'Backspace') {
            props.deleteKey();
        } else if (e.key === 'Enter') {
            props.submit();
        } else {
            if (regex.test(e.key)) {
                console.log(e.key);
                props.addKey({
                    char : e.key.toLowerCase(),
                    type : -1
                });
            }
        }
    }
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });
}

export default KeyHandler;