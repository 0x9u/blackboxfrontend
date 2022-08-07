import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './modals.module.css';
import { EDITEMAIL, EDITPASS, EDITUSERNAME, UpdateUserInfo } from '../api/userInfoApi';
import { BanUser, KickUser, UnbanUser, DeleteInvite, DeleteGuild } from '../api/guildApi';


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


function InputBox(props) { //MAKE A NEW INPUT BOX FOR LATER
    return (
        <div className={`${styles.userBox} ${props.className}`} id={props.id}>
            <input type={props.type} value={props.value} {...props.register} placeholder=' ' spellCheck="false" />
            <label className={styles.userBoxLabel}>{props.label}</label>
            <label className={styles.userBoxError}>{props.errorMessage}</label>
        </div>
    );
}

function CheckBox(props) {
    return ( //I want to die css is so hard go damn it
        <div className={styles.checkBox}>
            <input id="toggle" type="checkbox" disabled={props.disabled} onChange={props.onChange} {...props.register} />
            <div></div>
        </div>
    );
}

function OptionSelector(props) {
    return (
        <div className={`${styles.optionSelector} ${props.className}`} id={props.id}>
            {props.children}
        </div>
    )
}

function OptionSelectorChild(props) {
    return (
        <div className={`${styles.optionSelectorChild} ${props.active ? styles.active : ""} ${props.className}`} id={props.id} onClick={() => props.onClick(props.value)} >
            {props.children}
        </div>
    )
}

function PictureSelector(props) {
    return (
        <div className={`${styles.pictureSelectorContainer} ${props.className}`}>
            <input className={styles.pictureSelector} type="file" onChange={() => { props.onChange(); props.changeImage(); }} />
            <img src={props.src} width={props.width} height={props.height} onChange={props.onChange} />
        </div>
    );
}


function ProfileSettings(props) {
    const username = useSelector(state => state.userInfo.username);
    const email = useSelector(state => state.userInfo.email);
    //const icon = useSelector(state => state.userInfo.icon);

    return (
        <div className={styles.settingsContainer}>
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
                <div className={styles.optionBoxRow} id="passwordChange"><label>Change password</label> <input type="button" value="Change Password" onClick={() => props.passFunc(true)} /></div>
            </div>
        </div>
    );
}

function Appearance() {
    return (
        <div className={styles.settingsContainer}>
            <p className={styles.comingSoon}>
                Coming Soon!
            </p>
        </div>
    );
}

function ServerSettings() {
    const dispatch = useDispatch();
    const Name = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.Name);
    const Settings = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.Settings);

    const schemaServerSettings = Yup.object().shape({
        serverName: Yup.string()
            .required("Server name cannot be empty")
            .min(6, "Has to be at least 6 characters")
            .max(16, "Cannot be longer than 16 characters"),
        saveChat: Yup.bool()
    })

    const { handleSubmit, register, setError, reset, formState: { errors, isDirty } } = useForm({
        //defaultValues : schemaServerSettings.cast(),
        resolver: yupResolver(schemaServerSettings)
    });

    React.useEffect(() => { //temp fix unless there is no other way
        let defaultValues = {};
        defaultValues.serverName = Name;
        defaultValues.saveChat = Settings?.SaveChat;
        reset({ ...defaultValues });
    }, [Name, Settings]);


    return (
        <div className={styles.settingsContainer}>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    Server Settings
                </p>
                <div className={styles.optionBoxFlexRow}>
                    <div className={styles.changeServerName}>
                        <InputBox className={styles.changeServerNameInput} label="Server Name" errorMessage={errors?.serverName?.message} register={register("serverName")} />
                    </div>
                    <div className={styles.changeServerIcon}>
                        <PictureSelector src="/guildImg.png" width="100" height="100" />
                    </div>
                </div>
            </div>
            <div className={styles.optionBox}>
                <div className={styles.optionBoxRow} id="passwordChange"><label>Save Chat History?</label> <CheckBox register={register("saveChat")} /></div>
            </div>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    Server Settings
                </p>
            </div>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    Server Settings
                </p>
            </div>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    Server Settings
                </p>
            </div>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    Server Settings
                </p>
            </div>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    Server Settings
                </p>
            </div>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    Server Settings
                </p>
            </div>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    Server Settings
                </p>
            </div>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    Server Settings
                </p>
            </div>
            <div className={`${styles.fixedMiniSettingsConfirm}`}>
                <label>Save Changes?</label>
                <div className={styles.miniSettingsButtons}>
                <input type="button" value="Cancel" className={styles.miniSettingsCancel} />
                <input type="button" value="Save" className={styles.miniSettingsSave} />
                </div>
            </div>
        </div>
    );
}

function BanOrKickSettings() {
    const [chosen, setChosen] = React.useState(-1);
    const [error, setError] = React.useState("");
    const userList = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.Users ?? []);
    const ownId = useSelector(state => state.auth.userId);

    const dispatch = useDispatch();

    async function banUser() {
        const res = await dispatch(BanUser({
            id: userList[chosen].Id
        }));
        if (res.error) {
            setError(res.error.message);
        } else {
            setChosen(-1);
            setError("");
        }
    }

    async function kickUser() {
        const res = await dispatch(KickUser({
            id: userList[chosen].Id
        }));
        if (res.error) {
            setError(res.error.message);
        } else {
            setChosen(-1);
            setError("");
        }
    }
    return (
        <div className={styles.settingsContainer}>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    Ban or Kick
                </p>
                <OptionSelector>
                    {userList.map((user, idx) => user.Id !== ownId && <OptionSelectorChild key={idx} value={idx} onClick={setChosen} active={idx === chosen}>
                        <img className={styles.optionSelectorPFP} src="/profileImg.png" id="pfp" />
                        <p className={styles.optionSelectorUsername}>{user.Username}</p>
                    </OptionSelectorChild>)}
                </OptionSelector>
            </div>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    {chosen !== -1 ? `You have chosen ${userList?.[chosen]?.Username}` : "Choose a member to ban/kick"}
                </p>
                <div className={styles.optionBoxFlexRow}>
                    <input value="Ban User" type="button" className={styles.banKickUserButton} onClick={banUser} disabled={chosen === -1} />
                    <input value="Kick User" type="button" className={styles.banKickUserButton} onClick={kickUser} disabled={chosen === -1} />
                </div>
                <p className={`${styles.optionDescription} ${styles.error}`}>{error}</p>
            </div>
        </div>
    );
}

function BannedUsersSettings() {
    const [chosen, setChosen] = React.useState(-1);
    const [error, setError] = React.useState("");

    const bannedList = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.Banned);

    const dispatch = useDispatch();

    async function unbanUser() {
        const res = await dispatch(UnbanUser({
            id: bannedList[chosen].Id
        }));
        if (res.error) {
            setError(res.error.message);
        } else {
            setChosen(-1);
            setError("");
        }
    }

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    Banned Users
                </p>
                <OptionSelector>
                    {bannedList.map((user, idx) =>
                        <OptionSelectorChild key={idx} value={idx} onClick={setChosen} active={idx === chosen}>
                            <img className={styles.optionSelectorPFP} src="/profileImg.png" id="pfp" />
                            <p className={styles.optionSelectorUsername}>{user.Username}</p>
                        </OptionSelectorChild>)}
                </OptionSelector>
            </div>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    {chosen !== -1 ? `You have chosen ${bannedList?.[chosen]?.Username}` : "Choose a member to ban/kick"}
                </p>
                <div className={styles.optionBoxFlexRow}>
                    <input value="Unban User" type="button" className={styles.banKickUserButton} onClick={unbanUser} disabled={chosen === -1} />
                </div>
                <p className={`${styles.optionDescription} ${styles.error}`}>{error}</p>
            </div>
        </div>
    )
}

function ManageInvitesSettings() {
    const [chosen, setChosen] = React.useState(-1);
    const [error, setError] = React.useState("");

    const inviteList = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.Invites);

    const dispatch = useDispatch();

    async function deleteInvite() {
        const res = await dispatch(DeleteInvite({
            invite: inviteList[chosen]
        }));
        if (res.error) {
            setError(res.error.message);
        } else {
            setChosen(-1);
            setError("");
        }
    }

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    Manage Invites
                </p>
                <OptionSelector>
                    {inviteList.map((invite, idx) =>
                        <OptionSelectorChild key={idx} value={idx} onClick={setChosen} active={idx === chosen}>
                            {invite}
                        </OptionSelectorChild>)}
                </OptionSelector>
            </div>
            <div className={styles.optionBox}>
                <p className={styles.optionTitle}>
                    {chosen !== -1 ? `You have chosen ${inviteList[chosen]}` : "Choose a Invite to Delete"}
                </p>
                <div className={styles.optionBoxFlexRow}>
                    <input value="Delete Invite" type="button" className={styles.banKickUserButton} onClick={deleteInvite} disabled={chosen === -1} />
                </div>
                <p className={`${styles.optionDescription} ${styles.error}`}>{error}</p>
            </div>
        </div>
    )
}

function UserMenu(props) {
    const [active, setActive] = React.useState(0);
    const [changeUser, showChangeUser] = React.useState(false);
    const [changeEmail, showChangeEmail] = React.useState(false);
    const [changePass, showChangePass] = React.useState(false);

    const dispatch = useDispatch();

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

    const schemaUsername = Yup.object().shape({
        username: Yup.string()
            .required("Username is required")
            .matches(/^[a-zA-Z0-9_]*$/, "Username cannot contain any symbols or spaces")
            .min(6, "must be at least 6 characters")
            .max(32, "Maximum is 32 characters"),
        password: Yup.string()
            .required("Password is required"),
    });

    const schemaEmail = Yup.object().shape({
        email: Yup.string().notRequired().when( //this makes it optional copied and pasted from signin.js
            {
                is: (value) => value?.length,
                then: (rule) => rule.email("Invalid email format")
            }),
        password: Yup.string().required("Password is required")
    })

    const schemaPassword = Yup.object().shape({
        newPassword: Yup.string()
            .required("Password is required")
            .min(6, "must be at least 6 characters")
            .max(32, "Maximum is 32 characters"),
        confirmPassword: Yup.string()
            .required("Password is required")
            .oneOf([Yup.ref('newPassword'), null], "Passwords must match"),
        password: Yup.string().required("Password is required")
    })

    const { handleSubmit: handleSubmitU, register: registerU, setError: setErrorU, reset: resetU, formState: { errors: errorsU } } = useForm({
        resolver: yupResolver(schemaUsername)
    });


    const { handleSubmit: handleSubmitE, register: registerE, setError: setErrorE, reset: resetE, formState: { errors: errorsE } } = useForm({
        resolver: yupResolver(schemaEmail)
    });

    const { handleSubmit: handleSubmitP, register: registerP, setError: setErrorP, reset: resetP, formState: { errors: errorsP } } = useForm({
        resolver: yupResolver(schemaPassword)
    });

    async function changeUsernameAPI(form) {
        const res = await dispatch(UpdateUserInfo({
            change: EDITUSERNAME,
            password: form.password,
            newData: form.username
        }));
        console.log(res);
        if (res.error) {
            setErrorU("username", { type: "custom", message: res.error.message });
            setErrorU("password", { type: "custom", message: res.error.message });
        } else {
            resetU();
            showChangeUser(false);
        };
    }

    async function changeEmailAPI(form) {
        const res = await dispatch(UpdateUserInfo({
            change: EDITEMAIL,
            password: form.password,
            newData: form.email
        }));
        if (res.error) {
            setErrorE("email", { type: "custom", message: res.error.message });
            setErrorE("password", { type: "custom", message: res.error.message });
        } else {
            resetE();
            showChangeEmail(false);
        };
    }

    async function changePasswordAPI(form) {
        const res = await dispatch(UpdateUserInfo({
            change: EDITPASS,
            password: form.password,
            newData: form.newPassword
        }));
        if (res.error) {
            setErrorP("password", { type: "custom", message: res.error.message });
            setErrorP("confirmPassword", { type: "custom", message: res.error.message });
            setErrorP("newPassword", { type: "custom", message: res.error.message });
        } else {
            resetP();
            showChangePass(false);
        }
    }

    function modals() {
        return <>
            <Modal show={changeUser} buttons={[{ value: "Exit", function: () => showChangeUser(false) }, { value: "Done", function: handleSubmitU(changeUsernameAPI) }]} width="450" height="300">
                <form className={styles.changeUsernameModal}>
                    <div className={styles.changeContainer}>
                        <label>New Username</label>
                        <div className={styles.innerChangeContainer}>
                            <input type="text" id="changeUsernameInput" {...registerU("username")} />
                            <label className={styles.error}>{errorsU?.username?.message}</label>
                        </div>
                    </div>
                    <div className={styles.changeContainer}>
                        <label>Current Password</label>
                        <div className={styles.innerChangeContainer}>
                            <input type="password" id="confirmPass" {...registerU("password")} />
                            <div></div>
                            <label className={styles.error}>{errorsU?.password?.message}</label>
                        </div>
                    </div>
                </form>
            </Modal>
            <Modal show={changeEmail} buttons={[{ value: "Exit", function: () => showChangeEmail(false) }, { value: "Done", function: handleSubmitE(changeEmailAPI) }]} width="450" height="300">
                <form className={styles.changeEmailModal}>
                    <div className={styles.changeContainer}>
                        <label>New Email</label>
                        <div className={styles.innerChangeContainer}>
                            <input type="text" {...registerE("email")} />
                            <label className={styles.error}>{errorsE?.email?.message}</label>
                        </div>
                    </div>
                    <div className={styles.changeContainer}>
                        <label>Current Password</label>
                        <div className={styles.innerChangeContainer}>
                            <input type="password" {...registerE("password")} />
                            <label className={styles.error}>{errorsE?.password?.message}</label>
                        </div>
                    </div>
                </form>
            </Modal>
            <Modal show={changePass} buttons={[{ value: "Exit", function: () => showChangePass(false) }, { value: "Done", function: handleSubmitP(changePasswordAPI) }]} width="450" height="300">
                <form className={styles.changePasswordModal}>
                    <div className={styles.changeContainer}>
                        <label>New Password</label>
                        <div className={styles.innerChangeContainer}>
                            <input type="password" {...registerP("newPassword")} />
                            <label className={styles.error}>{errorsP?.newPassword?.message}</label>
                        </div>
                    </div>
                    <div className={styles.changeContainer}>
                        <label>Confirm Password</label>
                        <div className={styles.innerChangeContainer}>
                            <input type="password" {...registerP("confirmPassword")} />
                            <label className={styles.error}>{errorsP?.confirmPassword?.message}</label>
                        </div>
                    </div>
                    <div className={styles.changeContainer}>
                        <label>Current Password</label>
                        <div className={styles.innerChangeContainer}>
                            <input type="password" {...registerP("password")} />
                            <label className={styles.error}>{errorsP?.password?.message}</label>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    }
    return (
        <Menu show={props.show} exit={() => { setActive(0); props.exit() }} render={renderUserSettings()} modals={modals()}>
            <div className={styles.optionHeading}><p>User Settings</p></div>
            <div className={active === 0 ? `${styles.optionButton} ${styles.active}` : styles.optionButton} ><input type="button" value="User Profile" onClick={() => { setActive(0) }} /></div>
            <div className={active === 1 ? `${styles.optionButton} ${styles.active}` : styles.optionButton}><input type="button" value="Appearance" onClick={() => { setActive(1) }} /></div>
            <div className={styles.optionButton}><input type="button" value="Log Out" id="leaveButton" /></div>
        </Menu>
    )
}

function ServerMenu(props) {
    const [active, setActive] = React.useState(0);
    const [showDelete, setShowDelete] = React.useState(false);

    const dispatch = useDispatch();

    function renderServerSettings() {
        switch (active) {
            case 0:
                return <ServerSettings />;
            case 1:
                return <BanOrKickSettings />;
            case 2:
                return <BannedUsersSettings />;
            case 3:
                return <ManageInvitesSettings />;
            default:
                return <p>Something is Wrong!</p>;
        }
    }
    function deleteServer() {
        const res = dispatch(DeleteGuild());
        if (res.error) {
            console.log(res.error);
        }
        setShowDelete(false);
    }
    function modals() {
        return (
            <Modal show={showDelete} buttons={[{ value: "Exit", function: () => setShowDelete(false) }, { value: "Done", function: deleteServer }]} >
                <p style={{ fontSize: "22px" }}>Are you sure?</p>
            </Modal>
        )
    }
    return (
        <Menu show={props.show} exit={() => { setActive(0); props.exit() }} render={renderServerSettings()} modals={modals()}>
            <div className={styles.optionHeading}><p>Server Settings</p></div>
            <div className={active === 0 ? `${styles.optionButton} ${styles.active}` : styles.optionButton}><input type="button" value="Server Settings" onClick={() => { setActive(0) }} /></div>
            <div className={active === 1 ? `${styles.optionButton} ${styles.active}` : styles.optionButton}><input type="button" value="Ban/Kick User" onClick={() => { setActive(1) }} /></div>
            <div className={active === 2 ? `${styles.optionButton} ${styles.active}` : styles.optionButton}><input type="button" value="Banned Users" onClick={() => { setActive(2) }} /></div>
            <div className={active === 3 ? `${styles.optionButton} ${styles.active}` : styles.optionButton}><input type="button" value="Manage Invites" onClick={() => { setActive(3) }} /></div>
            <div className={styles.optionButton}><input type="button" value="Delete Server" id="leaveButton" onClick={() => setShowDelete(true)} /></div>
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