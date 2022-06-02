import React from 'react';
import './chat.css'
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
    const [menu, setMenu] = React.useState(false);
    const [chat, setChat] = React.useState(false);
    const [create, setCreate] = React.useState(0);
    return (
        <div className="chat-container">
                <div className="menu-user-container">
                <div className="user-modal">
                    <div className="user-modal-username"><p>Bob Swanson</p><div><input type="button" value="settings" onClick={() => setMenu(true)}/><input type="button" value="server"/></div></div>
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
                <Modal show={chat} function={() => {setChat(false); setCreate(0);}} button buttonVal="Exit" width="500" height={create === 1 ? "450" : "350"} transition={create !== 0 ? "0.5s" : "0s"}>
                    <div className="add-chat-options">
                        <p>Create/Add Chat</p>
                        <div className={create === 0 ? "chat-options-container" : "chat-options-container hidden"}>
                            <button onClick={() => setCreate(1)}><label>Create Chat</label><img src="http://www.photogriffon.com/photos-du-monde/DWAYNE-JOHNSON-THE-ROCK-th-best-pictures-ses-plus-belles-photos/DWAYNE-JOHNSON-THE-ROCK-photo-man-maxy-force-bodybuilding-1.jpg"/></button>
                            <button onClick={() => setCreate(2)}><label>Join Chat</label><img src="http://www.photogriffon.com/photos-du-monde/DWAYNE-JOHNSON-THE-ROCK-th-best-pictures-ses-plus-belles-photos/DWAYNE-JOHNSON-THE-ROCK-photo-man-maxy-force-bodybuilding-1.jpg"/></button>
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
                                <label htmlFor="server-name">Server Name</label><input id="server-name" type="text" maxLength={16}/>
                            </div>
                            <div className='create-info-option'>
                                <input type="button" value="Create"/>
                            </div>
                            </div>
                        </div>
                        <div className={create === 2 ? "chat-join-container" : "chat-join-container hidden"}>
                            <input id="invite-input" placeholder="Invite Code" type="text" maxLength={32}/>
                            <input type="button" value="Join"/>
                            </div>
                    </div>
                    </Modal>
                <div className="pageChange"> </div>
        </div>

    );
}

export default Chat;