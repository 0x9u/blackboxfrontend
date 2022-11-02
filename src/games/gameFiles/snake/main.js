import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Text } from 'react-konva';
import styles from './snake.module.css';


function Game() {
    return (
        <div className={styles.snakeGame}>
            <div className={styles.test}>
            </div>
            <div className={styles.menu}>
                <input type="button"/>
                <input type="button"/>
            </div>
        </div>);
}

function Snake() {
    return (<div className={styles.snakeContainer}>
        <h1 className={styles.title}>
            Snake
        </h1>
        <Game/>
    </div>);
}

export default Snake;