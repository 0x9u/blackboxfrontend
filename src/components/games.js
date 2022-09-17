import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import styles from './games.module.css';
import './themes.css';

import { PageChange, PageChangeAfter, ExitButton } from './modals';

import GameList from '../games/gamesList';

//import { websocketApi } from '../api/websocket';

function GameDisplay(props) {
    const navigate = useNavigate();

    const keyBindList = useSelector((state) => Object.keys(state.client.keyBind));
    const panicLink = useSelector((state) => state.client.link);
    const redirectPanic = useSelector((state) => state.client.redirectPanic);

    const [changePage, setChangePage] = React.useState(false);
    const [showPanic, setShowPanic] = React.useState(false);

    async function WaitAnim() {
        setChangePage(true);
        await setTimeout(() => {
            navigate("../games", { "replace": false });
        }, 1500);
    }
    React.useEffect(() => { //make this its own seperate function later

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
    }, [keyBindList, panicLink, redirectPanic, showPanic, setShowPanic]);

    return (
        <div className={styles.inGameContainer}>
            {props.game}
            <div className={styles.hoverMouseArea}>
                <ExitButton exit={WaitAnim} showLabel/>
            </div>
            <PageChange show={changePage} />
            <PageChangeAfter />
        </div>);
}

function Games() {

    const [changePage, setChangePage] = React.useState(false);

    const [showPanic, setShowPanic] = React.useState(false);

    const keyBindList = useSelector((state) => Object.keys(state.client.keyBind));
    const panicLink = useSelector((state) => state.client.link);
    const redirectPanic = useSelector((state) => state.client.redirectPanic);

    const navigate = useNavigate();

    async function WaitAnim() {
        setChangePage(true);
        await setTimeout(() => {
            navigate("../chat", { "replace": false });
        }, 1500);
    }

    async function WaitAnimGame(link) {
        setChangePage(true);
        await setTimeout(() => {
            navigate(`../games/${link}`, { "replace": false });
        }, 1500);
    }
    /*
    React.useEffect(() => { //stop websocket when we get here
        dispatch(websocketApi.util.resetApiState());
    }, []);
    */

    React.useEffect(() => { //make this its own seperate function later

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

    return (<div className={styles.gamesContainer}>
        <div className={styles.gamesAndInfo}>
            <div className={styles.gamesExitHelp}>
                To exit hover to right side of the screen and the exit button will show up
            </div>
            <div className={styles.gamesSelector}>
                {
                    GameList.map((val, idx) =>
                        <div key={idx} className={styles.gamesOption} onClick={() => WaitAnimGame(val.name)}>
                            {val.name}
                        </div>)
                }
            </div>
        </div>
        <ExitButton exit={WaitAnim} />
        <PageChange show={changePage} />
        <PageChangeAfter />
    </div>)
}

export default Games;

export { GameDisplay };