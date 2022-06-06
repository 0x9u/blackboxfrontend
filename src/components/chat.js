import React from 'react';
import styles from './chat.module.css';
import {Menu, Modal, CheckBox, InputBox} from './loading.js';


function Msg(props) {
    return (
        <div className={styles.msg}>
            <img src={props.img} width="50" height="50" alt="pfp"/>
            <label>{props.username}</label>
            <p>{props.msg}</p>
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
    const [invitetxt, setInviteTxt] = React.useState(""); //for type in invite

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

    return (
        <div className={styles.chatContainer}>
                <div className={styles.menuUserContainer}>
                <div className={styles.userModal}>
                    <div className={styles.userModalUsername}><p>Bob Swanson</p><div><input type="button" value="settings" onClick={() => setMenu(true)}/><input type="button" value="server" onClick={() => setServer(true)}/></div></div>
                    <div className={styles.userModalProfile}><img src="https://i1.sndcdn.com/avatars-IesRuX9vhlBZzVuz-1H6bOA-t500x500.jpg" id="pfp"/></div>
                </div>
                <div className={styles.menu}>
                    <MenuOption name="Games (Not Working yet)" function={() => 1}/>
                    <MenuOption name="Create/Add Chat" function={() => setChat(true)}/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    </div>
                </div>
                <div className={styles.chat}>
                    <div className={styles.chatContent}>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Helloa World!"/>
                    </div>
                    <div className={styles.chatControl}>
                        <div className={styles.userInput}>
                        <textarea placeholder="type here!"/>
                        <input type="button" value="Send!"/>
                        </div>
                    </div>
                </div>
                <Menu show={menu} exit={() => setMenu(false)}/>
                <Modal show={server} function={() => setServer(false)} button buttonVal="Exit" width="550" height="350">
                    <div className={styles.serverOptionsContainer}>
                        <p>You selected {"Sample Text" /* Add something idk idc */}</p>
                        <div className={styles.serverOptions}>
                            <div className={styles.createInviteOption}>
                                <div><p>Your Invite Is </p></div>
                                <input className="default" type="button" value="Create Invite" id="createInviteButton"/>
                            </div>
                            <div className={styles.serverButtonsOption}>
                                <input className="default" type="button" value="Server Settings" id="serverSettingsButton"/>
                                <input className="default" type="button" value="Leave Server" id="leaveServerButton"/>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal show={chat} function={() => {setChat(false);setCreate(0);}} button otherbuttons={ create !== 0 && create !== -1 ? [{ value : "Back", back : true , function : () => {setCreate(-1)}}] : []} buttonVal="Exit" width="500" height={create === 1 ? "450" : "350"} transition={create !== 0 ? "0.5s" : "0s"}>
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
                                <div className={styles.changeProfile}>
                                    <img src="https://www.pngitem.com/pimgs/m/661-6619328_default-avatar-png-blank-person-transparent-png.png"/>
                                    <input type="file"/>
                                </div>
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
                <div className={styles.pageChange}></div>
        </div>

    );
}

export default Chat;