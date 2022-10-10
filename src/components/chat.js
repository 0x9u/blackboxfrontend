import React from 'react';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
//import { useInView } from 'react-intersection-observer';

import InfiniteScroll from 'react-infinite-scroll-component';
import Linkify from 'react-linkify';

import './themes.css';
import styles from './chat.module.css';

import { UserMenu, ServerMenu, Modal, CheckBox, InputBox, PictureSelector, PageChange, PageChangeAfter } from './modals';
import { useStartWSQuery } from '../api/websocket';
import { GetMsgs, SendMsgs, DeleteMsgs, EditMsgs } from '../api/msgApi';
import { GetGuildUsers, GenInvite, GetInvite, CreateGuild, JoinGuild, LeaveGuild, GetGuildSettings, GetBannedUsers } from '../api/guildApi';
import { authClear } from '../app/reducers/auth';
import { guildCurrentSet, guildReset, msgEditSet, msgRemoveFailed } from '../app/reducers/guilds';
import { userClear } from '../app/reducers/userInfo';
import { websocketApi } from '../api/websocket';
import { clientLastGuildActiveSet, clientClear } from '../app/reducers/client';


function Msg(props) { //TODO add id to return in backend
    const dispatch = useDispatch();
    const isOwner = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.Owner === state.auth.userId);
    const currentGuild = useSelector(state => state.guilds.currentGuild);
    const userId = useSelector(state => state.auth.userId);
    const editMessage = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.EditMessage);

    const [editValue, setEditValue] = React.useState(props.msg);

    React.useEffect(() => {
        setEditValue(props.msg);
    }, [props.msg])

    async function retryMessage() {
        await dispatch(msgRemoveFailed({
            requestId: props.RequestId
        }));
        await dispatch(SendMsgs({
            msg: props.msg,
            guild: currentGuild
        }));
    }

    async function sendEditedMessage(msgText) {
        await dispatch(EditMsgs({
            Msg: msgText,
            Id: props.Id,
            RequestId: !props.msgSaved ? props.RequestId : undefined,
            Guild: currentGuild
        }))
        await dispatch(msgEditSet({ Id: -1 }));
    }

    function cancelEdit() {
        setEditValue(props.msg);
        dispatch(msgEditSet({ Id: -1 }));
    }


    function prepareSendMsg() {
        const preparedTxt = editValue.trim();
        if (preparedTxt.length > 0 && preparedTxt.length < 1024) {
            sendEditedMessage(preparedTxt);
            setEditValue(props.msg);
        }
    }

    function handleKeySend(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            prepareSendMsg();
        }
        else if (e.keyCode === 27) {
            cancelEdit();
        }
    }

    //fixed new line problem
    return (
        <div className={`${styles.msg} ${props.hideUserTime ? styles.hideUserTime : ""}`}>
            {!props.hideUserTime && <>
                <img src={props.img} width="40" height="40" />
                <label className={`${styles.msgUserTime} themeOneTextUserTime`}>{props.username} <span>{props.time}</span></label>
            </>}
            {
                (editMessage === props.Id || editMessage === props.RequestId/* && props.msgSaved*/) ?
                    <>
                        <textarea className={`${props.hideUserTime ? styles.hideUserTime : ""} themeOneTextArea`} value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={handleKeySend} />
                        <label className={`${props.hideUserTime ? styles.hideUserTime : ""} ${styles.msgEditButtons} themeOneText`}>esc to <a className={styles.msgEditCancel} onClick={cancelEdit}>Cancel</a> • enter to <a className={styles.msgEditSave} onClick={prepareSendMsg}>Save</a></label>
                    </>
                    : <p className={`${props.hideUserTime ? styles.hideUserTime : ""} ${props.loading ? styles.msgSentLoading : ""} ${props.failed ? "themeOneImportantText" : "themeOneText"}`}>
                        <Linkify>
                        {(() => { //splits new lines
                            const splitMsgs = props.msg.split(/\n/);
                            return splitMsgs.map((line, index) =>
                                <React.Fragment key={index}>{line}{index !== (splitMsgs.length - 1) && <br className={styles.msgNewLine} />}</React.Fragment>
                            )
                        })()}
                        </Linkify>
                        {props.edited && <span className={styles.msgEdited}> (edited)</span>}
                    </p>
            }
            {(((isOwner || userId === props.AuthorId) && !props.loading/* && props.msgSaved*/) || props.failed)
                &&
                <div className={styles.msgButtons}>
                    {
                        !props.failed
                        && <>
                            <input className={`${styles.msgButtonChild} themeOneImportant themeOneButton`}
                                type="button" value="Delete" onClick={() => { dispatch(DeleteMsgs({ Id: props.Id, Author: props.AuthorId, RequestId : !props.msgSaved ? props.RequestId : undefined })) }} />
                            {
                                (editMessage !== props.Id && editMessage !== props.RequestId && userId === props.AuthorId) && <input className={`${styles.msgButtonChild} themeOneButton`} type="button" value="Edit"
                                    onClick={() => { dispatch(msgEditSet({ Id: props.msgSaved ? props.Id : props.RequestId })) }} />
                            }
                        </>
                    }
                    {
                        props.failed &&
                        <input className={`${styles.msgButtonChild} themeOneImportant themeOneButton`} type="button" value="Retry" onClick={retryMessage} />
                    }
                </div>
            }
        </div>
    );
}

function RenderChatMsgs() {
    const msgsList = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.MsgHistory ?? []);
    const currentGuild = useSelector(state => state.guilds.currentGuild);
    const guildLoaded = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.Loaded ?? false)
    const userId = useSelector(state => state.auth.userId);
    const username = useSelector(state => state.userInfo.username);

    if (currentGuild === 0) {
        return;
    }
    if (msgsList?.length === 0) {
        return (<div className={styles.noMessages}>{guildLoaded ? "Start the chat with a message!" : "Chat is loading"}</div>)
    }
    return msgsList.map((msg, index) => {
        const time = new Date(msg.Time)
        const beforeTime = new Date(msgsList?.[index + 1]?.Time)
        const hideUserTime = beforeTime?.getMinutes() === time.getMinutes() && beforeTime?.getHours() === time.getHours() && ((msg?.Author?.Username === msgsList?.[index + 1]?.Author?.Username) || (msg?.RequestId && msgsList?.[index + 1]?.Author?.Username === username))

        //show pending message
        console.log(msg)
        if (!msg?.Loaded) {
            return <Msg key={msg.RequestId} Id={0} AuthorId={userId} RequestId={msg.RequestId} img="/profileImg.png" username={username} time={time.toLocaleString()} msg={msg.Content} loading={true} failed={msg?.Failed} hideUserTime={hideUserTime} />
        } //msg.Id || index because sometimes chat isnt saved and therefore index is required instead
        return <Msg key={msg.Id || index} Id={msg.Id} AuthorId={msg.Author.Id} RequestId={msg.RequestId} edited={msg.Edited} msgSaved={msg.MsgSaved} img="/profileImg.png" username={msg.Author.Username} msg={msg.Content} time={time.toLocaleString()} hideUserTime={hideUserTime} />
    });
}

function User(props) {
    return (
        <div className={styles.userListChild}>
            <img src={props.img} width="50" height="50" alt="pfp" />
            <p className={"themeOneText"}>{props.isOwner && "👑 "}{props.username}</p>
        </div>
    );
}

function RenderUserList() {
    const userList = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.Users ?? []);
    const ownerId = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.Owner);
    return userList.map((user, index) => <User key={index} img="/profileImg.png" isOwner={user.Id === ownerId} username={user.Username} />);
}


function MenuOption(props) {
    return (
        <div className={`${styles.menuOption} themeOneButton`} onClick={props.function}>
            <p className={"themeOneText"}>{props.name}</p>
        </div>
    );
}

function Guild(props) {
    const dispatch = useDispatch();
    return (
        <div className={`${styles.guildContainer} ${props.active ? styles.active : ""}`} onClick={() => dispatch(guildCurrentSet({ Guild: props.guildId }))}>
            <div className={`${styles.guildOption} ${props.active ? "themeOneActive" : ""} themeOneButton`}>
                <p className={"themeOneText"}>{props.name}</p>
            </div>
            <img src={props.img} alt="server pfp" />
        </div>
    );
}

function RenderGuilds() {
    const guildInfo = useSelector(state => state.guilds.guildInfo);
    const guildOrder = useSelector(state => state.guilds.guildOrder);
    const currentGuild = useSelector(state => state.guilds.currentGuild);
    return guildOrder.map((guild, index) => <Guild key={guild} guildId={guild} img="/guildImg.png" icon={guildInfo[guild].Icon} name={guildInfo[guild].Name} active={guild === currentGuild} />);
}

function RenderChatName() {
    const guildName = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.Name ?? "NO NAME");
    return guildName
}

function InviteModal(props) {
    const genInvite = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.Invites?.at(-1) ?? "");
    const [errInvite, setErrInvite] = React.useState("");
    const [inviteCopied, setInviteCopied] = React.useState("");
    const dispatch = useDispatch();

    React.useEffect(() => {
        setErrInvite("");
        setInviteCopied("");
    }, [props.show]); //clear error message when the modal closes

    async function getInvite() {
        const res = await dispatch(GenInvite());
        //these operators are overkill lmao
        if (!res?.error?.message) {
            navigator.clipboard.writeText(genInvite);
            setInviteCopied("Invite copied to clipboard!");
        } else {
            setInviteCopied("");
        }
        setErrInvite(res?.error?.message ?? ""); //should be ok
    }

    function copyInvite() {
        navigator.clipboard.writeText(genInvite);
        setInviteCopied("Invite copied to clipboard!");
    }

    return (
        <Modal show={props.show} height="250" width="400" buttons={[{ value: "Exit", function: props.exit }]}>
            <h1>Create Invite</h1>
            <div className={styles.inviteContainer}>
                <div className={styles.inviteBox}>
                    <label>Your Invite</label>
                    <input value={genInvite} type="text" readOnly />
                    {!inviteCopied ?
                        <label className={`${styles.inviteBoxError} themeOneImportantText`}>{errInvite}</label>
                        : <label className={styles.inviteBoxInviteCopiedMsg}>{inviteCopied}</label>}
                </div>
                <div className={styles.inviteButtons}>
                    <input type="button" value="Create" className={`default themeOneButton ${styles.genInviteButton}`} onClick={getInvite} />
                    <input type="button" value="Copy" className={`default themeOneButton ${styles.genInviteButton}`} onClick={copyInvite} />
                </div>
            </div>
        </Modal>
    )
}

function Chat() { //might turn into class
    const [menu, setMenu] = React.useState(false); //show the settings?
    const [server, setServer] = React.useState(false); //show server settings / create invite?
    const [chat, setChat] = React.useState(false); //to determine if it should show dialog to invite or create chat
    const [create, setCreate] = React.useState(0); //for type in invite/create chat
    const [serverSettings, setServerSettings] = React.useState(false); //show server settings
    const [userList, setUserList] = React.useState(false); //for userlist
    const [invite, setInvite] = React.useState(false); //show invite dialog

    const [chatTxt, setChatTxt] = React.useState(""); //for type in chat


    const [serverImage, setServerImage] = React.useState("/profileImg.png");
    const [showPanic, setShowPanic] = React.useState(false);

    const [changePage, setChangePage] = React.useState(false);

    //const [keyPressed, setKeyPressed] = React.useState([]);

    const dummyMsgBottomRef = React.useRef(null); //used to scroll down to bottom of chat when new message appears (CHANGE LATER NOT GOOD DESIGN!!!)
    //    const loadMoreMsgRef = React.useRef(null); //used to load more messages when scrolled to top of chat
    const chatContentRef = React.useRef(null); //scroll down to hide loadmoremsg element
    /*
        const {ref: inViewRef} = useInView({onChange : (inView, entry) => {
            if (inView) {
                //double msg bug
                dispatch(GetMsgs()); 
                //there might be another way but idk man
                //no margin for the beginning chat msg element because i dont want another variable
                chatContentRef.current.scrollBy(0, loadMoreMsgRef.current?.offsetHeight ?? 0);
            } //function only works once when changed since its on change
        }});
    */
    /*const combinedRef = React.useCallback((node) => {
        loadMoreMsgRef.current = node;
        inViewRef(node);
    },
    [inViewRef]);
*/
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { expires, userId, token } = useSelector(state => state.auth);

    useStartWSQuery({ token }, { skip: !token })
    //this is programmed to cancel once this component is unmounted

    const isLoading = useSelector(state => state.guilds.isLoading);

    const messages = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.MsgHistory ?? []); //maybe temp?
    const guildLoaded = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.Loaded); //maybe temp?
    const isOwner = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.Owner === state.auth.userId);
    const msgLimitReached = useSelector(state => state.guilds.guildInfo?.[state.guilds.currentGuild]?.MsgLimitReached);
    const currentGuild = useSelector(state => state.guilds.currentGuild);

    const keyBindList = useSelector((state) => Object.keys(state.client.keyBind));
    const panicLink = useSelector((state) => state.client.link);
    const redirectPanic = useSelector((state) => state.client.redirectPanic);

    const lastGuildActive = useSelector((state) => state.client.lastGuildActive);


    function GetData() {
        console.log("loading messages")
        dispatch(GetGuildUsers()).then(() => dispatch(GetMsgs())).then(() => dispatch(GetInvite())).then(() => dispatch(GetBannedUsers())).then(() => dispatch(GetGuildSettings()));
    }

    const schemaCreateChat = Yup.object().shape({
        serverName: Yup.string()
            .required("Server name is required")
            .min(6, "Has to be at least 6 characters")
            .max(16, "Cannot be longer than 16 characters"),
        saveChat: Yup.bool()
    });

    const schemaJoinChat = Yup.object().shape({
        invite: Yup.string()
            .required("Invite is required")
            .test("len", "Must be exactly 10 characters", val => val.length === 10),
    })

    const { handleSubmit: handleSubmitC, register: registerC, setError: setErrorC, reset: resetC, formState: { errors: errorsC } } = useForm({
        resolver: yupResolver(schemaCreateChat)
    });

    const { handleSubmit: handleSubmitJ, register: registerJ, setError: setErrorJ, reset: resetJ, formState: { errors: errorsJ } } = useForm({
        resolver: yupResolver(schemaJoinChat)
    });

    function prepareSendMsg() {
        const preparedTxt = chatTxt.trim();
        if (preparedTxt.length > 0 && preparedTxt.length < 1024) {
            dispatch(SendMsgs({ msg: preparedTxt, guild: currentGuild }));
            setChatTxt("");
        }
    }

    function handleKeySend(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            prepareSendMsg();
        }
    }

    React.useEffect(
        () => {
            if (Date.now() > expires) {
                dispatch(authClear());
            }
            if (![token, userId, expires].every(Boolean)) {
                navigate("../login", { "replace": false });
                dispatch(guildReset());
                dispatch(userClear());
                dispatch(clientClear());
                dispatch(websocketApi.util.resetApiState()); // stops the fucking websocket finally god damn it took so long
                //stupid ass documentation says nothing about this
                return;
            }

        }, [dispatch, navigate, token, userId, expires])

    React.useEffect(
        () => {
            //looks better with these
            setServer(false);
            setUserList(false);
            setServerSettings(false);
            if (!guildLoaded && currentGuild !== 0) {
                GetData();
            }
        }
        , [currentGuild]);



    React.useEffect( //maybe temp?
        () => { //fix (chat scrolls to bottom when getting old messages)
            dummyMsgBottomRef.current?.scrollIntoView();
        }, [messages?.[0]] //temp fix
    )

    const userInfo = useSelector(state => state.userInfo);

    async function joinGuild(form) {
        const res = await dispatch(JoinGuild({
            invite: form.invite //being explicit for now
        }))
        if (res.error) {
            setErrorJ("invite", { type: "custom", message: res.error.message });
            return;
        }
        resetJ();
        setCreate(0);
        setChat(false);
    }

    async function createGuild(form) {
        const res = await dispatch(CreateGuild({
            name: form.serverName,
            saveChat: form.saveChat
        }));
        if (res.error) {
            setErrorC("serverName", { type: "custom", message: res.error.message });
            return;
        }
        resetC();
        setCreate(0);
        setChat(false);
    }

    async function leaveGuild() {
        const res = await dispatch(LeaveGuild());
        if (res.error) {
            console.log("Error occurred when leaving guild", res.error);
            return;
        }
    }

    function exitCreateChat() {
        setCreate(0);
        setChat(false);
    }

    function changeServerImage(e) {
        setServerImage(e.target.files[0]);
    }

    async function WaitAnim() {
        setChangePage(true);
        await setTimeout(() => {
            navigate("../games", { "replace": false });
        }, 1500); //replace: replaces the history (didnt find anything about it in documentation bruh)
    }

    React.useEffect(() => {

        let keyPressed = new Set();

        function keyBindUp(e) {
            const key = e.key === " " ? "Space" : e.key;
            keyPressed.delete(key);
        }

        function keyBindDown(e) {
            if (e.repeat || keyBindList.length === 0) return;
            const key = e.key === " " ? "Space" : e.key;
            keyPressed.add(key);
            for (const k of keyBindList) {
                if (!keyPressed.has(k)) {
                    return;
                }
            }
            if (redirectPanic) {
                window.location.assign(!/((https?):\/\/)(.*)$/.test(panicLink) ? "http://" + panicLink : panicLink);
            } else {
                console.log(showPanic);
                setShowPanic(!showPanic);
            }
        }

        window.addEventListener("keydown", keyBindDown);
        window.addEventListener("keyup", keyBindUp);
        return () => {
            window.removeEventListener("keydown", keyBindDown);
            window.removeEventListener("keyup", keyBindUp);
        }
    }, [keyBindList, panicLink, redirectPanic, showPanic, setShowPanic])

    return (
        <div className={styles.chatContainer}>
            <div className={styles.menuUserContainer}>
                <div className={`${styles.userModal} themeOneDivThree`}>
                    <div className={styles.userModalUsername}>
                        <p className={"themeOneText"}> {userInfo.username || "NO NAME"} </p>
                        <div>
                            <input type="button" className={"themeOneButton"} value="settings" onClick={() => setMenu(true)} />
                        </div>
                    </div>
                    <div className={styles.userModalProfile}>
                        <img src="/profileImg.png" id="pfp" />
                    </div>
                </div>
                <div className={`${styles.menu} themeOneDivThree`}>
                    <MenuOption name="Games" function={WaitAnim} />
                    <MenuOption name="Create/Add Chat" function={() => setChat(true)} />
                    {
                        RenderGuilds()
                    }
                </div>
            </div>
            <div className={`${styles.chat} ${currentGuild === 0 ? styles.chatNoSelected : ""}`}>
                {
                    currentGuild === 0 &&
                    <div className={styles.chatNoSelected}>
                        <p className={"themeOneText"}>No Chat Selected</p>
                    </div>
                }
                <div className={`${styles.chatTopMenu} themeOneTopMenu`}>
                    <div className={styles.topMenuServerName}>
                        <p className={"themeOneText"}>{RenderChatName()}</p> {/* REPLACE WITH SOME COOL ASS FUNCTION */}
                    </div>
                    <div className={styles.topMenuServerButton}>
                        <input type="button" value="Server" onClick={() => { setServer(!server); setUserList(false) }} />
                        <input type="button" value="User List" onClick={() => { setUserList(!userList); setServer(false) }} />
                    </div>
                </div>
                <div className={styles.chatContentContainer} >
                    <div ref={chatContentRef} className={`${styles.chatContent} themeOneDivOne`} id="Iwanttodie">
                        <InfiniteScroll
                            dataLength={messages.length}
                            next={async () => { console.log("getting more"); await dispatch(GetMsgs()); }}
                            hasMore={!msgLimitReached && guildLoaded}
                            inverse={true}
                            style={{ display: 'flex', flexDirection: 'column-reverse' }}
                            loader={<div className={`${styles.startMsgDiv} themeOneText`}>Loading...</div>}
                            scrollableTarget={"Iwanttodie"}
                        >
                            {
                                messages.length > 0
                                &&
                                <div ref={dummyMsgBottomRef} className={styles.endMsgDiv}
                                ></div>} {/* used to scroll automatically down at bottom of chat lmao*/}
                            {
                                RenderChatMsgs()
                            }
                            {(msgLimitReached && messages.length > 0)
                                &&
                                <div className={styles.endOfMessages}>
                                    This is the end of the chat.
                                </div>
                            }
                        </InfiniteScroll>
                    </div>
                    <div className={`${userList ? styles.chatUserList : styles.chatUserListHidden} themeOneDivThree`}>
                        {
                            RenderUserList()
                        }

                    </div>
                    <div className={`${server ? styles.serverMiniOptions : styles.serverMiniOptionsHidden} themeOneDivTwo`}>
                        <input className={"default themeOneButton"} type="button" value="Create Invite" id="createInviteButton" onClick={() => { setInvite(true); setServer(false); }} />
                        {
                            isOwner &&
                            <input className={"default themeOneButton"} type="button" value="Server Settings" id="serverSettingsButton" onClick={() => { setServerSettings(true); setServer(false) }} />
                        }
                        {
                            !isOwner &&
                            <input className={"default themeOneButton themeOneImportant"} type="button" value="Leave Server" id="leaveServerButton" onClick={leaveGuild} />
                        }
                    </div>
                </div>
                <div className={`${styles.chatControl} themeOneDivTwo`}>
                    <div className={styles.userInput}>
                        <textarea placeholder="type here!" className={"themeOneTextArea"} value={chatTxt} onKeyDown={handleKeySend} onChange={(e) => setChatTxt(e.target.value)} />
                        <input type="button" value="Send!" className={"themeOneButton"} onClick={prepareSendMsg} />
                    </div>
                </div>
            </div>
            <ServerMenu show={serverSettings} exit={() => setServerSettings(false)} />
            <UserMenu show={menu} exit={() => setMenu(false)} />
            <Modal show={chat} buttons={create !== 0 && create !== -1 ? [{ value: "Back", function: () => { setCreate(-1) } }, { value: "Exit", function: () => { exitCreateChat() } }] : [{ value: "Exit", function: () => { exitCreateChat() } }]} width="500" height={create === 1 ? "450" : "350"} transition={create !== 0 ? "0.5s" : "0s"}>
                <div className={styles.addChatOptions}>
                    <p>Create/Add Chat</p>
                    <div className={create === 0 || create === -1 ? styles.chatOptionsContainer : `${styles.chatOptionsContainer} ${styles.hidden}`}>
                        <button className={"themeOneButton"} onClick={() => setCreate(1)}><label>Create Chat</label></button>
                        <button className={"themeOneButton"} onClick={() => setCreate(2)}><label>Join Chat</label></button>
                    </div>
                    <div className={create === 1 ? styles.chatCreateContainer : `${styles.chatCreateContainer} ${styles.hidden}`}>
                        <div className={styles.createInformation}>
                            <div className={styles.createInfoOption} id="publicServerOption">
                                <label >Public Server?</label><CheckBox disabled />
                            </div>
                            <div className={styles.createInfoOption} id="saveHistoryOption">
                                <label>Save Chat History?</label><CheckBox register={registerC("saveChat")} />
                            </div>
                        </div>
                        <div className={styles.createAppearance}>
                            <div className={styles.createInfoOption} id="changeProfile">
                                <PictureSelector src={serverImage} height="150" width="150" />
                            </div>
                            <div className={styles.createInfoOption}>
                                <InputBox id="serverNameInput" label="Server Name" type="text" maxLength={16} register={registerC("serverName")} errorMessage={errorsC?.serverName?.message} />
                            </div>
                            <div className={styles.createInfoOption}>
                                <input className="default themeOneButton" type="button" value="Create" id="createChatButton" onClick={handleSubmitC(createGuild)} />
                            </div>
                        </div>
                    </div>
                    <div className={create === 2 ? styles.chatJoinContainer : `${styles.hatJoinContainer} ${styles.hidden}`}>
                        <InputBox id="inviteInput" label="Invite Code" type="text" register={registerJ("invite")} errorMessage={errorsJ?.invite?.message} />
                        <input className="default themeOneButton" type="button" value="Join" onClick={handleSubmitJ(joinGuild)} />
                    </div>
                </div>
            </Modal>
            <InviteModal show={invite} exit={() => setInvite(false)} />
            {
                !isLoading &&
                <PageChangeAfter/>
            }
            {
                isLoading &&
                <div className={`${styles.loadingScreen} themeOneText themeOneDivOne`}>Loading...</div>
            }
            {
                showPanic &&
                <iframe src={panicLink} className={styles.panicWebsite} title="website"></iframe>
            }
            <PageChange show={changePage} />
        </div>

    );
}

export default Chat;