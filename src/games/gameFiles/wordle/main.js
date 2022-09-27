import React from 'react';

import styles from './wordle.module.css';

function Grid(props) {
    return (
        <div className={styles.grid}>
            <div className={styles.gridRow}>
                <div className={`${styles.gridCube} ${styles.greenCube}`}>
                    A
                </div>
                <div className={styles.gridCube}>
                    P
                </div>
                <div className={styles.gridCube}>
                    P
                </div>
                <div className={styles.gridCube}>
                    L
                </div>
                <div className={styles.gridCube}>
                    E
                </div>
            </div>
            <div className={styles.gridRow}>
                <div className={styles.gridCube}>
                    A
                </div>
                <div className={styles.gridCube}>
                    P
                </div>
                <div className={styles.gridCube}>
                    P
                </div>
                <div className={styles.gridCube}>
                    L
                </div>
                <div className={styles.gridCube}>
                    E
                </div>
            </div>
            <div className={styles.gridRow}>
                <div className={styles.gridCube}>
                    A
                </div>
                <div className={styles.gridCube}>
                    P
                </div>
                <div className={styles.gridCube}>
                    P
                </div>
                <div className={styles.gridCube}>
                    L
                </div>
                <div className={styles.gridCube}>
                    E
                </div>
            </div>
            <div className={styles.gridRow}>
                <div className={styles.gridCube}>
                    A
                </div>
                <div className={styles.gridCube}>
                    P
                </div>
                <div className={styles.gridCube}>
                    P
                </div>
                <div className={styles.gridCube}>
                    L
                </div>
                <div className={styles.gridCube}>
                    E
                </div>
            </div>
            <div className={styles.gridRow}>
                <div className={styles.gridCube}>
                    A
                </div>
                <div className={styles.gridCube}>
                    P
                </div>
                <div className={styles.gridCube}>
                    P
                </div>
                <div className={styles.gridCube}>
                    L
                </div>
                <div className={styles.gridCube}>
                    E
                </div>
            </div>
        </div>
    );
}

function Wordle() {
    const [word, setWord] = React.useState("apple");
    //up to 5 words
    const [history, setHistory] = React.useState([]);

    return (
        <div className={styles.wordleContainer}>
            <div className={styles.wordleGame}>
                <h1 className={styles.title}>
                    Wordle
                </h1>
                <Grid history={history} word={word} />
                <div className={styles.menu}>
                    <input type="button" value="Retry" className={styles.button}/>
                    <input type="button" value="New Game" className={styles.button}/>
                </div>
            </div>
        </div>);
}

export default Wordle;