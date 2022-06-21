import React from 'react';
import styles from './chat.module.css';
import {Menu, Modal, CheckBox, InputBox, PictureSelector} from './modals.js';


function Msg(props) {
    return (
        <div className={styles.msg}>
            <img src={props.img} width="50" height="50" alt="pfp"/>
            <label>{props.username}</label>
            <p>{props.msg}</p>
        </div>
        );
}

function User(props) {
    return (
        <div className={styles.userListChild}>
            <img src={props.img} width="50" height="50" alt="pfp"/>
            <p>{props.username}</p>
        </div>
    );
}


function MenuOption(props) {
    return (
        <div className={styles.menuOption} onClick={props.function}>
            <p>{props.name}</p>
        </div>
    );
}

function Guild(props) {
    return (
    <div className={styles.guildContainer}>
    <div className={styles.guildOption}>
        <p>{props.name}</p>
    </div>
    <img src={props.img} alt="server pfp"/>
    </div>
    );
}

function Chat() { //might turn into class
    const [menu, setMenu] = React.useState(false); //show the settings?
    const [server, setServer] = React.useState(false); //show server settings / create invite?
    const [chat, setChat] = React.useState(false); //to determine if it should show dialog to invite or create chat
    const [create, setCreate] = React.useState(0); //for type in invite/create chat
    const [inviteTxt, setInviteTxt] = React.useState(""); //for type in invite
    const [genInvite, setGenInvite] = React.useState("avbsadjajsdajasdasdsadasdasdasasjiod"); //for generated invite
    const [userList, setUserList] = React.useState(false); //for userlist
    const [invite, setInvite] = React.useState(false);
    const [serverSettings, setServerSettings] = React.useState(false);

    const [serverImage, setServerImage] = React.useState(null);

    function saveChatHistoryOption () {
        console.log("save chat history");
    }

    function handleInviteChange (e) {
        setInviteTxt(e.target.value);
    }

    function createGuild() {
        setCreate(0);
        setChat(false);
    }

    function exitCreateChat() {
        setCreate(0);
        setChat(false);
    }

    function changeServerImage(e) {
        setServerImage(e.target.files[0]);
    }

    return (
        <div className={styles.chatContainer}>
                <div className={styles.menuUserContainer}>
                <div className={styles.userModal}>
                    <div className={styles.userModalUsername}><p>Bob Swanson</p><div><input type="button" value="settings" onClick={() => setMenu(true)}/></div></div>
                    <div className={styles.userModalProfile}><img src="https://i1.sndcdn.com/avatars-IesRuX9vhlBZzVuz-1H6bOA-t500x500.jpg" id="pfp"/></div>
                </div>
                <div className={styles.menu}>
                    <MenuOption name="Games (Not Working yet)" function={() => 1}/>
                    <MenuOption name="Create/Add Chat" function={() => setChat(true)}/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    </div>
                </div>
                <div className={styles.chat}>
                    <div className={styles.chatTopMenu}>
                        <div className={styles.topMenuServerName}>
                            <p>{"Gods plan"}</p>
                        </div>
                        <div className={styles.topMenuServerButton}>
                        <input type="button" value="server" onClick={() => {setServer(!server) ; setUserList(false)}}/>
                        <input type="button" value="user list" onClick={() => {setUserList(!userList); setServer(false) }}/>
                        </div>
                    </div>
                    <div className={styles.chatContentContainer}>
                    <div className={styles.chatContent}>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Helloa World!"/>
                    </div>
                    <div className={userList ? styles.chatUserList : styles.chatUserListHidden}>
                        <User username="Bob swanson" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" />
                        <User username="Bob swanson" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" />
                        <User username="Bob swansoaaaaaaaaaaaaaaaaaaaaaaaaaan" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" />

                        <User username="Bob swanson" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" />

                        <User username="Bob swanson" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" />

                        <User username="Bob swanson" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" />

                        <User username="Bob swanson" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" />
                        <User username="Bob swanson" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" />

                        <User username="Bob swanson" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" />

                        <User username="Bob swanson" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" />

                        <User username="Bob swanson" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" />

                        <User username="Bob swanson" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" />


                    </div>
                    <div className={server ? styles.serverMiniOptions : styles.serverMiniOptionsHidden}>
                    <input className="default" type="button" value="Create Invite" id="createInviteButton" onClick={() => {setInvite(true); setServer(false);}}/>
                    <input className="default" type="button" value="Server Settings" id="serverSettingsButton" onClick={() => {setServerSettings(true); setServer(false)}}/>
                    <input className="default" type="button" value="Leave Server" id="leaveServerButton"/>
                    </div>
                    </div>
                    <div className={styles.chatControl}>
                        <div className={styles.userInput}>
                        <textarea placeholder="type here!"/>
                        <input type="button" value="Send!"/>
                        </div>
                    </div>
                </div>
                <Menu show={serverSettings} type={1} exit={() => setServerSettings(false)}/>
                <Menu show={menu} type={0} exit={() => setMenu(false)}/>
                <Modal show={chat} buttons={ create !== 0 && create !== -1 ? [{ value : "Back", function : () => {setCreate(-1)}}, {value: "Exit", function : () => {exitCreateChat()}}] : [{value: "Exit", function : () => {exitCreateChat()}}]} width="500" height={create === 1 ? "450" : "350"} transition={create !== 0 ? "0.5s" : "0s"}>
                    <div className={styles.addChatOptions}>
                        <p>Create/Add Chat</p>
                        <div className={create === 0 || create === -1 ? styles.chatOptionsContainer : `${styles.chatOptionsContainer} ${styles.hidden}`}>
                            <button onClick={() => setCreate(1)}><label>Create Chat</label></button>
                            <button onClick={() => setCreate(2)}><label>Join Chat</label></button>
                        </div>
                        <div className={create === 1 ? styles.chatCreateContainer : `${styles.chatCreateContainer} ${styles.hidden}`}>
                            <div className={styles.createInformation}>
                                <div className={styles.createInfoOption} id="publicServerOption">
                                <label >Public Server?</label><CheckBox disabled/>
                                </div>
                                <div className={styles.createInfoOption} id="saveHistoryOption">
                                <label>Save Chat History?</label><CheckBox onChange={saveChatHistoryOption}/>
                                </div>
                            </div>
                            <div className={styles.createAppearance}>
                            <div className={styles.createInfoOption} id="changeProfile">
                                {/*<div className={styles.changeProfile}>
                                    <img src="https://www.pngitem.com/pimgs/m/661-6619328_default-avatar-png-blank-person-transparent-png.png"/>
                                    <input type="file"/>
                                </div>
                                */}
                                <PictureSelector src={ serverImage } height="150" width="150"/>
                            </div>
                            <div className={styles.createInfoOption}>
                                <InputBox id="serverNameInput" label="Server Name" onChange={handleInviteChange} type="text" maxLength={16}/>
                            </div>
                            <div className={styles.createInfoOption}>
                                <input className="default" type="button" value="Create" id="createChatButton"/>
                            </div>
                            </div>
                        </div>
                        <div className={create === 2 ? styles.chatJoinContainer : `${styles.hatJoinContainer} ${styles.hidden}`}>
                            <InputBox id="inviteInput" label="Invite Code" onChange={handleInviteChange} type="text" maxLength={16}/>
                            <input className="default" type="button" value="Join" onClick={createGuild}/>
                        </div>
                    </div>
                    </Modal>
                    <Modal show={invite} height="250" width="400" buttons={[{value: "Exit", function : () => setInvite(false)}]}>
                        <h1>Create Invite</h1>
                        <div className={styles.inviteContainer}>
                            <div className={styles.inviteBox}>
                                <label>Your Invite</label>
                                <input value={genInvite} type="text" readOnly/>
                            </div>
                            <div>
                            <input type="button" value="Create" className={`default ${styles.genInviteButton}`} onClick={(() => {})}/>
                            </div>
                        </div>
                    </Modal>
                <div className={styles.pageChange}></div>
        </div>

    );
}

export default Chat;