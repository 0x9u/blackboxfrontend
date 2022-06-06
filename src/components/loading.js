import React from 'react';
import styles from './loading.module.css';


//find better way to fix button shit
function Modal (props) { //manual transition fix for now
    return (<div className={props.show ? styles.modalContainer  : `${styles.modalContainer} ${styles.hidden}`}>
        <div className={props.show ? styles.modal : styles.hidden} style={{width: (props.width || "350")+"px", height: (props.height || "150")+"px", transition: props.transition || "0s"}}>
            <div className={styles.buttons}>
            { props.otherbuttons && props.otherbuttons.filter(button => button.back).map((button) => <input type="button" key={""} value={button.value} onClick={button.function}/>)}
            { props.button && <input type="button" value={props.buttonVal} onClick={props.function}/>}
            { props.otherbuttons && props.otherbuttons.filter(button => !button.back).map((button) => <input type="button" key={""} value={button.value} onClick={button.function}/>)}
            </div>
            <div className={props.show ? styles.content:`${styles.content} ${styles.hidden}`}>
            {props.children}
            </div>
        </div>
    </div>)
}


function InputBox(props) {
    return (
    <div className={styles.userBox} id={props.id}>
    <input type={props.type} onChange={props.onChange} placeholder=' ' spellCheck="false" required={props.required} maxLength={props.maxLength}/>
    <label>{props.label}</label>
    </div>
    );
}

function CheckBox(props) {
    return ( //I want to die css is so hard go damn it
        <div className={styles.checkBox}>
            <input id="toggle" type="checkbox" disabled={props.disabled} onChange={props.onChange}/>
            <div></div>
        </div>
    );
}

function PictureSelector(props) {
    function changeImage() {

    }
    return (
        <div className={styles.pictureSelectorContainer}>
            <input className={styles.pictureSelector} type="file" onChange={() => {props.onChange(); changeImage();}}/>
            <img width="200"/>
        </div>
    );
}


function ProfileSettings(props) {
    return (
    <div className={styles.profileSettings}>
        <div className={styles.profileContainer}>
            <div className={styles.profileSettingsInformation}>
                <div className={styles.profileDetails} id="username">
                <label >Username:</label><div><p id="username">JohnCena</p><input className="default" type="button" value="Change" onClick={() => props.userFunc(true)}/></div>
                </div>
                <div className={styles.profileDetails} id="email">
                <label>Email:</label><div><p>123@biglore.com</p><input className="default" type="button" value="Change" onClick={() => props.emailFunc(true)}/></div>
                </div>
            </div>
            <img src="https://i.kym-cdn.com/entries/icons/original/000/037/512/004ergTRgx07MxKZhGEw01041200l6Sn0E010.mp4_snapshot_00.02.418.jpg"/>
        </div>
        <div className={styles.optionBox}>
            <p className={styles.optionTitle}>Password</p>
            <div id="passwordChange"><label>Change password</label> <input type="button" value="Change Password" onClick={() => props.passFunc(true)}/></div>
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

function Menu(props) { //pass set states function to be able change options through scopes
    const [active, setActive] = React.useState(0);
    const [changeUser, showChangeUser] = React.useState(false);
    const [changeEmail, showChangeEmail] = React.useState(false);
    const [changePass, showChangePass] = React.useState(false);
    function render() {
        switch (active) {
            case 0:
                return <ProfileSettings userFunc={showChangeUser} emailFunc={showChangeEmail} passFunc={showChangePass}/>;
            case 1:
                return <Appearance/>;
            default:
                return <p>Something is Wrong!</p>
        }
    }
    return (
        <div className={props.show ? styles.menuContainer : `${styles.menuContainer} ${styles.hidden}`}>
            <div className={styles.optionsMenu}>
                <div className={styles.optionHeading}><p>User Settings</p></div>
                <div className={ active === 0 ? `${styles.optionButton} ${styles.active}` : styles.optionButton} ><input type="button" value="User Profile" onClick={() => {setActive(0)}}/></div>
                <div className={ active === 1 ? `${styles.optionButton} ${styles.active}` : styles.optionButton}><input type="button" value="Appearance" onClick={() => {setActive(1)}}/></div>
                <div className={styles.optionButton}><input type="button" value="Log Out" id="logout" /></div>
            </div>
                <div className={styles.optionsContainer}>
                    <div className={styles.options}>   
                        {render()}
                    </div>
                <div className={styles.exitButton}>
                <input className="default" type="button" onClick={() => {setActive(0);props.exit()}} value="×"/>
                <label>Exit</label>
                </div>
            </div>
            <Modal show={changeUser} function={() => showChangeUser(false)} otherbuttons={[{ value : "Done", function : () => {}}]} buttonVal="Exit" button width="450" height="300">
                <form className={styles.changeUsernameModal}>
                    <label>New Username</label>
                    <input type="text" id="changeUsernameInput"/>
                    <label>Current Password</label>
                    <input type="password" id="confirmPass"/>
                </form>
            </Modal>
            <Modal show={changeEmail} function={() => showChangeEmail(false)} otherbuttons={[{ value : "Done", function : () => {}}]} buttonVal="Exit" button width="450" height="300">
                <form className={styles.changeEmailModal}>
                    <label>New Email</label>
                    <input type="text"/>
                    <label>Current Password</label>
                    <input type="password"/>
                </form>
            </Modal>
            <Modal show={changePass} function={() => showChangePass(false)} otherbuttons={[{ value : "Done", function : () => {}}]} buttonVal="Exit" button width="450" height="300">
                <form className={styles.changePasswordModal}>
                    <label>New Password</label>
                    <input type="password"/>
                    <label>Current Password</label>
                    <input type="password"/>
                </form>
            </Modal>
        </div>
    )
}

export { Modal, Menu, CheckBox, InputBox };