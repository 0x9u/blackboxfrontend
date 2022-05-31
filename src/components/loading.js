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

function CheckBox() {
    return ( //I want to die css is so hard go damn it
        <div className="checkBox">
            <input id="toggle" type="checkbox"/>
            <div></div>
        </div>
    );
}

function ProfileSettings() {
    return (
    <div className="profile-settings">
        <div className="profile-container">
            <div className="profile-settings-information">
                <div className="profile-details" id="username">
                <label >Username:</label><div><p id="username">JohnCena</p><input type="button" value="Change"/></div>
                </div>
                <div className="profile-details" id="email">
                <label>Email:</label><div><p>123@biglore.com</p><input type="button" value="Change"/></div>
                </div>
            </div>
            <img src="https://i.kym-cdn.com/entries/icons/original/000/037/512/004ergTRgx07MxKZhGEw01041200l6Sn0E010.mp4_snapshot_00.02.418.jpg"/>
        </div>
        <div className="option-box">
            <div id="option1"><label>Turn off user</label><CheckBox/></div>
            <div id="option1"><label>Turn off user</label><CheckBox/></div>
            <div id="option1"><label>Turn off user</label><CheckBox/></div>
            <div id="option1"><label>Turn off user</label><CheckBox/></div>
            <div id="option1"><label>Turn off user</label><CheckBox/></div>
        </div>
    </div>
    );
}

function Appearance() {
    return (
        <div className="appearance-settings">
            <p>
                Coming Soon!
            </p>
        </div>
    );
}

function Menu(props) { //pass set states function to be able change options through scopes
    const [chosen, setChosen] = React.useState(ProfileSettings);
    return (
        <div className={props.show ? "menu-container" : "menu-container hidden"}>
            <div className="options-menu">
                <div className="option-heading"><p>User Settings</p></div>
                <div className="option-button"><input type="button" value="Appearance" onClick={() => setChosen(Appearance)}/></div>
                <div className="option-button"><input type="button" value="User Profile" onClick={() => setChosen(ProfileSettings)}/></div>
                <div className="option-button"><input type="button" value="Log Out" id="logout" /></div>
            </div>
                <div className="options-container">
                    <div className="options">
                        {chosen}
                    </div>
                <div className="exit-button">
                <input type="button" onClick={props.exit} value="×"/>
                <label>Exit</label>
                </div>
            </div>
        </div>
    )
}

export { Modal, Menu };