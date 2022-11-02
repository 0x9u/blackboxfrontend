import React from 'react';

import styles from './wordle.module.css';

import { WRONG, WRONG_POSITION, CORRECT, CompileWord, CheckWin, WordToStr } from './service';
import KeyHandler from './keyboard.js';
import { Dictionary } from './dictionary';

const NUM_ROWS = 6;

function Row(props) {
    const word = React.useMemo(() => new Array(5).fill(0), []);
    return (
        <div className={styles.gridRow}>
            {
                word.map((_, index) => {
                    /*
                    expect
                    {
                        letter : char,
                        type : wrong 0 | wrong position 1 | correct 2
                    }
                    */
                    let letter = props.guess?.[index];
                    let type = "";
                    let char = letter?.char;
                    let cubeSwitch = false;
                    switch (letter?.type) {
                        case WRONG:
                            type = styles.cubeWRONG;
                            cubeSwitch = true;
                            break;
                        case WRONG_POSITION:
                            type = styles.cubeWRONGPOS;
                            cubeSwitch = true;
                            break;
                        case CORRECT:
                            type = styles.cubeCORRECT;
                            cubeSwitch = true;
                            break;
                        default:
                            break;
                    }
                    return <div className={`${styles.gridCube} ${ cubeSwitch ? styles.gridCubeSwitch : ""}`} key={index}>
                        <div className={styles.gridCubeInner} style={{ animationDelay: `${(index + 1) *100}ms` }}>
                            <div className={`${styles.cubeOuter}`}>
                                {char}
                            </div>
                            <div className={`${styles.cubeInner} ${type}`}>
                                {char}
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
}

function Game(props) {
    const rows = React.useMemo(() => new Array(NUM_ROWS).fill(0), [])
    //up to 5 words
    /*
    i really should be using typescript...
    [{}]
    type:
    {
        word: string,
        type : wrong 0 | wrong position 1 | correct 2
    }
    */
    const [guesses, setGuesses] = React.useState([[]]);
    const [currentGuess, setCurrentGuess] = React.useState(0);
    const [winLose, setWinLose] = React.useState(0); // 0 neutral 1 win -1 lose 2 not actual word
    const [answer, setAnswer] = React.useState("");
    const [tempWord, setTempWord] = React.useState("");
    const [notActualWord, setNotActualWord] = React.useState(false);

    function intialise() {
        window.focus();
        setGuesses([[]]);
        setCurrentGuess(0);
        setWinLose(0);
    }

    function newGame() {
        intialise();
        setAnswer(Dictionary[Math.floor(Math.random() * Dictionary.length)]);
    }

    function deleteKey() {
        setGuesses([...guesses.slice(0, currentGuess), [...guesses[currentGuess].slice(0, -1)]])
    }

    function addKey(key) {
        console.log(key, guesses)
        setNotActualWord(false);
        if (guesses[currentGuess]?.length < 5) {
            setGuesses([...guesses.slice(0, currentGuess), [...guesses[currentGuess], key]]);
        }
        console.log(guesses)
    }
    function submit() {
        if (guesses[currentGuess]?.length < 5) {
            return
        }
        let strWord = WordToStr(guesses[currentGuess]);
        if (Dictionary.find(word => word === strWord) === undefined) {
            setNotActualWord(true);
            setTempWord(strWord);
            return;
        }
        console.log(guesses)
        let word = CompileWord(guesses[currentGuess], answer);
        console.log(currentGuess, guesses)
        setGuesses([...guesses.slice(0, currentGuess), word, []]);
        console.log([...guesses.slice(0, currentGuess), word, []]);
        setCurrentGuess(currentGuess + 1);
        if (CheckWin(word)) {
            setWinLose(1);
            return;
        }
        //one for indexing and one for one more row
        if (currentGuess + 2 > NUM_ROWS) {
            //end game
            setWinLose(-1);
            return
        }
    }

    React.useEffect(() => {
        intialise();
        newGame();
    }, []);
    return (
        <div className={styles.wordleGame}>
            <div className={styles.grid}>
                {
                    rows.map((word, index) => {
                        return <Row key={index} guess={guesses[index]} />
                    })
                }
            </div>
            <h1 className={styles.winLose}>{winLose !== 0 ? (winLose === -1 ? `You lose the answer was ${answer}` : "You Win") : notActualWord ? `${tempWord} is not a word` : ""}</h1>
            <div className={styles.menu}>
                <input type="button" value="Retry" className={styles.button} onClick={intialise} onKeyDown={(e) => e.preventDefault()} />
                <input type="button" value="New Game" className={styles.button} onClick={newGame} onKeyDown={(e) => e.preventDefault()} />
            </div>
            <KeyHandler deleteKey={deleteKey} addKey={addKey} submit={submit} winLose={winLose} />
        </div>
    );
}

function Wordle() {
    //

    return (
        <div className={styles.wordleContainer}>
            <h1 className={styles.title}>
                Wordle
            </h1>
            <Game />
        </div>);
}

export default Wordle;