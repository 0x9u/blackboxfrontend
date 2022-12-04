import Wordle from './gameFiles/wordle/main.js';
import Snake from './gameFiles/snake/main.js';
import CubeGame from './gameFiles/cube/main.js';

const GameList = [
    { name: "Wordle", component: <Wordle /> },
    { name: "Snake", component: <Snake /> },
    { name: "Cube", component: <CubeGame /> }
]

export default GameList;