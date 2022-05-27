import React from 'react';
import './chat.css'

function Chat() {
    return (
        <div className="chat-container">
                <div className="menu">
                    <div className="menu-option">
                        <p>Brah</p>
                        </div>
                        <div className="menu-option">
                        </div>
                        <div className="menu-option">
                        </div>
                        <div className="menu-option">
                        </div>
                        <div className="menu-option">
                        </div>

                    </div>
                <div className="chat">
                    <div className="chat-content">
                        <div className="msg">
                            <img src="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" width="50" height="50" alt="pfp"/>
                            <p><span>The rock</span>Hello!</p>
                        </div>
                        <div className="msg">
                        <img src="https://fanbuzz.com/wp-content/uploads/sites/5/2019/05/Dwayne-Johnson.png" width="50" height="50" alt="pfp"/>
                            <p><span>The rock</span>Test 123</p>
                        </div>
                    </div>
                    <div className="chat-control">
                        <div className="user-input">
                        <textarea placeholder="type here!"/>
                        <input type="button" value="Send!"/>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Chat;