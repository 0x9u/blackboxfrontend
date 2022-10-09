const WRONG = 0, WRONG_POSITION = 1, CORRECT = 2;

const WORD_SIZE = 5;

//string : string
function evalWord(guess,  correctWord) {
    let guessFinal = new Array(WORD_SIZE).fill(WRONG);
    /*
    guess : {
        char: string,
        type : int
    }
    */
    let wordMap = new Map(); //map of letters to number of times they appear in the word
    for (let i = 0; i < WORD_SIZE; i++) {
        if (wordMap.has(correctWord[i])) {
            wordMap.set(correctWord[i], wordMap.get(correctWord[i]) + 1);
        } else {
            wordMap.set(correctWord[i], 1);
        }
    }
    //check correct
    for (let i = 0; i < WORD_SIZE; i++) {
        if (correctWord[i] === guess[i].char) {
            guessFinal[i] = CORRECT;
            wordMap.set(guess[i].char, wordMap.get(guess[i].char) - 1);
        }
    }
    //check wrong position or just completely wrong
    for (let i = 0; i < WORD_SIZE; i++) {
        if (correctWord[i] === guess[i].char) {
            continue
        }
        if (wordMap.has(guess[i].char) && wordMap.get(guess[i].char) > 0) {
           guessFinal[i] = WRONG_POSITION;
            wordMap.set(guess[i].char, wordMap.get(guess[i].char) - 1);
        }
    }
    return guessFinal; 
}

function CompileWord(guess, correctWord) {
    let guessFinal = evalWord(guess, correctWord);
    let word = [];
    for (let i = 0; i < WORD_SIZE; i++) {
        let type = guessFinal[i];
        let letter = guess[i].char;
        word.push({
            char: letter,
            type: type
        });
    }
    return word;
}

function WordToStr(guess) {
    let word = "";
    for (let i = 0; i < WORD_SIZE; i++) {
        word += guess[i].char;
    }
    return word;
}

function CheckWin(guess) {
    for (let i = 0; i < WORD_SIZE; i++) {
        if (guess[i].type !== CORRECT) {
            return false;
        }
    }
    return true;
}

export {CompileWord, WordToStr, CheckWin, WRONG, WRONG_POSITION, CORRECT};