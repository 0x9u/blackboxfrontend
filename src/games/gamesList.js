import Wordle from './gameFiles/wordle/main.js';
import Snake from './gameFiles/snake/main.js';

const GameList = [
    { name : "Wordle", component : <Wordle/>},
    { name : "Snake", component : <Snake/>}
]

export default GameList;