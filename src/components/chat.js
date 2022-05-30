import React from 'react';
import './chat.css'
import {Menu} from './loading.js';

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
    const [show, setShow] = React.useState(false);
    return (
        <div className="chat-container">
                <div className="menu">
                    <MenuOption name="Settings" function={() => setShow(true)}/>
                    <MenuOption name="Games (Not Working yet)" function={() => 1}/>
                    <MenuOption name="Create/Add Chat" function={() => 1}/>
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
                <Menu show={show} exit={() => setShow(false)}/>
                <div className="pageChange"> </div>
        </div>

    );
}

export default Chat;