import React from 'react';
import { useSelector } from 'react-redux';
import styles from './modals.module.css';


//find better way to fix button shit
function Modal(props) { //manual transition fix for now
    return (<div className={props.show ? styles.modalContainer : `${styles.modalContainer} ${styles.hidden}`}>
        <div className={props.show ? styles.modal : styles.hidden} style={{ width: (props.width || "350") + "px", height: (props.height || "150") + "px", transition: props.transition || "0s" }}>
            <div className={styles.buttons}>
                {props.buttons && props.buttons.map((button, idx) => <input type="button" key={idx} value={button.value} onClick={button.function} />)}
            </div>
            <div className={props.show ? styles.content : `${styles.content} ${styles.hidden}`}>
                {props.children}
            </div>
        </div>
    </div>)
}


function InputBox(props) {
    return (
        <div className={styles.userBox} id={props.id}>
            <input type={props.type} value={props.value} {...props.register} placeholder=' ' spellCheck="false" />
            <label className={styles.userBoxLabel}>{props.label}</label>
            <label className={styles.userBoxError}>{props.errorMessage}</label>
        </div>
    );
}

function CheckBox(props) {
    return ( //I want to die css is so hard go damn it
        <div className={styles.checkBox}>
            <input id="toggle" type="checkbox" disabled={props.disabled} onChange={props.onChange} />
            <div></div>
        </div>
    );
}

function PictureSelector(props) {
    return (
        <div className={styles.pictureSelectorContainer}>
            <input className={styles.pictureSelector} type="file" onChange={() => { props.onChange(); props.changeImage(); }} />
            <img src={props.src} width={props.width} height={props.height} onChange={props.onChange} />
        </div>
    );
}


function ProfileSettings(props) {
    const username = useSelector(state => state.userInfo.username);
    const email = useSelector(state => state.userInfo.email);
    const icon = useSelector(state => state.userInfo.icon);
    
    return (
        <div className={styles.profileSettings}>
            <div className={styles.profileContainer}>
                <div className={styles.profileSettingsInformation}>
                    <div className={styles.profileDetails} id="username">
                        <label >Username:</label><div><p id="username">{username}</p><input className="default" type="button" value="Change" onClick={() => props.userFunc(true)} /></div>
                    </div>
                    <div className={styles.profileDetails} id="email">
                        <label>Email:</label><div><p>{email}</p><input className="default" type="button" value="Change" onClick={() => props.emailFunc(true)} /></div>
                    </div>
                </div>
                <img src="/profileImg.png" />
            </div>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>Password</p>
                <div id="passwordChange"><label>Change password</label> <input type="button" value="Change Password" onClick={() => props.passFunc(true)} /></div>
            </div>
        </div>
    );
}

function Appearance() {
    return (
        <div className={styles.appearanceSettings}>
            <p>
                Coming Soon!
            </p>
        </div>
    );
}

function ServerSettings() {
    return (
        <div className={styles.serverSettings}>
            <p>
                Coming Soon!
            </p>
        </div>
    );
}

function UserMenu(props) {
    const [active, setActive] = React.useState(0);
    const [changeUser, showChangeUser] = React.useState(false);
    const [changeEmail, showChangeEmail] = React.useState(false);
    const [changePass, showChangePass] = React.useState(false);

    function renderUserSettings() {
        switch (active) {
            case 0:
                return <ProfileSettings userFunc={showChangeUser} emailFunc={showChangeEmail} passFunc={showChangePass} />;
            case 1:
                return <Appearance />;
            default:
                return <p>Something is Wrong!</p>
        }
    }

    function changeUsernameAPI() {

    }
    
    function changeEmailAPI() {

    }

    function changePasswordAPI() {

    }

    function modals() {
        return <>
            <Modal show={changeUser} buttons={[{ value: "Exit", function: () => showChangeUser(false) }, { value: "Done", function: changeUsernameAPI }]} width="450" height="300">
                <form className={styles.changeUsernameModal}>
                    <label>New Username</label>
                    <input type="text" id="changeUsernameInput" />
                    <label>Current Password</label>
                    <input type="password" id="confirmPass" />
                    <label id="error"></label>
                </form>
            </Modal>
            <Modal show={changeEmail} buttons={[{ value: "Exit", function: () => showChangeEmail(false) }, { value: "Done", function: changeEmailAPI }]} width="450" height="300">
                <form className={styles.changeEmailModal}>
                    <label>New Email</label>
                    <input type="text" />
                    <label>Current Password</label>
                    <input type="password" />
                    <label id="error"></label>
                </form>
            </Modal>
            <Modal show={changePass} buttons={[{ value: "Exit", function: () => showChangePass(false) }, { value: "Done", function: changePasswordAPI }]} width="450" height="300">
                <form className={styles.changePasswordModal}>
                    <label>New Password</label>
                    <input type="password" />
                    <label>Confirm Password</label>
                    <input type="password" />
                    <label>Current Password</label>
                    <input type="password" />
                    <label id="error"></label>
                </form>
            </Modal>
        </>
    }
    return (
        <Menu show={props.show} exit={() => {setActive(0);props.exit()}} render={renderUserSettings()} modals={modals()}>
            <div className={styles.optionHeading}><p>User Settings</p></div>
            <div className={active === 0 ? `${styles.optionButton} ${styles.active}` : styles.optionButton} ><input type="button" value="User Profile" onClick={() => { setActive(0) }} /></div>
            <div className={active === 1 ? `${styles.optionButton} ${styles.active}` : styles.optionButton}><input type="button" value="Appearance" onClick={() => { setActive(1) }} /></div>
            <div className={styles.optionButton}><input type="button" value="Log Out" id="logout" /></div>
        </Menu>
    )
}

function ServerMenu(props) {
    const [active, setActive] = React.useState(0);
    function renderServerSettings() {
        switch (active) {
            case 0:
                return <ServerSettings/>;
            case 1:
                return <p>Server Settings</p>;
            default:
                return <p>Something is Wrong!</p>;
        }
    }
    return (
        <Menu show={props.show} exit={() => {setActive(0);props.exit()}} render={renderServerSettings()}>
            <div className={styles.optionHeading}><p>Server Settings</p></div>
            <div className={active === 0 ? `${styles.optionButton} ${styles.active}` : styles.optionButton}><input type="button" value="Server Settings" onClick={() => { setActive(0) }} /></div>
            <div className={active === 1 ? `${styles.optionButton} ${styles.active}` : styles.optionButton}><input type="button" value="Ban/Kick User" onClick={() => { setActive(1) }} /></div>
        </Menu>
    )
}

function Menu(props) { //pass set states function to be able change options through scopes
    return (
        <div className={props.show ? styles.menuContainer : `${styles.menuContainer} ${styles.hidden}`}>
            <div className={styles.optionsMenu}>
                {props.children}
            </div>
            <div className={styles.optionsContainer}>
                <div className={styles.options}>
                    {props.render}
                </div>
                <div className={styles.exitButton}>
                    <input className="default" type="button" onClick={props.exit} value="×" />
                    <label>Exit</label>
                </div>
            </div>
            {props.modals}
        </div>
    )
}

export { Modal, UserMenu, ServerMenu, CheckBox, InputBox, PictureSelector };