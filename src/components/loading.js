import React from 'react';
import './loading.css';

function Modal (props) {
    return (<div className={props.show ? "modal-container"  : "modal-container hidden"}>
        <div className={props.show ? "modal" : "hidden"} style={{width: (props.width || "350")+"px", height: (props.height || "150")+"px"}}>
            { props.button && <input type="button" value="continue" onClick={props.function}/>}
            <div className="content">
            {props.children}
            </div>
        </div>
    </div>)
}
/*
function Menu(props) { //will be unused
    return (
        <div className={props.show ? "modal-container" : "modal-container hidden"}>
            <div className={props.show ? "modal" : "hidden"} id="menu">
                <input type="button" value="Exit" onClick={props.function}/>
            </div>
        </div>
    );
}
*/
function Menu(props) { //pass set states function to be able change options through scopes
    return (
        <div className={props.show ? "menu-container" : "menu-container hidden"}>
            <div className="options-menu">
                <div className="option-heading"><p>Profile</p></div>
                <div className="option-button"><input type="button" value="Appearance"/></div>
                <div className="option-button"><input type="button" value="Appearance"/></div>
                <div className="option-button"><input type="button" value="Appearance"/></div>
                <div className="option-heading"><p>Profile</p></div>
                <div className="option-button"><input type="button" value="Appearance"/></div>
                <div className="option-button"><input type="button" value="Appearance"/></div>
                <div className="option-heading"><p>Profile</p></div>
                <div className="option-button"><input type="button" value="Appearance"/></div>
            </div>
                <div className="options-container">
                    <div className="options"></div>
                <div className="exit-button">
                <input type="button" onClick={props.exit}/>
                <label>Exit</label>
                </div>
            </div>
        </div>
    )
}

export { Modal, Menu };