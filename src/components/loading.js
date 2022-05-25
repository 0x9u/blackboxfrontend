import React from 'react';
import './loading.css';
function Loading(props) {
    return (<div className={props.show ? "loading-container"  : "hidden"}>
        <div className={props.show ? "modal" : ""}>
            { props.button && <input type="button" value="continue" onClick={props.function}/>}
            <div className="content">
            {props.children}
            </div>
        </div>
    </div>)
}

export default Loading