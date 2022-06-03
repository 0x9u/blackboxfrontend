import React from 'react';
import './chat.css';
import {Menu, Modal, CheckBox} from './loading.js';


function Msg(props) {
    return (
        <div className="msg">
            <img src={props.img} width="50" height="50" alt="pfp"/>
            <label>{props.username}</label>
            <p>{props.msg}</p>
        </div>
        );
}


function MenuOption(props) {
    return (
        <div className="menu-option" onClick={props.function}>
            <p>{props.name}</p>
        </div>
    );
}

function Guild(props) {
    return (
    <div className="guild-container">
    <div className="guild-option">
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

    function createGuild() {
        setCreate(0);
        setChat(false);
    }

    return (
        <div className="chat-container">
                <div className="menu-user-container">
                <div className="user-modal">
                    <div className="user-modal-username"><p>Bob Swanson</p><div><input type="button" value="settings" onClick={() => setMenu(true)}/><input type="button" value="server" onClick={() => setServer(true)}/></div></div>
                    <div className="user-modal-profile"><img src="https://i1.sndcdn.com/avatars-IesRuX9vhlBZzVuz-1H6bOA-t500x500.jpg" id="pfp"/></div>
                </div>
                <div className="menu">
                    <MenuOption name="Games (Not Working yet)" function={() => 1}/>
                    <MenuOption name="Create/Add Chat" function={() => setChat(true)}/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods planaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    <Guild img="https://image.shutterstock.com/z/stock-vector-illustration-of-simple-house-isolated-on-white-background-1937900650.jpg" name="Gods plan"/>
                    </div>
                </div>
                <div className="chat">
                    <div className="chat-content">
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Helloa World!"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!"/>
                        <Msg username="The Rock" img="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" msg="Hello World!"/>
                    </div>
                    <div className="chat-control">
                        <div className="user-input">
                        <textarea placeholder="type here!"/>
                        <input type="button" value="Send!"/>
                        </div>
                    </div>
                </div>
                <Menu show={menu} exit={() => setMenu(false)}/>
                <Modal show={server} function={() => setServer(false)} button buttonVal="Exit" width="550" height="350">
                    <div className="server-options-container">
                        <p>You selected {"Sample Text" /* Add something idk idc */}</p>
                        <div className="server-options">
                            <div className="create-invite-option">
                                <div><p>Your Invite Is </p></div>
                                <input className="default" type="button" value="Create Invite" id="create-invite-button"/>
                            </div>
                            <div className="server-buttons-option">
                                <input className="default" type="button" value="Server Settings" id="server-settings-button"/>
                                <input className="default" type="button" value="Leave Server" id="leave-server-button"/>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal show={chat} function={() => {setChat(false);setCreate(0);}} button otherbuttons={ create != 0 ? [{ value : "Back", back : true , function : () => {setCreate(0)}}] : []} buttonVal="Exit" width="500" height={create === 1 ? "450" : "350"} transition={create !== 0 ? "0.5s" : "0s"}>
                    <div className="add-chat-options">
                        <p>Create/Add Chat</p>
                        <div className={create === 0 ? "chat-options-container" : "chat-options-container hidden"}>
                            <button onClick={() => setCreate(1)}><label>Create Chat</label></button>
                            <button onClick={() => setCreate(2)}><label>Join Chat</label></button>
                        </div>
                        <div className={create === 1 ? "chat-create-container" : "chat-create-container hidden"}>
                            <div className="create-information">
                                <div className="create-info-option" id="public-server-option">
                                <label >Public Server?</label><CheckBox disabled/>
                                </div>
                                <div className="create-info-option" id="save-history-option">
                                <label>Save Chat History?</label><CheckBox/>
                                </div>
                            </div>
                            <div className="create-appearance">
                            <div className="create-info-option" id="change-profile">
                                <div className="change-profile">
                                    <img src="https://www.pngitem.com/pimgs/m/661-6619328_default-avatar-png-blank-person-transparent-png.png"/>
                                    <input type="file"/>
                                </div>
                            </div>
                            <div className="create-info-option">
                                <div className="userBox" id="server-name-input">
                                    <input placeholder=" " type="text" maxLength={16}/>
                                    <label>Server Name</label>
                                </div>
                            </div>
                            <div className='create-info-option'>
                                <input className="default" type="button" value="Create" id="create-chat-button"/>
                            </div>
                            </div>
                        </div>
                        <div className={create === 2 ? "chat-join-container" : "chat-join-container hidden"}>
                            <div className="userBox" id="invite-input">
                            <input placeholder=" " type="text" maxLength={32}/>
                            <label>Invite Code</label>
                            </div>
                            <input className="default" type="button" value="Join" onClick={createGuild}/>
                            </div>
                    </div>
                    </Modal>
                <div className="pageChange"> </div>
        </div>

    );
}

export default Chat;